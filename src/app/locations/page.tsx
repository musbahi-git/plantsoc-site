import Link from "next/link";
import { Badge, Card, StatCard } from "@/components/ui";
import { locationRecords } from "@/lib/site-data";
import { listPlantRecords } from "@/lib/plant-store";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Locations | PlantSoc & Community Allotment",
};

export default function LocationsPage() {
  const plantRecords = listPlantRecords();
  const countsByLocation = Object.fromEntries(
    locationRecords.map((location) => [
      location.name,
      plantRecords.filter((plant) => plant.location === location.name).length,
    ]),
  );

  return (
    <div className="w-full space-y-8 pb-10">
      <section className="space-y-5 pt-2">
        <Badge tone="emerald">Grouped view</Badge>
        <div className="max-w-3xl space-y-3">
          <h1 className="font-display text-4xl leading-none tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Locations
          </h1>
          <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            A concise overview of where each crop is growing and how full each space is.
          </p>
        </div>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-foreground transition hover:border-slate-300"
        >
          Back to dashboard
        </Link>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <StatCard label="Locations tracked" value={locationRecords.length.toString()} detail="Beds, planters, and growing spaces in the allotment." />
        <StatCard label="Filled spots" value={plantRecords.length.toString()} detail="Every seeded crop record mapped to a location." />
      </section>

      <Card className="p-5 sm:p-6">
        <div className="divide-y divide-slate-200">
          {locationRecords.map((location) => (
            <div key={location.slug} className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-medium text-foreground">{location.name}</p>
                <p className="mt-1 text-sm text-slate-600">
                  {location.zone} · {location.summary}
                </p>
                <p className="mt-2 text-xs text-slate-500">{location.crops.join(", ")}</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge tone={location.status === "Active" ? "emerald" : "amber"}>{location.status}</Badge>
                <span className="text-sm text-slate-600">{location.capacity}</span>
              </div>
              <p className="text-xs text-slate-500 sm:ml-4">{countsByLocation[location.name]} plant records</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}