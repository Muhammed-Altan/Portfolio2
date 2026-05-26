import LoginForm from "@/components/admin/LoginForm";

export default function AdminLoginPage() {
  return (
    <section className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(15,118,110,0.24),_transparent_42%),linear-gradient(180deg,_rgba(9,9,11,0.98),_rgba(9,9,11,0.92))] px-4 py-10 text-[var(--foreground)]">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-3xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_92%,transparent)] shadow-2xl shadow-black/20 backdrop-blur md:grid-cols-[1.1fr_0.9fr]">
          <div className="flex flex-col justify-between gap-8 border-b border-[var(--border)] p-8 md:border-b-0 md:border-r md:p-12">
            <div className="space-y-5">
              <span className="inline-flex w-fit items-center rounded-full border border-[var(--border-strong)] bg-[var(--surface-2)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--text-muted)]">
                Admin Access
              </span>
              <div className="space-y-3">
                <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
                  Project control room
                </h1>
                <p className="max-w-xl text-base leading-relaxed text-[var(--text-soft)] md:text-lg">
                  Sign in to manage the portfolio backend. The project editor is intentionally left open for the next iteration, but the auth flow and admin landing page are ready now.
                </p>
              </div>
            </div>

            <div className="grid gap-3 text-sm text-[var(--text-muted)] sm:grid-cols-2">
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
                <p className="font-semibold text-[var(--foreground)]">Protected session</p>
                <p className="mt-1 leading-relaxed">JWT cookies keep the admin area gated between visits.</p>
              </div>
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
                <p className="font-semibold text-[var(--foreground)]">Future ready</p>
                <p className="mt-1 leading-relaxed">The dashboard leaves room for project editing tools later.</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center p-8 md:p-12">
            <LoginForm />
          </div>
        </div>
      </div>
    </section>
  );
}