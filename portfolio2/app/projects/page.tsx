import PageNav from "@/components/PageNav";

export default function ProjectsPage() {
  return (
    <div className="flex flex-col justify-between min-h-full">
      <section className="flex flex-col gap-5">
        <h1 className="text-4xl font-bold text-white">Projects</h1>
        <p className="text-lg text-zinc-400">Projects content goes here.</p>
      </section>
      <PageNav
        prev={{ label: "About Me", href: "/about" }}
        next={{ label: "Skills & Tools", href: "/skills" }}
      />
    </div>
  );
}
