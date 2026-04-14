import PageNav from "@/components/PageNav";
import { getRequestLocale } from "@/lib/getLocale";
import { getDictionary } from "@/lib/i18n";

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
      { name: "bcrypt" },
      { name: "cors" },
      { name: "express-rate-limit" },
      { name: "sanitize-html" },
      { name: "jwt-decode" },
      { name: "uuid" },
      { name: "Nodemailer" },
      { name: "Zod" },
    ],
  },
  {
    label: "Database & Auth",
    skills: [
      { name: "MongoDB",  icon: "mongodb" },
      { name: "Mongo Express" },
      { name: "Supabase", icon: "supabase" },
    ],
  },
  {
    label: "Testing",
    skills: [
      { name: "Jest",      icon: "jest" },
      { name: "Supertest" },
      { name: "Vitest",    icon: "vitest" },
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
      { name: "Docker",  icon: "docker" },
      { name: "Git",     icon: "git" },
      { name: "GitHub",  icon: "github" },
      { name: "Nodemon", icon: "nodemon" },
      { name: "npm",     icon: "npm" },
      { name: "Netlify", icon: "netlify" },
      { name: "Vercel",  icon: "vercel" },
      { name: "jsPDF" },
    ],
  },
];

export default function SkillsPage() {
  return <LocalizedSkillsPage />;
}

async function LocalizedSkillsPage() {
  const locale = await getRequestLocale();
  const t = getDictionary(locale);

  const localizedGroups = [
    { label: t.skills.groups.frontend, skills: skillGroups[0].skills },
    { label: t.skills.groups.backendApi, skills: skillGroups[1].skills },
    { label: t.skills.groups.databaseAuth, skills: skillGroups[2].skills },
    { label: t.skills.groups.testing, skills: skillGroups[3].skills },
    { label: t.skills.groups.integrations, skills: skillGroups[4].skills },
    { label: t.skills.groups.devInfra, skills: skillGroups[5].skills },
  ];

  return (
    <div className="flex flex-col justify-between min-h-full">
      <section className="flex flex-col gap-6">
        <div>
          <h1 className="text-4xl font-bold text-[var(--foreground)]">{t.skills.title}</h1>
          <h2 className="mt-1 text-2xl font-bold text-[var(--text-muted)]">
            {t.skills.subtitle}
          </h2>
        </div>

        <p className="max-w-3xl text-lg leading-relaxed text-[var(--text-soft)]">
          {t.skills.body}
        </p>

        <div className="flex flex-col gap-6">
          {localizedGroups.map((group) => (
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
        prev={{ label: t.sections.projects, href: "/projects" }}
        next={{ label: t.sections.experience, href: "/experience" }}
      />
    </div>
  );
}
