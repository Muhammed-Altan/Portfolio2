import PageNav from "@/components/PageNav";

export default function ExperiencePage() {
  return (
    <div className="flex flex-col justify-between min-h-full">
      <section className="flex flex-col gap-8">
        <h1 className="text-4xl font-bold text-[var(--foreground)]">Experience</h1>

        <div className="flex flex-col gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-colors duration-300">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
                Frontend / Full Stack Developer
              </p>
              <h2 className="text-2xl font-bold text-[var(--foreground)]">LejGoPro.dk</h2>
              <p className="text-sm text-[var(--text-muted)]">3 months internship + collaboration on bachelor&apos;s exam project</p>
            </div>

            <a
              href="https://lejgopro.dk"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 rounded-md border border-[var(--border)] bg-[var(--surface-2)] px-3 py-1.5 text-sm font-medium text-[var(--foreground)] transition-colors hover:border-[var(--border-strong)]"
            >
              Visit Site
            </a>
          </div>

          <p className="text-base leading-relaxed text-[var(--text-soft)]">
            At LejGoPro.dk, I worked with both frontend and backend development in a real business setup.
            I helped build and improve platform features with a strong focus on practical, user-friendly
            solutions that support real customer needs.
          </p>

          <p className="text-base leading-relaxed text-[var(--text-soft)]">
            I also developed my bachelor&apos;s exam project in collaboration with the same company, where I
            combined design, frontend development, backend logic, and system structure in one complete
            solution. This gave me strong hands-on experience in taking a product from concept to delivery
            and further shaped my profile as a full stack developer.
          </p>
        </div>

        <div className="flex flex-col gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-colors duration-300">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
              Academic Project (2nd Semester)
            </p>
            <h2 className="text-2xl font-bold text-[var(--foreground)]">Kantine Web Application</h2>
          </div>

          <p className="text-base leading-relaxed text-[var(--text-soft)]">
            I developed a full-stack canteen management web application as part of my second-semester
            academic project. I built a complete ordering solution with authentication, an admin panel,
            and order handling features using a modern containerized setup.
          </p>

          <p className="text-base leading-relaxed text-[var(--text-soft)]">
            Through this project, I gained practical experience with Docker, RESTful API design, database security,
            and responsive UI development. It strengthened my ability to build secure, scalable applications with
            clear separation of concerns and deployment-ready infrastructure.
          </p>
        </div>
      </section>
      <PageNav
        prev={{ label: "Skills & Tools", href: "/skills" }}
        next={{ label: "Education", href: "/education" }}
      />
    </div>
  );
}
