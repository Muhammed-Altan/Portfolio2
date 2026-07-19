import { NextRequest, NextResponse } from "next/server";
import {
  mapProjectRowWithTranslations,
  toSupabaseRenderUrl,
  type ProjectBaseRow,
  type ProjectLocale,
  type ProjectTranslationRow,
} from "@/lib/projects";
import { createClient } from "@/utils/supabase/server";

export const dynamic = "force-dynamic";

type DiagnosticMode = "home" | "projects";

type ImageProbeResult = {
  id: string;
  title: string;
  sourceUrl: string;
  optimizedUrl: string;
  width: number;
  quality: number;
  headStatus: number | null;
  contentType: string | null;
  contentLength: string | null;
  durationMs: number;
  error: string | null;
};

function getMode(value: string | null): DiagnosticMode {
  return value === "home" ? "home" : "projects";
}

function getLocale(value: string | null): ProjectLocale {
  return value === "da" ? "da" : "en";
}

function getImageTargetConfig(mode: DiagnosticMode) {
  if (mode === "home") {
    return {
      width: 840,
      quality: 70,
    };
  }

  return {
    width: 960,
    quality: 72,
  };
}

function toNextOptimizedImageUrl(origin: string, sourceUrl: string, width: number, quality: number) {
  const searchParams = new URLSearchParams({
    url: sourceUrl,
    w: String(width),
    q: String(quality),
  });

  return `${origin}/_next/image?${searchParams.toString()}`;
}

async function probeImageHead(url: string) {
  const startedAt = performance.now();

  try {
    const response = await fetch(url, {
      method: "HEAD",
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
    });

    return {
      headStatus: response.status,
      contentType: response.headers.get("content-type"),
      contentLength: response.headers.get("content-length"),
      durationMs: Number((performance.now() - startedAt).toFixed(1)),
      error: null,
    };
  } catch (error) {
    return {
      headStatus: null,
      contentType: null,
      contentLength: null,
      durationMs: Number((performance.now() - startedAt).toFixed(1)),
      error: error instanceof Error ? error.message : "Image HEAD probe failed",
    };
  }
}

export async function GET(request: NextRequest) {
  const startedAt = performance.now();
  const searchParams = request.nextUrl.searchParams;
  const mode = getMode(searchParams.get("mode"));
  const locale = getLocale(searchParams.get("locale"));
  const fallbackLocales: ProjectLocale[] = locale === "da" ? ["da", "en"] : ["en"];

  const supabase = await createClient();
  let data: ProjectBaseRow[] | null = null;
  let error: string | null = null;
  let baseQueryMs = 0;
  let fallbackQueryMs = 0;

  try {
    const queryStartedAt = performance.now();
    let query = supabase
      .from("projects")
      .select("id,title,header,role,duration,summary,top_image_url,project_url,content_blocks,published,created_at")
      .eq("published", true)
      .order("created_at", { ascending: false });

    if (mode === "home") {
      query = query.limit(4);
    }

    const result = await query;
    baseQueryMs = Number((performance.now() - queryStartedAt).toFixed(1));
    data = (result.data ?? null) as ProjectBaseRow[] | null;
    error = result.error?.message ?? null;
  } catch {
    baseQueryMs = Number((performance.now() - startedAt).toFixed(1));
    error = "fetch_failed";
  }

  if (mode === "projects" && error?.includes("project_url")) {
    try {
      const fallbackStartedAt = performance.now();
      const fallback = await supabase
        .from("projects")
        .select("id,title,header,role,duration,summary,top_image_url,content_blocks,published,created_at")
        .eq("published", true)
        .order("created_at", { ascending: false });

      fallbackQueryMs = Number((performance.now() - fallbackStartedAt).toFixed(1));
      data = ((fallback.data ?? []).map((row) => ({ ...row, project_url: null })) as unknown) as ProjectBaseRow[];
      error = fallback.error?.message ?? null;
    } catch {
      fallbackQueryMs = Number((performance.now() - startedAt).toFixed(1));
      error = "fetch_failed";
    }
  }

  const projectIds = (data ?? []).map((item) => item.id);
  const translationsStartedAt = performance.now();
  let translationsByProjectId = new Map<string, ProjectTranslationRow[]>();
  let translationCount = 0;

  if (!error && projectIds.length > 0) {
    try {
      const { data: translationsData } = await supabase
        .from("project_translations")
        .select("project_id,locale,title,header,role,duration,summary,content_blocks")
        .in("project_id", projectIds)
        .in("locale", fallbackLocales);

      translationCount = translationsData?.length ?? 0;
      translationsByProjectId = (translationsData ?? []).reduce((map, translation) => {
        const current = map.get(translation.project_id) ?? [];
        current.push(translation as ProjectTranslationRow);
        map.set(translation.project_id, current);
        return map;
      }, new Map<string, ProjectTranslationRow[]>());
    } catch {
      translationsByProjectId = new Map<string, ProjectTranslationRow[]>();
    }
  }

  const translationsQueryMs = Number((performance.now() - translationsStartedAt).toFixed(1));
  const mappingStartedAt = performance.now();
  const projects = error
    ? []
    : (data ?? []).map((row) =>
        mapProjectRowWithTranslations(
          row as ProjectBaseRow,
          translationsByProjectId.get(row.id) ?? [],
          locale,
        ),
      );
  const mappingMs = Number((performance.now() - mappingStartedAt).toFixed(1));

  const imageProbeTargets = projects.slice(0, mode === "home" ? 4 : 6);
  const imageTarget = getImageTargetConfig(mode);
  const imageProbeResults: ImageProbeResult[] = await Promise.all(
    imageProbeTargets.map(async (project) => {
      const sourceUrl = toSupabaseRenderUrl(project.topImageUrl, imageTarget.width, imageTarget.quality);
      const optimizedUrl = toNextOptimizedImageUrl(request.nextUrl.origin, sourceUrl, imageTarget.width, imageTarget.quality);
      const probe = await probeImageHead(sourceUrl);

      return {
        id: project.id,
        title: project.title,
        sourceUrl,
        optimizedUrl,
        width: imageTarget.width,
        quality: imageTarget.quality,
        ...probe,
      };
    }),
  );

  const payload = {
    mode,
    locale,
    error,
    rowCount: projects.length,
    translationCount,
    timings: {
      baseQueryMs,
      fallbackQueryMs,
      translationsQueryMs,
      mappingMs,
      totalMs: Number((performance.now() - startedAt).toFixed(1)),
    },
    imageProbeResults,
    sampledProjects: projects.slice(0, 6).map((project) => ({
      id: project.id,
      title: project.title,
      header: project.header,
      imageUrl: project.topImageUrl,
    })),
    generatedAt: new Date().toISOString(),
  };

  console.info("[project-diagnostics]", JSON.stringify(payload));

  return NextResponse.json(payload, {
    headers: {
      "cache-control": "no-store, max-age=0",
    },
  });
}