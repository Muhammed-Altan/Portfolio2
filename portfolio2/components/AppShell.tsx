"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import type { Theme } from "@/components/ThemeToggle";
import type { Locale } from "@/lib/i18n";
import type { ReactNode } from "react";

interface AppShellProps {
  locale: Locale;
  initialTheme: Theme;
  children: ReactNode;
}

export default function AppShell({ locale, initialTheme, children }: AppShellProps) {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return <main className="flex-1">{children}</main>;
  }

  return (
    <>
      <Header locale={locale} initialTheme={initialTheme} />
      <div className="flex flex-1">
        <Sidebar locale={locale} />
        <main className="flex-1 overflow-y-auto p-5 md:p-10">
          {children}
        </main>
      </div>
    </>
  );
}