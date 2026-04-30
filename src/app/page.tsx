import Link from "next/link";
import { Badge, Card, SectionHeading, StatCard } from "@/components/ui";
import { formatDate, quickTodos } from "@/lib/site-data";
import { getHarvestQueue, listPlantRecords } from "@/lib/plant-store";

export const dynamic = "force-dynamic";

export default function Home() {
  const plantRecords = listPlantRecords();
  const harvestQueue = getHarvestQueue(plantRecords);
  const openTasks = quickTodos.filter((task) => task.status !== "Done").length;
  const featuredPlants = plantRecords.slice(0, 3);

  return (
    <div className="w-full space-y-8 pb-10">
      <section className="space-y-5 pt-2">
        <Badge tone="emerald">Community allotment dashboard</Badge>
        <div className="max-w-3xl space-y-3">
          <h1 className="font-display text-4xl leading-none tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            PlantSoc and Community Allotment
          </h1>
          <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            A cleaner overview of the live plant codex, upcoming harvests, and the work that still needs attention.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/plant-codex"
            className="inline-flex items-center justify-center rounded-full bg-emerald-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-emerald-900"
          >
            Open plant codex
          </Link>
          <Link
            href="/admin#plant-manager"
            className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-foreground transition hover:border-slate-300"
          >
            Add new plant
          </Link>
          <Link
            href="/suggestions"
            className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-foreground transition hover:border-slate-300"
          >
            Send a suggestion
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        <StatCard label="Plant records" value={plantRecords.length.toString()} detail="Live records available across the site." />
        <StatCard label="Harvesting soon" value={harvestQueue.length.toString()} detail="Entries due in the next week." />
        <StatCard label="Open tasks" value={openTasks.toString()} detail="Quick jobs still waiting for action." />
        <StatCard label="Locations" value="5" detail="Growing areas currently in use." />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <Card className="p-6 sm:p-7">
            <SectionHeading
              eyebrow="Harvesting this week"
              title="Ready next"
              description="The queue is derived from harvest dates, so the list stays in sync automatically."
              action={
                <Link
                  href="/harvesting"
                  className="text-sm font-medium text-foreground underline decoration-slate-300 underline-offset-4"
                >
                  See full list
                </Link>
              }
            />
            <div className="mt-5 space-y-3">
              {harvestQueue.slice(0, 3).map((plant) => (
                <div
                  key={plant.slug}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3"
                >
                  <div>
                    <p className="font-medium text-foreground">{plant.name}</p>
                    <p className="text-sm text-slate-600">{plant.location}</p>
                  </div>
                  <p className="text-sm text-slate-600">{formatDate(plant.estimatedHarvestTrimDate)}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 sm:p-7">
            <SectionHeading
              eyebrow="Main routes"
              title="Keep the site focused"
              description="The dashboard stays cleaner when only the essential surfaces are called out here."
            />
            <div className="mt-5 grid gap-2 sm:grid-cols-2 text-sm font-medium">
              <Link href="/locations" className="rounded-2xl border border-slate-200 bg-white px-4 py-3 transition hover:border-slate-300">
                Locations
              </Link>
              <Link href="/suggestions" className="rounded-2xl border border-slate-200 bg-white px-4 py-3 transition hover:border-slate-300">
                Suggestions
              </Link>
              <Link href="/admin" className="rounded-2xl border border-slate-200 bg-white px-4 py-3 transition hover:border-slate-300">
                Admin workspace
              </Link>
              <Link href="/health-safety" className="rounded-2xl border border-slate-200 bg-white px-4 py-3 transition hover:border-slate-300">
                Health & Safety
              </Link>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
