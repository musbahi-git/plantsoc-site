import Link from "next/link";
import { Badge, Card, SectionHeading } from "@/components/ui";
import { projectSections } from "@/lib/site-data";

export const metadata = {
  title: "Projects & Big To Dos | PlantSoc & Community Allotment",
};

export default function ProjectsPage() {
  return (
    <div className="w-full space-y-8 pb-10">
      <section className="rounded-[32px] border border-emerald-950/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.92)_0%,rgba(244,236,221,0.95)_100%)] p-6 shadow-[0_24px_80px_rgba(19,38,31,0.08)] sm:p-8">
        <div className="space-y-3">
          <Badge tone="amber">Longer running work</Badge>
          <h1 className="font-display text-4xl leading-none text-foreground sm:text-5xl">
            Projects & Big To Dos
          </h1>
          <p className="max-w-2xl text-base leading-7 text-emerald-950/70 sm:text-lg">
            A holding area for multi-step jobs, blocked items, and future ideas that need more space than the quick todo list.
          </p>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        {projectSections.map((section) => (
          <Card key={section.title} className="p-6 sm:p-7">
            <SectionHeading eyebrow="Board lane" title={section.title} />
            <div className="mt-5 space-y-3">
              {section.items.map((item) => (
                <div key={item.title} className="rounded-2xl border border-emerald-950/10 bg-white/80 px-4 py-3">
                  <p className="font-semibold text-foreground">{item.title}</p>
                  <p className="mt-1 text-sm leading-6 text-emerald-950/70">{item.note}</p>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </section>

      <Card className="p-6 sm:p-7">
        <SectionHeading
          eyebrow="Workflow"
          title="Keep large work split into subpages"
          description="The page mirrors the source Notion guidance and leaves room for more detailed planning when a project gets big."
        />
        <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold">
          <Link href="/quick-to-do-list" className="rounded-full border border-emerald-950/10 bg-white/80 px-4 py-2 text-emerald-950 transition hover:bg-white">Quick To Do List</Link>
          <Link href="/committee" className="rounded-full border border-emerald-950/10 bg-white/80 px-4 py-2 text-emerald-950 transition hover:bg-white">Committee</Link>
          <Link href="/health-safety" className="rounded-full border border-emerald-950/10 bg-white/80 px-4 py-2 text-emerald-950 transition hover:bg-white">Health & Safety</Link>
        </div>
      </Card>
    </div>
  );
}