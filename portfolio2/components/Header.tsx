import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950">
      <div className="flex h-14 items-center justify-between px-4">

        {/* Left: brand + nav */}
        <div className="flex items-center gap-5">
          <Link
            href="/"
            className="text-base font-semibold text-zinc-100 hover:text-white transition-colors"
          >
            ma.dev
          </Link>

          <nav className="flex items-center gap-1 text-base">
            <Link
              href="/"
              className="rounded px-2.5 py-1 font-medium text-zinc-100 hover:bg-zinc-800 transition-colors"
            >
              Home
            </Link>
            <a
              href="https://www.linkedin.com/in/muhammedaltan"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 rounded px-2.5 py-1 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 transition-colors"
            >
              LinkedIn
              <svg className="h-2.5 w-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 rounded px-2.5 py-1 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 transition-colors"
            >
              Resume
              <svg className="h-2.5 w-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </nav>
        </div>

        {/* Right: GitHub */}
        <a
          href="https://github.com/Muhammed-Altan"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="rounded p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 transition-colors"
        >
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden="true">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
        </a>
      </div>
    </header>
  );
}
