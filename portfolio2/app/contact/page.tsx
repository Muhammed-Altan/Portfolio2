import PageNav from "@/components/PageNav";

export default function ContactPage() {
  return (
    <div className="flex flex-col justify-between min-h-full">
      <section className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold text-white">Let&apos;s talk.</h1>
          <p className="text-lg text-zinc-400">
            Have a question, a project in mind, or just want to say hi? My inbox is always open.
          </p>
        </div>

        <a
          href="mailto:altan_8260@hotmail.com"
          className="group flex items-center gap-4 w-fit rounded-xl border border-zinc-700 bg-zinc-900 px-6 py-5 transition hover:border-zinc-500 hover:bg-zinc-800"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-zinc-300 group-hover:bg-zinc-700">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-zinc-500">Email</span>
            <span className="text-base font-medium text-zinc-100">altan_8260@hotmail.com</span>
          </div>
          <svg className="ml-2 text-zinc-600 group-hover:text-zinc-400 transition" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 7h10v10" />
            <path d="M7 17 17 7" />
          </svg>
        </a>

        <a
          href="https://www.linkedin.com/in/muhammedaltan"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-4 w-fit rounded-xl border border-zinc-700 bg-zinc-900 px-6 py-5 transition hover:border-zinc-500 hover:bg-zinc-800"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-zinc-300 group-hover:bg-zinc-700">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M4.98 3.5C4.98 4.88 3.87 6 2.49 6S0 4.88 0 3.5 1.12 1 2.49 1s2.49 1.12 2.49 2.5zM.5 8h4V24h-4V8zm7 0h3.8v2.2h.1c.5-1 1.9-2.2 3.9-2.2 4.2 0 5 2.7 5 6.3V24h-4v-7.1c0-1.7 0-3.9-2.4-3.9s-2.7 1.9-2.7 3.8V24h-4V8z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-zinc-500">LinkedIn</span>
            <span className="text-base font-medium text-zinc-100">muhammedaltan</span>
          </div>
          <svg className="ml-2 text-zinc-600 group-hover:text-zinc-400 transition" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 7h10v10" />
            <path d="M7 17 17 7" />
          </svg>
        </a>
      </section>
      <PageNav
        prev={{ label: "Education", href: "/education" }}
      />
    </div>
  );
}
