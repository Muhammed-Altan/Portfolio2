import { cookies, headers } from "next/headers";
import { DEFAULT_LOCALE, Locale } from "@/lib/i18n";

function parseAcceptLanguage(value: string | null): Locale {
  if (!value) {
    return DEFAULT_LOCALE;
  }

  return value.toLowerCase().includes("da") ? "da" : DEFAULT_LOCALE;
}

export async function getRequestLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("portfolio-locale")?.value;

  if (cookieLocale === "da" || cookieLocale === "en") {
    return cookieLocale;
  }

  const headerStore = await headers();
  return parseAcceptLanguage(headerStore.get("accept-language"));
}
