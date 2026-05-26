export type SkillMarqueeItem = {
  name: string;
  icon?: string;
  width?: number;
  height?: number;
};

const defaultItems: SkillMarqueeItem[] = [
  { name: "Next.js", icon: "nextdotjs", width: 88, height: 28 },
  { name: "React", icon: "react", width: 88, height: 28 },
  { name: "TypeScript", icon: "typescript", width: 98, height: 28 },
  { name: "Tailwind CSS", icon: "tailwindcss", width: 128, height: 28 },
  { name: "Node.js", icon: "nodedotjs", width: 98, height: 28 },
  { name: "Express", icon: "express", width: 98, height: 28 },
  { name: "Supabase", icon: "supabase", width: 112, height: 28 },
  { name: "MongoDB", icon: "mongodb", width: 108, height: 28 },
  { name: "Docker", icon: "docker", width: 92, height: 28 },
  { name: "Jest", icon: "jest", width: 72, height: 28 },
  { name: "Vercel", icon: "vercel", width: 84, height: 28 },
  { name: "Git", icon: "git", width: 62, height: 28 },
];

interface SkillsMarqueeProps {
  items?: SkillMarqueeItem[];
}

function Track({
  reverse = false,
  items,
}: {
  reverse?: boolean;
  items: SkillMarqueeItem[];
}) {
  return (
    <div className={`skills-marquee-track ${reverse ? "skills-marquee-track-reverse" : ""}`}>
      {[...items, ...items].map((item, index) => (
        <div
          key={`${item.name}-${index}`}
          className="skills-marquee-item flex flex-col gap-1 sm:flex-row sm:gap-0"
          title={item.name}
        >
          {item.icon ? (
            <>
              <img
                src={`https://cdn.simpleicons.org/${item.icon}`}
                alt={item.name}
                width={item.width ?? 96}
                height={item.height ?? 28}
                loading="lazy"
                draggable={false}
                className="h-6 w-auto"
              />
              <span className="max-w-[92px] truncate text-[10px] font-medium leading-none text-[var(--text-soft)] sm:hidden">
                {item.name}
              </span>
            </>
          ) : (
            <span className="text-xs font-semibold text-[var(--text-soft)]">{item.name}</span>
          )}
        </div>
      ))}
    </div>
  );
}

export default function SkillsMarquee({ items = defaultItems }: SkillsMarqueeProps) {
  return (
    <div className="skills-marquee-shell">
      <div className="skills-marquee-fade-left" aria-hidden="true" />
      <div className="skills-marquee-fade-right" aria-hidden="true" />

      <div className="skills-marquee-row">
        <Track items={items} />
      </div>

      <div className="mt-3 skills-marquee-row">
        <Track items={items} reverse />
      </div>
    </div>
  );
}
