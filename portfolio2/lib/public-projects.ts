import { unstable_cache } from "next/cache";
import { createClient } from "@supabase/supabase-js";
import {
  mapProjectRowWithTranslations,
  type ProjectBaseRow,
  type ProjectLocale,
  type ProjectRecord,
  type ProjectTranslationRow,
} from "@/lib/projects";

const PUBLIC_PROJECTS_TAG = "public-projects";
const PUBLIC_PROJECTS_REVALIDATE_SECONDS = 60 * 10;

function getRequiredEnv(name: "NEXT_PUBLIC_SUPABASE_URL" | "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY") {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing Supabase env var: ${name}`);
  }

  return value;
}

function createPublicSupabaseClient() {
  return createClient(
    getRequiredEnv("NEXT_PUBLIC_SUPABASE_URL"),
    getRequiredEnv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY"),
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    },
  );
}

function isMissingProjectUrlColumn(error: { message?: string } | null) {
  return Boolean(error?.message?.includes("projects.project_url") || error?.message?.includes("project_url"));
}

const getPublishedProjectsCached = unstable_cache(
  async (locale: ProjectLocale, limit: number | null) => {
    const supabase = createPublicSupabaseClient();
    let data: ProjectBaseRow[] | null = null;
    let error: string | null = null;

    try {
      let query = supabase
        .from("projects")
        .select("id,title,header,role,duration,summary,top_image_url,project_url,content_blocks,published,created_at")
        .eq("published", true)
        .order("created_at", { ascending: false });

      if (typeof limit === "number") {
        query = query.limit(limit);
      }

      const result = await query;
      data = (result.data ?? null) as ProjectBaseRow[] | null;
      error = result.error?.message ?? null;
    } catch {
      error = "fetch_failed";
    }

    if (error?.includes("project_url")) {
      try {
        let fallback = supabase
          .from("projects")
          .select("id,title,header,role,duration,summary,top_image_url,content_blocks,published,created_at")
          .eq("published", true)
          .order("created_at", { ascending: false });

        if (typeof limit === "number") {
          fallback = fallback.limit(limit);
        }

        const result = await fallback;
        data = ((result.data ?? []).map((row) => ({ ...row, project_url: null })) as unknown) as ProjectBaseRow[];
        error = result.error?.message ?? null;
      } catch {
        error = "fetch_failed";
      }
    }

    if (error) {
      return [];
    }

    const projectIds = (data ?? []).map((item) => item.id);

    if (projectIds.length === 0) {
      return [];
    }

    const fallbackLocales: ProjectLocale[] = locale === "da" ? ["da", "en"] : ["en"];
    let translationsByProjectId = new Map<string, ProjectTranslationRow[]>();

    try {
      const { data: translationsData } = await supabase
        .from("project_translations")
        .select("project_id,locale,title,header,role,duration,summary,content_blocks")
        .in("project_id", projectIds)
        .in("locale", fallbackLocales);

      translationsByProjectId = (translationsData ?? []).reduce((map, translation) => {
        const current = map.get(translation.project_id) ?? [];
        current.push(translation as ProjectTranslationRow);
        map.set(translation.project_id, current);
        return map;
      }, new Map<string, ProjectTranslationRow[]>());
    } catch {
      translationsByProjectId = new Map<string, ProjectTranslationRow[]>();
    }

    return (data ?? []).map((row) =>
      mapProjectRowWithTranslations(
        row as ProjectBaseRow,
        translationsByProjectId.get(row.id) ?? [],
        locale,
      ),
    );
  },
  ["public-projects-list"],
  {
    tags: [PUBLIC_PROJECTS_TAG],
    revalidate: PUBLIC_PROJECTS_REVALIDATE_SECONDS,
  },
);

const getPublishedProjectByIdCached = unstable_cache(
  async (id: string, locale: ProjectLocale) => {
    const supabase = createPublicSupabaseClient();
    let projectRow: ProjectBaseRow | null = null;
    let projectError: string | null = null;

    try {
      const result = await supabase
        .from("projects")
        .select("id,title,header,role,duration,summary,top_image_url,project_url,content_blocks,published,created_at")
        .eq("id", id)
        .eq("published", true)
        .single();

      projectRow = (result.data ?? null) as ProjectBaseRow | null;
      projectError = result.error?.message ?? null;
    } catch {
      projectError = "fetch_failed";
    }

    if (projectError && isMissingProjectUrlColumn({ message: projectError })) {
      try {
        const fallback = await supabase
          .from("projects")
          .select("id,title,header,role,duration,summary,top_image_url,content_blocks,published,created_at")
          .eq("id", id)
          .eq("published", true)
          .single();

        projectRow = fallback.data ? ({ ...fallback.data, project_url: null } as ProjectBaseRow) : null;
        projectError = fallback.error?.message ?? null;
      } catch {
        projectError = "fetch_failed";
      }
    }

    if (projectError || !projectRow) {
      return null;
    }

    const fallbackLocales: ProjectLocale[] = locale === "da" ? ["da", "en"] : ["en"];

    try {
      const { data: translationsData } = await supabase
        .from("project_translations")
        .select("project_id,locale,title,header,role,duration,summary,content_blocks")
        .eq("project_id", projectRow.id)
        .in("locale", fallbackLocales);

      return mapProjectRowWithTranslations(
        projectRow,
        (translationsData ?? []) as ProjectTranslationRow[],
        locale,
      );
    } catch {
      return mapProjectRowWithTranslations(projectRow, [], locale);
    }
  },
  ["public-project-by-id"],
  {
    tags: [PUBLIC_PROJECTS_TAG],
    revalidate: PUBLIC_PROJECTS_REVALIDATE_SECONDS,
  },
);

export async function getPublishedProjects(locale: ProjectLocale, limit?: number) {
  return getPublishedProjectsCached(locale, typeof limit === "number" ? limit : null);
}

export async function getPublishedProjectById(id: string, locale: ProjectLocale): Promise<ProjectRecord | null> {
  return getPublishedProjectByIdCached(id, locale);
}

export function getPublicProjectsTag() {
  return PUBLIC_PROJECTS_TAG;
}