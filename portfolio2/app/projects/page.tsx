import Link from "next/link";
import PageNav from "@/components/PageNav";
import ProjectImage from "@/components/ProjectImage";
import { getRequestLocale } from "@/lib/getLocale";
import { getDictionary } from "@/lib/i18n";
import {
  mapProjectRowWithTranslations,
  toSupabaseRenderUrl,
  type ProjectBaseRow,
  type ProjectLocale,
  type ProjectTranslationRow,
} from "@/lib/projects";
import { createClient } from "@/utils/supabase/server";

export default async function ProjectsPage() {
  const locale = await getRequestLocale();
  const t = getDictionary(locale);
  const resolvedLocale: ProjectLocale = locale === "da" ? "da" : "en";
  const readMoreLabel = resolvedLocale === "da" ? "Laes mere" : "Read more";
  const supabase = await createClient();
  let { data, error } = await supabase
    .from("projects")
    .select("id,title,header,role,duration,summary,top_image_url,project_url,content_blocks,published,created_at")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error?.message?.includes("project_url")) {
    const fallback = await supabase
      .from("projects")
      .select("id,title,header,role,duration,summary,top_image_url,content_blocks,published,created_at")
      .eq("published", true)
      .order("created_at", { ascending: false });

    data = (fallback.data ?? []).map((row) => ({ ...row, project_url: null }));
    error = fallback.error;
  }

  const fallbackLocales: ProjectLocale[] =
    resolvedLocale === "en" ? ["en"] : ["da", "en"];
  const projectIds = (data ?? []).map((item) => item.id);
  let translationsByProjectId = new Map<string, ProjectTranslationRow[]>();

  if (!error && projectIds.length > 0) {
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
  }

  const projects = error
    ? []
    : (data ?? []).map((row) =>
        mapProjectRowWithTranslations(
          row as ProjectBaseRow,
          translationsByProjectId.get(row.id) ?? [],
          resolvedLocale,
        ),
      );

  return (
    <div className="flex flex-col justify-between min-h-full">
      <section className="flex flex-col gap-8">
        <div className="flex flex-col gap-5">
          <h1 className="text-4xl font-bold text-[var(--foreground)]">{t.projects.title}</h1>
          <p className="text-lg text-[var(--text-muted)]">{t.projects.body}</p>
        </div>

        {projects.length === 0 ? (
          <p className="text-base text-[var(--text-muted)]">No projects added yet. Use the admin project editor to add your first dynamic project.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {projects.map((project) => (
              <article key={project.id} className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-md shadow-black/10 transition-transform hover:-translate-y-0.5">
                <Link href={`/projects/${project.id}`} className="block h-full">
                  <div className="relative h-40 w-full bg-[var(--background)]">
                    <ProjectImage
                      src={toSupabaseRenderUrl(project.topImageUrl, 960, 72)}
                      alt={project.title}
                      fill
                      unoptimized
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                      className="object-cover"
                    />
                  </div>

                  <div className="space-y-3 p-4">
                    <header className="space-y-2">
                      <p className="line-clamp-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">{project.header}</p>
                      <h2 className="line-clamp-1 text-lg font-semibold text-[var(--foreground)]">{project.title}</h2>
                      <div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.12em] text-[var(--text-muted)]">
                        <span className="rounded-full border border-[var(--border)] px-2.5 py-1">{project.role}</span>
                        <span className="rounded-full border border-[var(--border)] px-2.5 py-1">{project.duration}</span>
                      </div>
                      <p className="line-clamp-3 text-sm leading-relaxed text-[var(--text-soft)]">{project.summary}</p>
                    </header>

                    <div className="inline-flex items-center rounded-full border border-[var(--border-strong)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)] transition-colors hover:text-[var(--foreground)]">
                      {readMoreLabel}
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
      <PageNav
        prev={{ label: t.sections.about, href: "/about" }}
        next={{ label: t.sections.skills, href: "/skills" }}
      />
    </div>
  );
}
