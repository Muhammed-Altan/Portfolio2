import PageNav from "@/components/PageNav";
import { getRequestLocale } from "@/lib/getLocale";
import { getDictionary } from "@/lib/i18n";

export default async function ProjectsPage() {
  const locale = await getRequestLocale();
  const t = getDictionary(locale);

  return (
    <div className="flex flex-col justify-between min-h-full">
      <section className="flex flex-col gap-5">
        <h1 className="text-4xl font-bold text-[var(--foreground)]">{t.projects.title}</h1>
        <p className="text-lg text-[var(--text-muted)]">{t.projects.body}</p>
      </section>
      <PageNav
        prev={{ label: t.sections.about, href: "/about" }}
        next={{ label: t.sections.skills, href: "/skills" }}
      />
    </div>
  );
}
