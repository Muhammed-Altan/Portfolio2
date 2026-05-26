"use client";

import { useRouter } from "next/navigation";
import { getDictionary, type Locale } from "@/lib/i18n";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

interface LanguageSelectProps {
  locale: Locale;
}

export default function LanguageSelect({ locale }: LanguageSelectProps) {
  const router = useRouter();
  const t = getDictionary(locale);
  const currentFlag = locale === "da" ? "🇩🇰" : "🇺🇸";
  const currentLabel = locale === "da" ? t.header.languageDanish : t.header.languageEnglishUs;

  function handleLanguageChange(nextLocale: string) {
    if (nextLocale !== "en" && nextLocale !== "da") {
      return;
    }

    document.cookie = `portfolio-locale=${nextLocale}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
    router.refresh();
  }

  return (
    <div className="flex items-center gap-2">
      <span
        className="text-lg leading-none"
        aria-hidden="true"
        title={currentLabel}
      >
        {currentFlag}
      </span>

      <div className="relative">
        <select
          value={locale}
          onChange={(event) => handleLanguageChange(event.target.value)}
          aria-label={t.header.language}
          title={t.header.language}
          className="h-9 cursor-pointer appearance-none rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 pr-8 text-sm font-medium text-[var(--text-soft)] transition-all hover:border-[var(--border-strong)] hover:bg-[var(--surface-2)] hover:text-[var(--foreground)] focus:border-[var(--border-strong)] focus:outline-none"
        >
          <option value="en">{t.header.languageEnglishUs}</option>
          <option value="da">{t.header.languageDanish}</option>
        </select>
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[var(--text-muted)]">
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
          </svg>
        </span>
      </div>
    </div>
  );
}
