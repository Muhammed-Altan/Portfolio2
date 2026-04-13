import PageNav from "@/components/PageNav";

export default function ContactPage() {
  return (
    <div className="flex flex-col justify-between min-h-full">
      <section className="flex flex-col gap-5">
        <h1 className="text-4xl font-bold text-white">Contact</h1>
        <p className="text-lg text-zinc-400">Your contact content goes here.</p>
      </section>
      <PageNav
        prev={{ label: "Education", href: "/education" }}
      />
    </div>
  );
}
