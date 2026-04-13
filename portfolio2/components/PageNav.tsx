import Link from "next/link";

interface PageNavProps {
  prev?: { label: string; href: string };
  next?: { label: string; href: string };
}

export default function PageNav({ prev, next }: PageNavProps) {
  return (
    <div className="flex justify-between items-center mt-16 pt-6 border-t border-zinc-800">
      <div>
        {prev && (
          <Link
            href={prev.href}
            className="flex items-center gap-1 text-sm font-medium text-zinc-400 hover:text-white transition-colors"
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
            className="flex items-center gap-1 text-sm font-medium text-zinc-400 hover:text-white transition-colors"
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
