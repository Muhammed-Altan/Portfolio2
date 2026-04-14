import PageNav from "@/components/PageNav";
import { getRequestLocale } from "@/lib/getLocale";
import { getDictionary } from "@/lib/i18n";

export default async function ExperiencePage() {
  const locale = await getRequestLocale();
  const t = getDictionary(locale);

  return (
    <div className="flex flex-col justify-between min-h-full">
      <section className="flex flex-col gap-8">
        <h1 className="text-4xl font-bold text-[var(--foreground)]">{t.experience.title}</h1>

        <div className="flex flex-col gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-colors duration-300">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
                {t.experience.roleOne}
              </p>
              <h2 className="text-2xl font-bold text-[var(--foreground)]">LejGoPro.dk</h2>
              <p className="text-sm text-[var(--text-muted)]">{t.experience.roleOneMeta}</p>
            </div>

            <a
              href="https://lejgopro.dk"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 rounded-md border border-[var(--border)] bg-[var(--surface-2)] px-3 py-1.5 text-sm font-medium text-[var(--foreground)] transition-colors hover:border-[var(--border-strong)]"
            >
              {t.experience.visitSite}
            </a>
          </div>

          <p className="text-base leading-relaxed text-[var(--text-soft)]">
            {t.experience.roleOneP1}
          </p>

          <p className="text-base leading-relaxed text-[var(--text-soft)]">
            {t.experience.roleOneP2}
          </p>
        </div>

        <div className="flex flex-col gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-colors duration-300">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
              {t.experience.roleTwo}
            </p>
            <h2 className="text-2xl font-bold text-[var(--foreground)]">{t.experience.roleTwoTitle}</h2>
          </div>

          <p className="text-base leading-relaxed text-[var(--text-soft)]">
            {t.experience.roleTwoP1}
          </p>

          <p className="text-base leading-relaxed text-[var(--text-soft)]">
            {t.experience.roleTwoP2}
          </p>
        </div>
      </section>
      <PageNav
        prev={{ label: t.sections.skills, href: "/skills" }}
        next={{ label: t.sections.education, href: "/education" }}
      />
    </div>
  );
}
