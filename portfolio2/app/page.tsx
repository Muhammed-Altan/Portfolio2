import Link from "next/link";
import Image from "next/image";
import PageNav from "@/components/PageNav";

export default function Home() {
  return (
    <div className="flex flex-col justify-between min-h-full">
      {/* Main content */}
      <div className="flex items-start gap-12 pt-10">

        {/* Text */}
        <div className="flex flex-col gap-8 flex-1">
          <div>
            <h1 className="text-5xl font-bold text-white">Muhammed Altan</h1>
            <h2 className="mt-1 text-3xl font-bold text-zinc-400">
              A developer who loves building things.
            </h2>
          </div>

          <p className="text-lg leading-relaxed text-zinc-300">
            Full stack developer with a background in both web development and multimedia design.
            I have a strong interest in developing web and system solutions, databases, and
            user-friendly products. I work in a structured manner, am eager to learn, and
            thrive both independently and in teams.
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-4">
            <a
              href="/resume.pdf"
              download="Muhammed Altan - Resume"
              className="flex items-center gap-2 rounded-md bg-violet-600 hover:bg-violet-700 transition-colors px-5 py-2.5 text-base font-semibold text-white"
            >
              Get Resume
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            <a
              href="mailto:altan_8260@hotmail.com"
              className="flex items-center gap-2 text-base font-medium text-zinc-300 hover:text-white transition-colors"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Send Mail
            </a>
          </div>
        </div>

        {/* Profile photo */}
        <div className="shrink-0">
          <Image
            src="/MA.png"
            alt="Muhammed Altan"
            width={180}
            height={180}
            className="rounded-full object-cover"
            priority
          />
        </div>
      </div>

      <PageNav next={{ label: "About Me", href: "/about" }} />
    </div>
  );
}
