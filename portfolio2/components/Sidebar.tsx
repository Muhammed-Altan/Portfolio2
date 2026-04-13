"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const sections = [
  { label: "Introduction", href: "/" },
  { label: "About Me", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Skills & Tools", href: "/skills" },
  { label: "Experience", href: "/experience" },
  { label: "Education", href: "/education" },
  { label: "Contact", href: "/contact" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-52 shrink-0 border-r border-zinc-800 bg-zinc-950 pt-5 pb-10 px-2">
      <p className="px-3 mb-2 text-sm font-semibold text-zinc-100">
        Sections
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
                  ? "bg-zinc-100 text-zinc-900 font-medium"
                  : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
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
