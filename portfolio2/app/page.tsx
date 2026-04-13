import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col justify-between min-h-full">
      {/* Main content */}
      <div className="flex flex-col gap-6 pt-10">
        <div>
          <h1 className="text-4xl font-bold text-white">Muhammed Altan</h1>
          <h2 className="mt-2 text-3xl font-bold text-zinc-400">
            A developer who loves building things.
          </h2>
        </div>

        <p className="max-w-2xl text-base leading-relaxed text-zinc-300">
          I am a dedicated Software Developer specializing in full-stack application
          development. I enjoy building responsive web solutions using modern
          technologies like Next.js, React, Tailwind CSS, and Node.js, continuously
          aiming to deliver high-quality, user-centric software.
        </p>

        {/* Buttons */}
        <div className="flex items-center gap-4">
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-md bg-violet-600 hover:bg-violet-700 transition-colors px-4 py-2 text-sm font-semibold text-white"
          >
            Get Resume
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
          <a
            href="mailto:your@email.com"
            className="flex items-center gap-2 text-sm font-medium text-zinc-300 hover:text-white transition-colors"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Send Mail
          </a>
        </div>
      </div>

      {/* Bottom-right: next section link */}
      <div className="flex justify-end mt-16">
        <Link
          href="/about"
          className="flex items-center gap-1 text-sm font-medium text-zinc-300 hover:text-white transition-colors"
        >
          About Me
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
