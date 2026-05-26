import Image from "next/image";
import Link from "next/link";
import PageNav from "@/components/PageNav";
import { getRequestLocale } from "@/lib/getLocale";
import { getDictionary } from "@/lib/i18n";
import {
  mapProjectRowWithTranslations,
  type ProjectBaseRow,
  type ProjectLocale,
  type ProjectTranslationRow,
} from "@/lib/projects";
import { createClient } from "@/utils/supabase/server";

const topSkills = [
  "Next.js",
  "TypeScript",
  "Node.js",
  "Express",
  "Supabase",
  "MongoDB",
  "REST APIs",
  "Docker",
  "Jest",
  "Vercel",
];

export default async function Home() {
  const locale = await getRequestLocale();
  const t = getDictionary(locale);
  const resolvedLocale: ProjectLocale = locale === "da" ? "da" : "en";
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("projects")
    .select("id,title,header,role,duration,summary,top_image_url,project_url,content_blocks,published,created_at")
    .eq("published", true)
    .order("created_at", { ascending: false })
    .limit(4);

  const projectIds = (data ?? []).map((item) => item.id);
  const fallbackLocales: ProjectLocale[] =
    resolvedLocale === "en" ? ["en"] : ["da", "en"];
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

  const landing =
    resolvedLocale === "da"
      ? {
          valueTitle: "Hvorfor mig",
          valueItems: [
            "Full stack-profil med både design- og backendstyrker",
            "Erfaring med produktionklare løsninger, API'er og tests",
            "Fokus på skalerbarhed, performance og stabil drift",
          ],
          skillsTitle: "Nøglekompetencer",
          projectsTitle: "Fremhævede Projekter",
          projectsLink: "Se alle projekter",
          projectsReadMore: "Læs mere",
          experienceTitle: "Erfaring i praksis",
          experienceLink: "Se erfaring",
          educationTitle: "Uddannelsesbaggrund",
          educationLink: "Se uddannelse",
          contactTitle: "Klar til en samtale?",
          contactBody: "Jeg deler gerne kodeeksempler, arkitekturvalg og erfaringer fra projekter.",
          contactLink: "Kontakt mig",
        }
      : {
          valueTitle: "Why Hire Me",
          valueItems: [
            "Full-stack profile with both design and backend strengths",
            "Hands-on delivery of production-ready systems, APIs, and tests",
            "Strong focus on scalability, performance, and reliability",
          ],
          skillsTitle: "Core Skills",
          projectsTitle: "Featured Projects",
          projectsLink: "View all projects",
          projectsReadMore: "Read more",
          experienceTitle: "Practical Experience",
          experienceLink: "View experience",
          educationTitle: "Education Background",
          educationLink: "View education",
          contactTitle: "Open to a conversation?",
          contactBody: "Happy to walk through code samples, architecture decisions, and project impact.",
          contactLink: "Contact me",
        };

  return (
    <div className="flex min-h-full flex-col gap-10">
      <section className="flex items-start gap-12 pt-10">
        <div className="flex flex-1 flex-col gap-8">
          <div>
            <h1 className="text-5xl font-bold text-[var(--foreground)]">Muhammed Altan</h1>
            <h2 className="mt-1 text-3xl font-bold text-[var(--text-muted)]">
              {t.home.subtitle}
            </h2>
          </div>

          <p className="text-lg leading-relaxed text-[var(--text-soft)]">
            {t.home.body}
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-4">
            <a
              href="/resume.pdf"
              download="Muhammed Altan - Resume"
              className="flex items-center gap-2 rounded-md bg-[var(--accent)] px-5 py-2.5 text-base font-semibold text-[var(--accent-foreground)] transition-colors hover:bg-[var(--accent-hover)]"
            >
              {t.home.resumeCta}
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            <a
              href="mailto:altan_8260@hotmail.com"
              className="flex items-center gap-2 rounded-md border border-[var(--border)] bg-[var(--surface)] px-5 py-2.5 text-base font-semibold text-[var(--text-soft)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--foreground)]"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {t.home.mailCta}
            </a>
          </div>
        </div>

        <div className="shrink-0">
          <Image
            src="/MA.png"
            alt="Muhammed Altan"
            width={180}
            height={180}
            className="rounded-full object-cover"
            priority
          />
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <article className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 md:col-span-2">
          <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
            {landing.valueTitle}
          </h3>
          <ul className="mt-3 grid gap-2 text-sm text-[var(--text-soft)] md:grid-cols-2">
            {landing.valueItems.map((item) => (
              <li key={item} className="rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 py-2">
                {item}
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
          <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
            {landing.skillsTitle}
          </h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {topSkills.map((skill) => (
              <span key={skill} className="rounded-full border border-[var(--border)] bg-[var(--background)] px-3 py-1 text-xs font-medium text-[var(--text-soft)]">
                {skill}
              </span>
            ))}
          </div>
        </article>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-2xl font-bold text-[var(--foreground)]">{landing.projectsTitle}</h3>
          <Link href="/projects" className="text-sm font-medium text-[var(--text-muted)] hover:text-[var(--foreground)]">
            {landing.projectsLink}
          </Link>
        </div>

        {projects.length === 0 ? (
          <p className="text-sm text-[var(--text-muted)]">No projects added yet.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {projects.map((project) => (
              <article key={project.id} className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-md shadow-black/10">
                <Link href={`/projects/${project.id}`} className="block h-full">
                  <div className="h-32 w-full bg-[var(--background)]">
                    <img src={project.topImageUrl} alt={project.title} className="h-full w-full object-cover" />
                  </div>
                  <div className="space-y-2 p-4">
                    <p className="line-clamp-1 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">{project.header}</p>
                    <h4 className="line-clamp-1 text-lg font-semibold text-[var(--foreground)]">{project.title}</h4>
                    <p className="line-clamp-2 text-sm text-[var(--text-soft)]">{project.summary}</p>
                    <span className="inline-flex rounded-full border border-[var(--border)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">
                      {landing.projectsReadMore}
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
          <h3 className="text-lg font-semibold text-[var(--foreground)]">{landing.experienceTitle}</h3>
          <p className="mt-2 text-sm leading-relaxed text-[var(--text-soft)]">
            {t.experience.roleOne} - {t.experience.roleOneMeta}
          </p>
          <p className="mt-2 line-clamp-3 text-sm text-[var(--text-muted)]">{t.experience.roleOneP1}</p>
          <Link href="/experience" className="mt-4 inline-flex text-sm font-medium text-[var(--text-muted)] hover:text-[var(--foreground)]">
            {landing.experienceLink}
          </Link>
        </article>

        <article className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
          <h3 className="text-lg font-semibold text-[var(--foreground)]">{landing.educationTitle}</h3>
          <p className="mt-2 text-sm leading-relaxed text-[var(--text-soft)]">
            {t.education.degreeTwo} - {t.education.degreeTwoTitle}
          </p>
          <p className="mt-2 line-clamp-3 text-sm text-[var(--text-muted)]">{t.education.degreeTwoP1}</p>
          <Link href="/education" className="mt-4 inline-flex text-sm font-medium text-[var(--text-muted)] hover:text-[var(--foreground)]">
            {landing.educationLink}
          </Link>
        </article>
      </section>

      <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <h3 className="text-2xl font-bold text-[var(--foreground)]">{landing.contactTitle}</h3>
        <p className="mt-2 max-w-2xl text-sm text-[var(--text-soft)]">{landing.contactBody}</p>
        <Link href="/contact" className="mt-4 inline-flex rounded-md border border-[var(--border)] bg-[var(--surface-2)] px-4 py-2 text-sm font-medium text-[var(--foreground)] hover:border-[var(--border-strong)]">
          {landing.contactLink}
        </Link>
      </section>

      <PageNav next={{ label: t.sections.about, href: "/about" }} />
    </div>
  );
}
