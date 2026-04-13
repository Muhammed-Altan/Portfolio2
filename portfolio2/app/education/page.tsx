import PageNav from "@/components/PageNav";

export default function EducationPage() {
  return (
    <div className="flex flex-col justify-between min-h-full">
      <section className="flex flex-col gap-8">
        <h1 className="text-4xl font-bold text-[var(--foreground)]">Education</h1>

        <div className="flex flex-col gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-colors duration-300">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
              Academy Profession Degree
            </p>
            <h2 className="text-2xl font-bold text-[var(--foreground)]">Multimedia Design</h2>
            <p className="text-sm text-[var(--text-muted)]">2 years, including an internship</p>
          </div>

          <p className="text-base leading-relaxed text-[var(--text-soft)]">
            Multimedia Design gave me a strong foundation in digital design, user experience,
            content creation, and frontend development. It taught me how to work from idea to
            finished solution, while thinking about both usability and the visual side of a product.
          </p>

          <p className="text-base leading-relaxed text-[var(--text-soft)]">
            During my studies, I learned how to approach digital projects in a practical way,
            often through real cases and collaboration-based assignments. It helped me strengthen my
            understanding of design processes, frontend thinking, and how to create digital experiences
            that are both functional and user-focused.
          </p>
        </div>

        <div className="flex flex-col gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-colors duration-300">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
              Bachelor&apos;s Degree
            </p>
            <h2 className="text-2xl font-bold text-[var(--foreground)]">Web Developer</h2>
            <p className="text-sm text-[var(--text-muted)]">1.5 years, including an internship</p>
          </div>

          <p className="text-base leading-relaxed text-[var(--text-soft)]">
            My web development education built on my earlier design background and moved me deeper into
            programming, system thinking, and the technical side of building web solutions. It gave me a
            stronger understanding of how to structure applications, work with databases, and develop more
            complete and scalable solutions.
          </p>

          <p className="text-base leading-relaxed text-[var(--text-soft)]">
            Through this degree, I developed my skills in both frontend and backend development and gained
            more confidence in turning ideas into working products. It played a big role in shaping me into
            a full stack developer and gave me the technical foundation I continue to build on today.
          </p>
        </div>
      </section>
      <PageNav
        prev={{ label: "Experience", href: "/experience" }}
        next={{ label: "Contact", href: "/contact" }}
      />
    </div>
  );
}
