import PageNav from "@/components/PageNav";

type Skill = { name: string; icon?: string };

const skillGroups: { label: string; skills: Skill[] }[] = [
  {
    label: "Frontend",
    skills: [
      { name: "HTML",         icon: "html5" },
      { name: "CSS",          icon: "css" },
      { name: "JavaScript",   icon: "javascript" },
      { name: "TypeScript",   icon: "typescript" },
      { name: "Next.js",      icon: "nextdotjs" },
      { name: "React",        icon: "react" },
      { name: "Vue.js",       icon: "vuedotjs" },
      { name: "Nuxt.js",      icon: "nuxt" },
      { name: "Tailwind CSS", icon: "tailwindcss" },
      { name: "Nuxt UI" },
      { name: "Pinia" },
    ],
  },
  {
    label: "Backend / API",
    skills: [
      { name: "Cookies" },
      { name: "Nitro" },
      { name: "Express",    icon: "express" },
      { name: "Node.js",    icon: "nodedotjs" },
      { name: "JWT",        icon: "jsonwebtokens" },
      { name: "Nodemailer" },
      { name: "Zod" },
    ],
  },
  {
    label: "Database & Auth",
    skills: [
      { name: "MongoDB",  icon: "mongodb" },
      { name: "Supabase", icon: "supabase" },
    ],
  },
  {
    label: "Integrations",
    skills: [
      { name: "PensoPay" },
    ],
  },
  {
    label: "Dev & Infrastructure",
    skills: [
      { name: "Git",     icon: "git" },
      { name: "GitHub",  icon: "github" },
      { name: "npm",     icon: "npm" },
      { name: "Netlify", icon: "netlify" },
      { name: "Vercel",  icon: "vercel" },
      { name: "Vitest",  icon: "vitest" },
      { name: "jsPDF" },
    ],
  },
];

export default function SkillsPage() {
  return (
    <div className="flex flex-col justify-between min-h-full">
      <section className="flex flex-col gap-6">
        <div>
          <h1 className="text-4xl font-bold text-[var(--foreground)]">Skills &amp; Tools</h1>
          <h2 className="mt-1 text-2xl font-bold text-[var(--text-muted)]">
            Learned by coding all night and debugging all day!
          </h2>
        </div>

        <p className="max-w-3xl text-lg leading-relaxed text-[var(--text-soft)]">
          I specialize in building full-stack web applications using modern technologies.
          My stack is centred around the Vue / Nuxt ecosystem, with a strong backend
          foundation using Node.js, Express, MongoDB, Supabase, and RESTful APIs.
        </p>

        <div className="flex flex-col gap-6">
          {skillGroups.map((group) => (
            <div key={group.label}>
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
                {group.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className="flex items-center gap-2 rounded-md border border-[var(--skill-border)] bg-[var(--skill-surface)] px-3 py-1.5 text-sm font-medium text-[var(--skill-foreground)]"
                  >
                    {skill.icon && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={`https://cdn.simpleicons.org/${skill.icon}`}
                        alt=""
                        aria-hidden="true"
                        className="h-4 w-4"
                      />
                    )}
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <PageNav
        prev={{ label: "Projects", href: "/projects" }}
        next={{ label: "Experience", href: "/experience" }}
      />
    </div>
  );
}
