import Link from "next/link";
import PageNav from "@/components/PageNav";
import ProjectImage from "@/components/ProjectImage";
import { getRequestLocale } from "@/lib/getLocale";
import { getDictionary } from "@/lib/i18n";
import { toSupabaseRenderUrl, type ProjectLocale } from "@/lib/projects";
import { getPublishedProjects } from "@/lib/public-projects";

export default async function ProjectsPage() {
  const locale = await getRequestLocale();
  const t = getDictionary(locale);
  const resolvedLocale: ProjectLocale = locale === "da" ? "da" : "en";
  const readMoreLabel = resolvedLocale === "da" ? "Laes mere" : "Read more";
  const projects = await getPublishedProjects(resolvedLocale);

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
            {projects.map((project, index) => (
              <article key={project.id} className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-md shadow-black/10 transition-transform hover:-translate-y-0.5">
                <Link href={`/projects/${project.id}`} className="block h-full">
                  <div className="relative h-40 w-full bg-[var(--background)]">
                    <ProjectImage
                      src={toSupabaseRenderUrl(project.topImageUrl, 960, 72)}
                      alt={project.title}
                      fill
                      loading={index === 0 ? "eager" : "lazy"}
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
