import Link from "next/link";
import { Badge, Card, SectionHeading } from "@/components/ui";
import { committeeRoles } from "@/lib/site-data";

export const metadata = {
  title: "PlantSoc Committee | PlantSoc & Community Allotment",
};

export default function CommitteePage() {
  return (
    <div className="w-full space-y-8 pb-10">
      <section className="space-y-5 pt-2">
        <Badge tone="emerald">Internal planning</Badge>
        <div className="max-w-3xl space-y-3">
          <h1 className="font-display text-4xl leading-none tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            PlantSoc Committee
          </h1>
          <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            The people and responsibilities that keep PlantSoc & the allotment running.
          </p>
        </div>
      </section>

      <Card className="p-5 sm:p-6">
        <SectionHeading
          eyebrow="Roles"
          title="Current committee setup"
          description="A single, calmer list keeps the structure readable without turning it into another wall of cards."
        />
        <div className="mt-5 divide-y divide-slate-200">
          {committeeRoles.map((role) => (
            <div key={role.title} className="flex flex-col gap-2 py-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="font-medium text-foreground">{role.title}</p>
                <p className="mt-1 text-sm text-slate-600">{role.note}</p>
              </div>
              <div className="text-sm text-slate-600 sm:text-right">
                <p>{role.lead}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">{role.cadence}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-5 sm:p-6">
        <SectionHeading
          eyebrow="Connections"
          title="Keep committee work close to the main board"
          description="Use the primary dashboard and task pages before adding more moving pieces."
        />
        <div className="mt-5 flex flex-wrap gap-3 text-sm font-medium">
          <Link href="/projects-big-to-dos" className="-full border border-slate-200 bg-white px-4 py-2 text-foreground transition hover:border-slate-300">Projects</Link>
          <Link href="/quick-to-do-list" className="-full border border-slate-200 bg-white px-4 py-2 text-foreground transition hover:border-slate-300">Quick To Do List</Link>
          <Link href="/admin" className="-full border border-slate-200 bg-white px-4 py-2 text-foreground transition hover:border-slate-300">Admin workspace</Link>
        </div>
      </Card>
    </div>
  );
}