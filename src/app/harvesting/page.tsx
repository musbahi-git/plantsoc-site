import Link from "next/link";
import { Badge, Card, StatCard } from "@/components/ui";
import { formatDate } from "@/lib/site-data";
import { getHarvestQueue, listPlantRecords } from "@/lib/plant-store";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Harvesting this week | PlantSoc & Community Allotment",
};

export default function HarvestingPage() {
  const harvestQueue = getHarvestQueue(listPlantRecords());

  return (
    <div className="w-full space-y-8 pb-10">
      <section className="space-y-5 pt-2">
        <Badge tone="amber">Derived view</Badge>
        <div className="max-w-3xl space-y-3">
          <h1 className="font-display text-4xl leading-none tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Harvesting this week
          </h1>
          <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            A date-driven list of the next crops ready for picking or trimming.
          </p>
        </div>
        <Link
          href="/plant-codex"
          className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-foreground transition hover:border-slate-300"
        >
          View plant codex
        </Link>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <StatCard label="Ready soon" value={harvestQueue.length.toString()} detail="Plants due inside the seven day harvest window." />
        <StatCard label="Earliest item" value={harvestQueue[0] ? formatDate(harvestQueue[0].estimatedHarvestTrimDate) : "None"} detail="The next crop expected to be ready." />
      </section>

      <Card className="p-5 sm:p-6">
        <div className="divide-y divide-slate-200">
          {harvestQueue.map((plant) => {
            const daysUntil = Math.round(
              (new Date(plant.estimatedHarvestTrimDate).getTime() - new Date().setHours(0, 0, 0, 0)) /
                (24 * 60 * 60 * 1000),
            );

            return (
              <div key={plant.slug} className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-medium text-foreground">{plant.name}</p>
                  <p className="mt-1 text-sm text-slate-600">{plant.location} · {plant.notes}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge tone={daysUntil <= 0 ? "emerald" : "amber"}>
                    {daysUntil <= 0 ? "Ready now" : `${daysUntil} days`}
                  </Badge>
                  <span className="text-sm text-slate-600">{formatDate(plant.estimatedHarvestTrimDate)}</span>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}