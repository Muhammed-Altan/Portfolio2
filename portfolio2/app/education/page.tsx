import PageNav from "@/components/PageNav";

export default function EducationPage() {
  return (
    <div className="flex flex-col justify-between min-h-full">
      <section className="flex flex-col gap-5">
        <h1 className="text-4xl font-bold text-white">Education</h1>
        <p className="text-lg text-zinc-400">Your education content goes here.</p>
      </section>
      <PageNav
        prev={{ label: "Experience", href: "/experience" }}
        next={{ label: "Contact", href: "/contact" }}
      />
    </div>
  );
}
