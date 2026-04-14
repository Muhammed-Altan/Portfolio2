import { NextRequest, NextResponse } from "next/server";

const LOCALE_COOKIE = "portfolio-locale";

function detectLocale(request: NextRequest): "en" | "da" {
  const acceptLanguage = request.headers.get("accept-language")?.toLowerCase() ?? "";
  return acceptLanguage.includes("da") ? "da" : "en";
}

export function middleware(request: NextRequest) {
  const existingLocale = request.cookies.get(LOCALE_COOKIE)?.value;

  if (existingLocale === "da" || existingLocale === "en") {
    return NextResponse.next();
  }

  const response = NextResponse.next();
  response.cookies.set({
    name: LOCALE_COOKIE,
    value: detectLocale(request),
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"],
};
