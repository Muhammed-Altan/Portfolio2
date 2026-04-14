import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { getRequestLocale } from "@/lib/getLocale";
import { getDictionary } from "@/lib/i18n";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const t = getDictionary(locale);

  return {
    title: t.metadata.title,
    description: t.metadata.description,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getRequestLocale();
  const cookieStore = await cookies();
  const savedTheme = cookieStore.get("portfolio-theme")?.value === "light" ? "light" : "dark";

  return (
    <html
      lang={locale}
      data-theme={savedTheme}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
        <Script id="theme-init" strategy="beforeInteractive">
          {`try {
            const cookieTheme = document.cookie
              .split("; ")
              .find((entry) => entry.startsWith("portfolio-theme="))
              ?.split("=")[1];
            const storedTheme = window.localStorage.getItem("portfolio-theme");
            const nextTheme = cookieTheme === "light" || storedTheme === "light" ? "light" : "dark";

            document.documentElement.dataset.theme = nextTheme;
            window.localStorage.setItem("portfolio-theme", nextTheme);
            document.cookie = "portfolio-theme=" + nextTheme + "; path=/; max-age=31536000; SameSite=Lax";
          } catch {
            document.documentElement.dataset.theme = "dark";
          }`}
        </Script>
        <Header locale={locale} />
        <div className="flex flex-1">
          <Sidebar locale={locale} />
          <main className="flex-1 overflow-y-auto p-5 md:p-10">
            {children}
          </main>
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
