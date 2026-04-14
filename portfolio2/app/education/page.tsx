import PageNav from "@/components/PageNav";
import { getRequestLocale } from "@/lib/getLocale";
import { getDictionary } from "@/lib/i18n";

export default async function EducationPage() {
  const locale = await getRequestLocale();
  const t = getDictionary(locale);

  return (
    <div className="flex flex-col justify-between min-h-full">
      <section className="flex flex-col gap-8">
        <h1 className="text-4xl font-bold text-[var(--foreground)]">{t.education.title}</h1>

        <div className="flex flex-col gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-colors duration-300">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
              {t.education.degreeOne}
            </p>
            <h2 className="text-2xl font-bold text-[var(--foreground)]">{t.education.degreeOneTitle}</h2>
            <p className="text-sm text-[var(--text-muted)]">{t.education.degreeOneMeta}</p>
          </div>

          <p className="text-base leading-relaxed text-[var(--text-soft)]">
            {t.education.degreeOneP1}
          </p>

          <p className="text-base leading-relaxed text-[var(--text-soft)]">
            {t.education.degreeOneP2}
          </p>
        </div>

        <div className="flex flex-col gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-colors duration-300">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
              {t.education.degreeTwo}
            </p>
            <h2 className="text-2xl font-bold text-[var(--foreground)]">{t.education.degreeTwoTitle}</h2>
            <p className="text-sm text-[var(--text-muted)]">{t.education.degreeTwoMeta}</p>
          </div>

          <p className="text-base leading-relaxed text-[var(--text-soft)]">
            {t.education.degreeTwoP1}
          </p>

          <p className="text-base leading-relaxed text-[var(--text-soft)]">
            {t.education.degreeTwoP2}
          </p>
        </div>
      </section>
      <PageNav
        prev={{ label: t.sections.experience, href: "/experience" }}
        next={{ label: t.sections.contact, href: "/contact" }}
      />
    </div>
  );
}
