import Link from "next/link";
import { notFound } from "next/navigation";
import {
  mapProjectRowWithTranslations,
  type ProjectBaseRow,
  type ProjectLocale,
  type ProjectTranslationRow,
} from "@/lib/projects";
import { getRequestLocale } from "@/lib/getLocale";
import { createClient } from "@/utils/supabase/server";

type ProjectDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { id } = await params;
  const locale = await getRequestLocale();
  const resolvedLocale: ProjectLocale = locale === "da" ? "da" : "en";
  const backLabel = resolvedLocale === "da" ? "Tilbage til projekter" : "Back to projects";
  const supabase = await createClient();

  const { data: projectRow, error: projectError } = await supabase
    .from("projects")
    .select("id,title,header,role,duration,summary,top_image_url,content_blocks,published,created_at")
    .eq("id", id)
    .eq("published", true)
    .single();

  if (projectError || !projectRow) {
    notFound();
  }

  const fallbackLocales: ProjectLocale[] =
    resolvedLocale === "en" ? ["en"] : ["da", "en"];

  const { data: translationsData } = await supabase
    .from("project_translations")
    .select("project_id,locale,title,header,role,duration,summary,content_blocks")
    .eq("project_id", projectRow.id)
    .in("locale", fallbackLocales);

  const project = mapProjectRowWithTranslations(
    projectRow as ProjectBaseRow,
    (translationsData ?? []) as ProjectTranslationRow[],
    resolvedLocale,
  );

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 pb-10">
      <div className="pt-2">
        <Link
          href="/projects"
          className="inline-flex items-center rounded-full border border-[var(--border)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)] hover:border-[var(--border-strong)] hover:text-[var(--foreground)]"
        >
          {backLabel}
        </Link>
      </div>

      <article className="overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] shadow-lg shadow-black/10">
        <div className="relative h-64 w-full bg-[var(--background)] md:h-80">
          <img src={project.topImageUrl} alt={project.title} className="h-full w-full object-cover" />
        </div>

        <div className="space-y-8 p-6 md:p-8">
          <header className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">{project.header}</p>
            <h1 className="text-3xl font-semibold text-[var(--foreground)] md:text-4xl">{project.title}</h1>
            <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">
              <span className="rounded-full border border-[var(--border)] px-3 py-1">{project.role}</span>
              <span className="rounded-full border border-[var(--border)] px-3 py-1">{project.duration}</span>
            </div>
            <p className="text-base leading-relaxed text-[var(--text-soft)]">{project.summary}</p>
          </header>

          <section className="space-y-6">
            {project.contentBlocks.map((block, index) =>
              block.type === "text" ? (
                <p key={`${project.id}-text-${index}`} className="text-base leading-relaxed text-[var(--text-muted)]">
                  {block.value}
                </p>
              ) : (
                <figure key={`${project.id}-image-${index}`} className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--background)]">
                  <img src={block.value} alt={`${project.title} section ${index + 1}`} className="w-full object-cover" />
                </figure>
              ),
            )}
          </section>
        </div>
      </article>
    </div>
  );
}
