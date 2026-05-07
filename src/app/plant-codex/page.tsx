import Link from "next/link";
import { PlantCodexTable } from "@/components/plant-codex-table";
import { Badge, Card, StatCard } from "@/components/ui";
import { getHarvestQueue, listPlantRecords } from "@/lib/plant-store";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Plant Codex | PlantSoc & Community Allotment",
};

export default function PlantCodexPage() {
  const plantRecords = listPlantRecords();
  const harvestQueue = getHarvestQueue(plantRecords);
  const uniqueLocations = new Set(plantRecords.map((plant) => plant.location)).size;

  return (
    <div className="w-full space-y-8 pb-10">
      <section className="space-y-5 pt-2">
        <Badge tone="emerald">Database view</Badge>
        <div className="max-w-3xl space-y-3">
          <h1 className="font-display text-4xl leading-none tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Plant Codex
          </h1>
          <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Search and filter the live plant records. The detail page carries the full record.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center  border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-foreground transition hover:border-slate-300"
          >
            Back to dashboard
          </Link>
          <Link
            href="/admin#plant-manager"
            className="inline-flex items-center justify-center  bg-emerald-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-emerald-900"
          >
            Add new plant
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <StatCard label="Plant records" value={plantRecords.length.toString()} detail="Structured records ready for search and detail views." />
        <StatCard label="Harvest window" value={harvestQueue.length.toString()} detail="Plants expected in the next seven days." />
        <StatCard label="Locations used" value={uniqueLocations.toString()} detail="Beds and planting areas mapped to each crop." />
      </section>

      <Card className="p-5 sm:p-6">
        <PlantCodexTable plants={plantRecords} />
      </Card>
    </div>
  );
}