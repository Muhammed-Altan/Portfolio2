import PageNav from "@/components/PageNav";

export default function ExperiencePage() {
  return (
    <div className="flex flex-col justify-between min-h-full">
      <section className="flex flex-col gap-5">
        <h1 className="text-4xl font-bold text-white">Experience</h1>
        <p className="text-lg text-zinc-400">Experience content goes here.</p>
      </section>
      <PageNav
        prev={{ label: "Skills & Tools", href: "/skills" }}
        next={{ label: "Education", href: "/education" }}
      />
    </div>
  );
}
