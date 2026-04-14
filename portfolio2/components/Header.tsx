"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ThemeToggle, { type Theme } from "@/components/ThemeToggle";
import { getDictionary, type Locale } from "@/lib/i18n";

interface HeaderProps {
  locale: Locale;
  initialTheme: Theme;
}

export default function Header({ locale, initialTheme }: HeaderProps) {
  const t = getDictionary(locale);
  const sections = [
    { label: t.sections.introduction, href: "/" },
    { label: t.sections.about, href: "/about" },
    { label: t.sections.projects, href: "/projects" },
    { label: t.sections.skills, href: "/skills" },
    { label: t.sections.experience, href: "/experience" },
    { label: t.sections.education, href: "/education" },
    { label: t.sections.contact, href: "/contact" },
  ];
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--divider)] bg-[var(--background)] transition-colors duration-300">
      <div className="flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-3 md:hidden">
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? t.header.closeMenu : t.header.openMenu}
            className="rounded p-1.5 text-[var(--text-muted)] transition-colors hover:bg-[var(--surface)] hover:text-[var(--foreground)]"
          >
            {menuOpen ? (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
          <Link
            href="/"
            className="text-base font-semibold text-[var(--foreground)] transition-colors"
          >
            MA
          </Link>
        </div>

        {/* Left: brand + nav */}
        <div className="hidden md:flex items-center gap-5">
          <Link
            href="/"
            className="text-base font-semibold text-[var(--foreground)] transition-colors"
          >
            MA
          </Link>

          <nav className="flex items-center gap-1 text-base">
            <Link
              href="/"
              className="rounded px-2.5 py-1 font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--surface)]"
            >
              {t.header.home}
            </Link>
            <a
              href="https://www.linkedin.com/in/muhammedaltan"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 rounded px-2.5 py-1 text-[var(--text-muted)] transition-colors hover:bg-[var(--surface)] hover:text-[var(--foreground)]"
            >
              {t.header.linkedIn}
              <svg className="h-2.5 w-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            <a
              href="/resume.pdf"
              download="Muhammed Altan - Resume"
              className="flex items-center gap-1 rounded px-2.5 py-1 text-[var(--text-muted)] transition-colors hover:bg-[var(--surface)] hover:text-[var(--foreground)]"
            >
              {t.header.resume}
              <svg className="h-2.5 w-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v12" />
                <path strokeLinecap="round" strokeLinejoin="round" d="m7 10 5 5 5-5" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 21h14" />
              </svg>
            </a>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle locale={locale} initialTheme={initialTheme} />
          <a
            href="https://github.com/Muhammed-Altan"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.header.github}
            className="rounded p-1.5 text-[var(--text-muted)] transition-colors hover:bg-[var(--surface)] hover:text-[var(--foreground)]"
          >
            <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden="true">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </a>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-[var(--divider)] bg-[var(--background)] px-4 pb-5 pt-4 md:hidden">
          <div className="mb-4 grid grid-cols-2 gap-2">
            <a
              href="https://www.linkedin.com/in/muhammedaltan"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text-soft)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--foreground)]"
            >
              <span>{t.header.linkedIn}</span>
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            <a
              href="/resume.pdf"
              download="Muhammed Altan - Resume"
              className="flex items-center justify-between rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text-soft)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--foreground)]"
            >
              <span>{t.header.resume}</span>
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v12" />
                <path strokeLinecap="round" strokeLinejoin="round" d="m7 10 5 5 5-5" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 21h14" />
              </svg>
            </a>
          </div>

          <p className="mb-2 text-center text-xs font-semibold tracking-wide text-[var(--text-muted)]">{t.header.mobileSections}</p>
          <nav className="flex flex-col gap-2">
            {sections.map((section) => {
              const isActive = pathname === section.href;
              return (
                <Link
                  key={section.href}
                  href={section.href}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center justify-between rounded-xl border px-4 py-3 text-base transition-colors ${
                    isActive
                      ? "border-[var(--foreground)] bg-[var(--foreground)] text-[var(--background)]"
                      : "border-[var(--border)] bg-[var(--surface)] text-[var(--text-soft)] hover:border-[var(--border-strong)] hover:text-[var(--foreground)]"
                  }`}
                >
                  <span className="font-medium">{section.label}</span>
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m9 18 6-6-6-6" />
                  </svg>
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
