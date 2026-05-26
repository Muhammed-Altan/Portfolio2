import Link from "next/link";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/admin/LogoutButton";
import { getAuthenticatedAdminFromCookies } from "@/lib/admin-auth";
import { createClient } from "@/utils/supabase/server";

export default async function AdminDashboardPage() {
  const session = await getAuthenticatedAdminFromCookies();

  if (!session) {
    redirect("/admin/login");
  }

  const supabase = await createClient();
  const { data: projects } = await supabase
    .from("projects")
    .select("id,title,role,duration")
    .order("created_at", { ascending: false })
    .limit(6);

  const cards = [
    {
      title: "Project editor",
      description: "Create projects with flexible text and image block ordering.",
    },
    {
      title: "Deployment status",
      description: "Keep an eye on draft content, publish states, and future integrations.",
    },
    {
      title: "Content workflow",
      description: "A place to review, update, and organize portfolio sections later.",
    },
  ];

  return (
    <section className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(15,118,110,0.18),_transparent_38%),linear-gradient(180deg,_rgba(9,9,11,1),_rgba(14,14,16,1))] px-4 py-8 text-[var(--foreground)] md:px-8 md:py-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <div className="flex flex-col gap-4 rounded-3xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_90%,transparent)] p-6 shadow-2xl shadow-black/20 backdrop-blur md:flex-row md:items-center md:justify-between md:p-8">
          <div className="space-y-2">
            <span className="inline-flex w-fit rounded-full border border-[var(--border-strong)] bg-[var(--surface-2)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--text-muted)]">
              Admin dashboard
            </span>
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Welcome back, {session.email}
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-[var(--text-soft)] md:text-base">
              The authentication layer is live. This dashboard is the landing zone for the project management tools you want to add next.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--text-muted)]">
              Role
              <div className="mt-1 font-semibold text-[var(--foreground)]">{session.role}</div>
            </div>
            <LogoutButton />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {cards.map((card) => (
            <article key={card.title} className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-lg shadow-black/10">
              <h2 className="text-lg font-semibold">{card.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">{card.description}</p>
            </article>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-lg shadow-black/10">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold">Project management area</h2>
                <p className="mt-1 text-sm text-[var(--text-muted)]">The editor is ready for adding project metadata and mixed content blocks.</p>
              </div>
              <Link href="/admin/projects" className="rounded-full border border-[var(--border-strong)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)] hover:border-[var(--foreground)] hover:text-[var(--foreground)]">
                Open editor
              </Link>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {(projects ?? []).length === 0 ? (
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-4 md:col-span-2">
                  <p className="text-sm font-semibold text-[var(--foreground)]">Projects list</p>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">No projects yet. Use Open editor to create your first project.</p>
                </div>
              ) : (
                (projects ?? []).map((project) => (
                  <div key={project.id} className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-4">
                    <p className="text-sm font-semibold text-[var(--foreground)]">{project.title}</p>
                    <p className="mt-2 text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">{project.role} • {project.duration}</p>
                  </div>
                ))
              )}
            </div>
          </section>

          <aside className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-lg shadow-black/10">
            <h2 className="text-xl font-semibold">Session summary</h2>
            <dl className="mt-5 space-y-4 text-sm">
              <div className="flex items-start justify-between gap-4 rounded-2xl border border-[var(--border)] bg-[var(--background)] px-4 py-3">
                <dt className="text-[var(--text-muted)]">Authenticated user</dt>
                <dd className="font-medium text-[var(--foreground)]">{session.email}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </div>
    </section>
  );
}