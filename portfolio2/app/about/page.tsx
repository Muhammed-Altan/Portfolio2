import PageNav from "@/components/PageNav";
import { getRequestLocale } from "@/lib/getLocale";
import { getDictionary } from "@/lib/i18n";

export default async function AboutPage() {
  const locale = await getRequestLocale();
  const t = getDictionary(locale);

  return (
    <div className="flex flex-col justify-between min-h-full">
      <section className="flex flex-col gap-5">
        <div>
          <h1 className="text-4xl font-bold text-[var(--foreground)]">{t.about.title}</h1>
          <h2 className="mt-1 text-2xl font-bold text-[var(--text-muted)]">{t.about.subtitle}</h2>
        </div>
        <p className="text-lg leading-relaxed text-[var(--text-soft)]">
          {t.about.paragraphs[0]}
        </p>
        <p className="text-lg leading-relaxed text-[var(--text-soft)]">
          {t.about.paragraphs[1]}
        </p>
        <p className="text-lg leading-relaxed text-[var(--text-soft)]">
          {t.about.paragraphs[2]}
        </p>
        <p className="text-lg leading-relaxed text-[var(--text-soft)]">
          {t.about.paragraphs[3]}
        </p>
      </section>
      <PageNav
        prev={{ label: t.sections.introduction, href: "/" }}
        next={{ label: t.sections.projects, href: "/projects" }}
      />
    </div>
  );
}
