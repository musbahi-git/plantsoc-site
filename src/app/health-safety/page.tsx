import Link from "next/link";
import { Badge, Card, SectionHeading } from "@/components/ui";
import { safetySections } from "@/lib/site-data";

export const metadata = {
  title: "Health & Safety | PlantSoc & Community Allotment",
};

export default function HealthSafetyPage() {
  return (
    <div className="w-full space-y-8 pb-10">
      <section className="-[32px] border border-emerald-950/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.92)_0%,rgba(244,236,221,0.95)_100%)] p-6 shadow-[0_24px_80px_rgba(19,38,31,0.08)] sm:p-8">
        <div className="space-y-3">
          <Badge tone="rose">Site guidance</Badge>
          <h1 className="font-display text-4xl leading-none text-foreground sm:text-5xl">Health & Safety</h1>
          <p className="max-w-2xl text-base leading-7 text-emerald-950/70 sm:text-lg">
            Clear safety notes for volunteers, committee members, and anyone working on the allotment site.
          </p>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          {safetySections.map((section) => (
            <Card key={section.title} className="p-6 sm:p-7">
              <SectionHeading eyebrow="Checklist" title={section.title} />
              <ul className="mt-5 space-y-3 text-sm leading-6 text-emerald-950/70">
                {section.bullets.map((bullet) => (
                  <li key={bullet} className="-2xl border border-emerald-950/10 bg-white/80 px-4 py-3">
                    {bullet}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        <div className="space-y-6">
          <Card className="p-6 sm:p-7">
            <SectionHeading
              eyebrow="Emergency info"
              title="Keep this page visible"
              description="This area is a placeholder for contact numbers, the first aid point, and any site-specific warnings."
            />
            <div className="mt-5 space-y-3 text-sm text-emerald-950/70">
              <p className="-2xl border border-emerald-950/10 bg-emerald-50/80 px-4 py-3">First aid kit: add the location here once the storage point is confirmed.</p>
              <p className="-2xl border border-emerald-950/10 bg-white/80 px-4 py-3">Emergency contact: connect the committee rota once admin auth is in place.</p>
              <p className="-2xl border border-emerald-950/10 bg-white/80 px-4 py-3">Incident reporting: log any problem as soon as it happens.</p>
            </div>
          </Card>

          <Card className="p-6 sm:p-7">
            <SectionHeading
              eyebrow="Quick access"
              title="Move to related pages"
              description="Safety sits beside the operational pages so volunteers can jump straight from guidance to the task board."
            />
            <div className="mt-5 space-y-3 text-sm font-medium">
              <Link href="/quick-to-do-list" className="block -2xl border border-emerald-950/10 bg-white/80 px-4 py-3 transition hover:bg-white">Quick To Do List</Link>
              <Link href="/projects-big-to-dos" className="block -2xl border border-emerald-950/10 bg-white/80 px-4 py-3 transition hover:bg-white">Projects & Big To Dos</Link>
              <Link href="/committee" className="block -2xl border border-emerald-950/10 bg-white/80 px-4 py-3 transition hover:bg-white">PlantSoc Committee</Link>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}