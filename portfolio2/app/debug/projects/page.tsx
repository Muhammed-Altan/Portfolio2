import ProjectDiagnosticsPanel from "@/components/ProjectDiagnosticsPanel";
import { getRequestLocale } from "@/lib/getLocale";

export const dynamic = "force-dynamic";

export default async function ProjectDiagnosticsPage() {
  const locale = await getRequestLocale();

  return (
    <div className="flex min-h-full flex-col gap-8">
      <section className="space-y-3">
        <h1 className="text-4xl font-bold text-[var(--foreground)]">Project Diagnostics</h1>
        <p className="max-w-3xl text-base text-[var(--text-muted)]">
          Use this page on localhost and on Vercel to compare how long the public project queries and project images take to resolve. The API route also writes a structured log line to the server console.
        </p>
      </section>

      <ProjectDiagnosticsPanel initialLocale={locale} />
    </div>
  );
}