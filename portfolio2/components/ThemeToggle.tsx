"use client";

import { useEffect, useState } from "react";
import { getDictionary, type Locale } from "@/lib/i18n";

type Theme = "dark" | "light";

const STORAGE_KEY = "portfolio-theme";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

function persistTheme(theme: Theme) {
  window.localStorage.setItem(STORAGE_KEY, theme);
  document.cookie = `portfolio-theme=${theme}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
}

interface ThemeToggleProps {
  locale: Locale;
}

export default function ThemeToggle({ locale }: ThemeToggleProps) {
  const t = getDictionary(locale);
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const storedTheme = window.localStorage.getItem(STORAGE_KEY);
    const nextTheme: Theme = storedTheme === "light" ? "light" : "dark";

    setTheme(nextTheme);
    applyTheme(nextTheme);
  }, []);

  function toggleTheme() {
    setTheme((currentTheme) => {
      const nextTheme: Theme = currentTheme === "dark" ? "light" : "dark";

      applyTheme(nextTheme);
      persistTheme(nextTheme);

      return nextTheme;
    });
  }

  const nextLabel = theme === "dark" ? t.theme.lightMode : t.theme.darkMode;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-sm font-medium text-[var(--text-soft)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--foreground)]"
      aria-label={`${t.theme.switchTo} ${nextLabel.toLowerCase()}`}
      title={nextLabel}
    >
      {theme === "dark" ? (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path strokeLinecap="round" d="M12 2v2.5M12 19.5V22M4.93 4.93l1.77 1.77M17.3 17.3l1.77 1.77M2 12h2.5M19.5 12H22M4.93 19.07l1.77-1.77M17.3 6.7l1.77-1.77" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
        </svg>
      )}
      <span>{nextLabel}</span>
    </button>
  );
}