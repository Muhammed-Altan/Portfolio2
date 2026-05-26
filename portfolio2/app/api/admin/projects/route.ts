import { createClient } from "@/utils/supabase/server";
import {
  mapProjectRow,
  normalizeImageUrl,
  normalizeProjectContentBlocks,
  type ProjectLocale,
} from "@/lib/projects";
import { withAdminAuth } from "@/lib/admin-auth";
import { NextResponse } from "next/server";

type ProjectLocalePayload = {
  title?: string;
  header?: string;
  role?: string;
  duration?: string;
  summary?: string;
  blocks?: unknown;
};

type ProjectInsertPayload = {
  id?: string;
  topImageUrl?: string;
  projectUrl?: string;
  translations?: Partial<Record<ProjectLocale, ProjectLocalePayload>>;
  title?: string;
  header?: string;
  role?: string;
  duration?: string;
  summary?: string;
  blocks?: unknown;
};

function isMissingProjectUrlColumn(error: { message?: string } | null) {
  return Boolean(error?.message?.includes("projects.project_url") || error?.message?.includes("project_url"));
}

function getText(value: string | undefined, fallback = "") {
  return value?.trim() ?? fallback;
}

function resolveLocalePayload(payload: ProjectInsertPayload | null, locale: ProjectLocale) {
  const localePayload = payload?.translations?.[locale] ?? null;

  if (localePayload) {
    return {
      title: getText(localePayload.title),
      header: getText(localePayload.header),
      role: getText(localePayload.role),
      duration: getText(localePayload.duration),
      summary: getText(localePayload.summary),
      blocks: normalizeProjectContentBlocks(localePayload.blocks ?? []),
    };
  }

  return {
    title: getText(payload?.title),
    header: getText(payload?.header),
    role: getText(payload?.role),
    duration: getText(payload?.duration),
    summary: getText(payload?.summary),
    blocks: normalizeProjectContentBlocks(payload?.blocks ?? []),
  };
}

async function upsertProjectTranslations(
  supabase: Awaited<ReturnType<typeof createClient>>,
  projectId: string,
  english: ReturnType<typeof resolveLocalePayload>,
  danish: ReturnType<typeof resolveLocalePayload>,
) {
  return supabase
    .from("project_translations")
    .upsert(
      [
        {
          project_id: projectId,
          locale: "en",
          title: english.title,
          header: english.header,
          role: english.role,
          duration: english.duration,
          summary: english.summary,
          content_blocks: english.blocks,
        },
        {
          project_id: projectId,
          locale: "da",
          title: danish.title,
          header: danish.header,
          role: danish.role,
          duration: danish.duration,
          summary: danish.summary,
          content_blocks: danish.blocks,
        },
      ],
      { onConflict: "project_id,locale" },
    );
}

export const GET = withAdminAuth(async () => {
  const supabase = await createClient();
  let { data, error } = await supabase
    .from("projects")
    .select("id,title,header,role,duration,summary,top_image_url,project_url,content_blocks,published,created_at")
    .order("created_at", { ascending: false });

  if (error && isMissingProjectUrlColumn(error)) {
    const fallback = await supabase
      .from("projects")
      .select("id,title,header,role,duration,summary,top_image_url,content_blocks,published,created_at")
      .order("created_at", { ascending: false });

    data = (fallback.data ?? []).map((row) => ({ ...row, project_url: null }));
    error = fallback.error;
  }

  if (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }

  if (!data) {
    return NextResponse.json(
      { success: false, message: "Project could not be created." },
      { status: 500 },
    );
  }

  const projectIds = (data ?? []).map((project) => project.id);
  let translationsByProjectId = new Map<
    string,
    Partial<Record<ProjectLocale, ProjectLocalePayload>>
  >();

  if (projectIds.length > 0) {
    const { data: translationsData } = await supabase
      .from("project_translations")
      .select("project_id,locale,title,header,role,duration,summary,content_blocks")
      .in("project_id", projectIds)
      .in("locale", ["en", "da"]);

    translationsByProjectId = (translationsData ?? []).reduce((map, row) => {
      const current = map.get(row.project_id) ?? {};
      current[row.locale as ProjectLocale] = {
        title: row.title,
        header: row.header,
        role: row.role,
        duration: row.duration,
        summary: row.summary,
        blocks: normalizeProjectContentBlocks(row.content_blocks),
      };
      map.set(row.project_id, current);
      return map;
    }, new Map<string, Partial<Record<ProjectLocale, ProjectLocalePayload>>>());
  }

  return NextResponse.json({
    success: true,
    projects: (data ?? []).map((project) => ({
      ...mapProjectRow(project),
      translations: translationsByProjectId.get(project.id) ?? {},
    })),
  });
});

export const POST = withAdminAuth(async (request) => {
  const payload = (await request.json().catch(() => null)) as ProjectInsertPayload | null;

  const topImageUrl = normalizeImageUrl(getText(payload?.topImageUrl));
  const projectUrl = getText(payload?.projectUrl) || null;
  const english = resolveLocalePayload(payload, "en");
  const danishInput = resolveLocalePayload(payload, "da");
  const danish = {
    title: danishInput.title || english.title,
    header: danishInput.header || english.header,
    role: danishInput.role || english.role,
    duration: danishInput.duration || english.duration,
    summary: danishInput.summary || english.summary,
    blocks: danishInput.blocks.length > 0 ? danishInput.blocks : english.blocks,
  };

  if (
    !topImageUrl ||
    !english.title ||
    !english.header ||
    !english.role ||
    !english.duration ||
    !english.summary
  ) {
    return NextResponse.json(
      { success: false, message: "Please fill all English top project fields and top image URL." },
      { status: 400 },
    );
  }

  if (english.blocks.length === 0) {
    return NextResponse.json(
      { success: false, message: "Please add at least one content block." },
      { status: 400 },
    );
  }

  const supabase = await createClient();
  let { data, error } = await supabase
    .from("projects")
    .insert({
      title: english.title,
      header: english.header,
      role: english.role,
      duration: english.duration,
      summary: english.summary,
      top_image_url: topImageUrl,
      project_url: projectUrl,
      content_blocks: english.blocks,
      published: true,
    })
    .select("id,title,header,role,duration,summary,top_image_url,project_url,content_blocks,published,created_at")
    .single();

  if (error && isMissingProjectUrlColumn(error)) {
    const fallback = await supabase
      .from("projects")
      .insert({
        title: english.title,
        header: english.header,
        role: english.role,
        duration: english.duration,
        summary: english.summary,
        top_image_url: topImageUrl,
        content_blocks: english.blocks,
        published: true,
      })
      .select("id,title,header,role,duration,summary,top_image_url,content_blocks,published,created_at")
      .single();

    data = fallback.data ? { ...fallback.data, project_url: null } : fallback.data;
    error = fallback.error;
  }

  if (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }

  if (!data) {
    return NextResponse.json(
      { success: false, message: "Project could not be updated." },
      { status: 500 },
    );
  }

  const { error: upsertTranslationError } = await upsertProjectTranslations(
    supabase,
    data.id,
    english,
    danish,
  );

  if (upsertTranslationError) {
    return NextResponse.json(
      {
        success: false,
        message: `Project saved but translations failed: ${upsertTranslationError.message}`,
      },
      { status: 500 },
    );
  }

  return NextResponse.json(
    { success: true, project: mapProjectRow(data) },
    { status: 201 },
  );
});

export const PATCH = withAdminAuth(async (request) => {
  const payload = (await request.json().catch(() => null)) as ProjectInsertPayload | null;
  const id = getText(payload?.id);

  if (!id) {
    return NextResponse.json(
      { success: false, message: "Project id is required." },
      { status: 400 },
    );
  }

  const topImageUrl = normalizeImageUrl(getText(payload?.topImageUrl));
  const projectUrl = getText(payload?.projectUrl) || null;
  const english = resolveLocalePayload(payload, "en");
  const danishInput = resolveLocalePayload(payload, "da");
  const danish = {
    title: danishInput.title || english.title,
    header: danishInput.header || english.header,
    role: danishInput.role || english.role,
    duration: danishInput.duration || english.duration,
    summary: danishInput.summary || english.summary,
    blocks: danishInput.blocks.length > 0 ? danishInput.blocks : english.blocks,
  };

  if (
    !topImageUrl ||
    !english.title ||
    !english.header ||
    !english.role ||
    !english.duration ||
    !english.summary
  ) {
    return NextResponse.json(
      { success: false, message: "Please fill all English top project fields and top image URL." },
      { status: 400 },
    );
  }

  if (english.blocks.length === 0) {
    return NextResponse.json(
      { success: false, message: "Please add at least one content block." },
      { status: 400 },
    );
  }

  const supabase = await createClient();
  let { data, error } = await supabase
    .from("projects")
    .update({
      title: english.title,
      header: english.header,
      role: english.role,
      duration: english.duration,
      summary: english.summary,
      top_image_url: topImageUrl,
      project_url: projectUrl,
      content_blocks: english.blocks,
    })
    .eq("id", id)
    .select("id,title,header,role,duration,summary,top_image_url,project_url,content_blocks,published,created_at")
    .single();

  if (error && isMissingProjectUrlColumn(error)) {
    const fallback = await supabase
      .from("projects")
      .update({
        title: english.title,
        header: english.header,
        role: english.role,
        duration: english.duration,
        summary: english.summary,
        top_image_url: topImageUrl,
        content_blocks: english.blocks,
      })
      .eq("id", id)
      .select("id,title,header,role,duration,summary,top_image_url,content_blocks,published,created_at")
      .single();

    data = fallback.data ? { ...fallback.data, project_url: null } : fallback.data;
    error = fallback.error;
  }

  if (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }

  if (!data) {
    return NextResponse.json(
      { success: false, message: "Project could not be updated." },
      { status: 500 },
    );
  }

  const { error: translationError } = await upsertProjectTranslations(
    supabase,
    id,
    english,
    danish,
  );

  if (translationError) {
    return NextResponse.json(
      {
        success: false,
        message: `Project updated but translations failed: ${translationError.message}`,
      },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true, project: mapProjectRow(data) });
});

export const DELETE = withAdminAuth(async (request) => {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id")?.trim() ?? "";

  if (!id) {
    return NextResponse.json(
      { success: false, message: "Project id is required." },
      { status: 400 },
    );
  }

  const supabase = await createClient();
  const { error } = await supabase.from("projects").delete().eq("id", id);

  if (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true });
});
