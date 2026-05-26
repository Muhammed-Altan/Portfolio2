import Link from "next/link";
import { redirect } from "next/navigation";
import ProjectEditorManager from "@/components/admin/ProjectEditorManager";
import { getAuthenticatedAdminFromCookies } from "@/lib/admin-auth";

export default async function AdminProjectsPage() {
  const session = await getAuthenticatedAdminFromCookies();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <section className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(15,118,110,0.18),_transparent_38%),linear-gradient(180deg,_rgba(9,9,11,1),_rgba(14,14,16,1))] px-4 py-8 text-[var(--foreground)] md:px-8 md:py-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <div className="flex flex-col gap-4 rounded-3xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_90%,transparent)] p-6 shadow-2xl shadow-black/20 backdrop-blur md:flex-row md:items-center md:justify-between md:p-8">
          <div className="space-y-2">
            <span className="inline-flex w-fit rounded-full border border-[var(--border-strong)] bg-[var(--surface-2)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--text-muted)]">
              Admin project editor
            </span>
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Build dynamic projects</h1>
            <p className="max-w-2xl text-sm leading-relaxed text-[var(--text-soft)] md:text-base">
              Add top metadata and then stack text and image blocks in any order.
            </p>
          </div>

          <Link href="/admin" className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-medium hover:border-[var(--border-strong)]">
            Back to dashboard
          </Link>
        </div>

        <ProjectEditorManager />
      </div>
    </section>
  );
}
