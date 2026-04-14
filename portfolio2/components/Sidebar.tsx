"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getDictionary, type Locale } from "@/lib/i18n";

interface SidebarProps {
  locale: Locale;
}

export default function Sidebar({ locale }: SidebarProps) {
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

  return (
    <aside className="hidden md:flex w-52 shrink-0 flex-col border-r border-[var(--divider)] bg-[var(--background)] px-2 pb-10 pt-5 transition-colors duration-300">
      <p className="mb-2 px-3 text-base font-semibold text-[var(--foreground)]">
        {t.sections.sections}
      </p>
      <nav className="flex flex-col gap-0.5">
        {sections.map((section) => {
          const isActive = pathname === section.href;
          return (
            <Link
              key={section.href}
              href={section.href}
              className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
                isActive
                  ? "bg-[var(--foreground)] font-medium text-[var(--background)]"
                  : "text-[var(--text-muted)] hover:bg-[var(--surface)] hover:text-[var(--foreground)]"
              }`}
            >
              {section.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
