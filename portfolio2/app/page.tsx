import Image from "next/image";
import PageNav from "@/components/PageNav";
import { getRequestLocale } from "@/lib/getLocale";
import { getDictionary } from "@/lib/i18n";

export default async function Home() {
  const locale = await getRequestLocale();
  const t = getDictionary(locale);

  return (
    <div className="flex flex-col justify-between min-h-full">
      {/* Main content */}
      <div className="flex items-start gap-12 pt-10">

        {/* Text */}
        <div className="flex flex-col gap-8 flex-1">
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

        {/* Profile photo */}
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
      </div>

      <PageNav next={{ label: t.sections.about, href: "/about" }} />
    </div>
  );
}
