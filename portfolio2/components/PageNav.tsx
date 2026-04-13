import Link from "next/link";

interface PageNavProps {
  prev?: { label: string; href: string };
  next?: { label: string; href: string };
}

export default function PageNav({ prev, next }: PageNavProps) {
  return (
    <div className="mt-16 flex items-center justify-between border-t border-[var(--divider)] pt-6 transition-colors duration-300">
      <div>
        {prev && (
          <Link
            href={prev.href}
            className="flex items-center gap-1 text-sm font-medium text-[var(--text-muted)] transition-colors hover:text-[var(--foreground)]"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            {prev.label}
          </Link>
        )}
      </div>
      <div>
        {next && (
          <Link
            href={next.href}
            className="flex items-center gap-1 text-sm font-medium text-[var(--text-muted)] transition-colors hover:text-[var(--foreground)]"
          >
            {next.label}
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        )}
      </div>
    </div>
  );
}
