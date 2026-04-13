import PageNav from "@/components/PageNav";

export default function AboutPage() {
  return (
    <div className="flex flex-col justify-between min-h-full">
      <section className="flex flex-col gap-5">
        <h1 className="text-4xl font-bold text-[var(--foreground)]">About Muhammed</h1>
        <h1 className="text-4xl font-bold text-[var(--text-muted)]">More than just a name</h1>
        <p className="text-lg leading-relaxed text-[var(--text-soft)]">
          I am a passionate backend developer with a strong knack for building full-stack web applications using modern technologies like Next.js, Nuxt.js, Tailwind CSS and more. 
          My journey in tech started with a curiosity for HTML and CSS and later was fueled by a desire to create dynamic, data-driven applications. 
          With my background as a multimedia designer, I have a unique perspective on user experience and design, which I integrate into my development work to create seamless and engaging applications.
          As a full stack developer with a web development bachelor's degree, I have a solid foundation in both frontend and backend technologies, allowing me to build comprehensive solutions that are not only functional but also user-friendly.
        </p>
        <p className="text-lg leading-relaxed text-[var(--text-soft)]">
          While I may not have years of senior-level experience, I have a solid technical
          foundation and a strong drive for backend development. I&apos;ve built backend
          services, RESTful APIs, and worked with databases, version control, and team
          collaboration. I&apos;m a fast learner who enjoys picking up new technologies quickly.
        </p>
        <p className="text-lg leading-relaxed text-[var(--text-soft)]">
          I&apos;m particularly drawn to data-driven systems where performance and scalability
          matter, and I&apos;m eager to grow within cloud technologies, containerized solutions,
          and DevOps practices.
        </p>
        <p className="text-lg leading-relaxed text-[var(--text-soft)]">
          Outside of tech, my background as a store manager sharpened my communication,
          structure, and teamwork skills — qualities I bring into every project I work on.
          I thrive in agile, collaborative environments where knowledge is shared and quality
          is a shared responsibility.
        </p>
      </section>
      <PageNav
        prev={{ label: "Introduction", href: "/" }}
        next={{ label: "Projects", href: "/projects" }}
      />
    </div>
  );
}
