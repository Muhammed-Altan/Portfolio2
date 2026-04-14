import PageNav from "@/components/PageNav";
import { getRequestLocale } from "@/lib/getLocale";
import { getDictionary } from "@/lib/i18n";

export default async function ContactPage() {
  const locale = await getRequestLocale();
  const t = getDictionary(locale);

  return (
    <div className="flex flex-col justify-between min-h-full">
      <section className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold text-[var(--foreground)]">{t.contact.title}</h1>
          <p className="text-lg text-[var(--text-muted)]">
            {t.contact.subtitle}
          </p>
        </div>

        <a
          href="mailto:altan_8260@hotmail.com"
          className="group flex w-fit items-center gap-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-6 py-5 transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface-2)]"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--surface-2)] text-[var(--text-soft)] transition-colors group-hover:bg-[var(--border)]">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-[var(--text-muted)]">{t.contact.email}</span>
            <span className="text-base font-medium text-[var(--foreground)]">altan_8260@hotmail.com</span>
          </div>
          <svg className="ml-2 text-[var(--text-muted)] transition-colors group-hover:text-[var(--foreground)]" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 7h10v10" />
            <path d="M7 17 17 7" />
          </svg>
        </a>

        <a
          href="https://www.linkedin.com/in/muhammedaltan"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex w-fit items-center gap-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-6 py-5 transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface-2)]"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--surface-2)] text-[var(--text-soft)] transition-colors group-hover:bg-[var(--border)]">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M4.98 3.5C4.98 4.88 3.87 6 2.49 6S0 4.88 0 3.5 1.12 1 2.49 1s2.49 1.12 2.49 2.5zM.5 8h4V24h-4V8zm7 0h3.8v2.2h.1c.5-1 1.9-2.2 3.9-2.2 4.2 0 5 2.7 5 6.3V24h-4v-7.1c0-1.7 0-3.9-2.4-3.9s-2.7 1.9-2.7 3.8V24h-4V8z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-[var(--text-muted)]">{t.contact.linkedIn}</span>
            <span className="text-base font-medium text-[var(--foreground)]">muhammedaltan</span>
          </div>
          <svg className="ml-2 text-[var(--text-muted)] transition-colors group-hover:text-[var(--foreground)]" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 7h10v10" />
            <path d="M7 17 17 7" />
          </svg>
        </a>
      </section>
      <PageNav
        prev={{ label: t.sections.education, href: "/education" }}
      />
    </div>
  );
}
