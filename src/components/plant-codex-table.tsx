"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Badge, Card, EmptyState } from "@/components/ui";
import type { PlantRecord } from "@/lib/site-data";
import { formatDate } from "@/lib/site-data";

type PlantCodexTableProps = {
  plants: PlantRecord[];
};

export function PlantCodexTable({ plants }: PlantCodexTableProps) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All types");
  const [locationFilter, setLocationFilter] = useState("All locations");

  const typeOptions = useMemo(
    () => ["All types", ...new Set(plants.map((plant) => plant.type))],
    [plants],
  );
  const locationOptions = useMemo(
    () => ["All locations", ...new Set(plants.map((plant) => plant.location))],
    [plants],
  );

  const filteredPlants = useMemo(() => {
    const query = search.trim().toLowerCase();

    return plants.filter((plant) => {
      const matchesType = typeFilter === "All types" || plant.type === typeFilter;
      const matchesLocation =
        locationFilter === "All locations" || plant.location === locationFilter;
      const searchableText = [
        plant.name,
        plant.type,
        plant.plantingSeason,
        plant.plantingDate,
        plant.sunlight,
        plant.soilType,
        plant.notes,
        plant.lifeCycle,
        plant.location,
        plant.companionPlants.join(" "),
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch = query.length === 0 || searchableText.includes(query);

      return matchesType && matchesLocation && matchesSearch;
    });
  }, [plants, locationFilter, search, typeFilter]);

  return (
    <div className="space-y-6">
      <Card className="p-4 sm:p-5">
        <div className="grid gap-3 lg:grid-cols-[1.4fr_0.8fr_0.8fr]">
          <label className="space-y-2 text-sm font-medium text-emerald-950/70">
            <span>Search plants</span>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by plant, companion, note, or location"
              className=" border border-emerald-950/10 bg-white px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-emerald-950/35 focus:border-emerald-950/25 focus:ring-2 focus:ring-emerald-950/10"
            />
          </label>

          <label className="space-y-2 text-sm font-medium text-emerald-950/70">
            <span>Type</span>
            <select
              value={typeFilter}
              onChange={(event) => setTypeFilter(event.target.value)}
              className=" border border-emerald-950/10 bg-white px-4 py-3 text-sm text-foreground outline-none transition focus:border-emerald-950/25 focus:ring-2 focus:ring-emerald-950/10"
            >
              {typeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-2 text-sm font-medium text-emerald-950/70">
            <span>Location</span>
            <select
              value={locationFilter}
              onChange={(event) => setLocationFilter(event.target.value)}
              className="border border-emerald-950/10 bg-white px-4 py-3 text-sm text-foreground outline-none transition focus:border-emerald-950/25 focus:ring-2 focus:ring-emerald-950/10"
            >
              {locationOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-emerald-950/60">
          <p>
            Showing <span className="font-semibold text-foreground">{filteredPlants.length}</span> of {plants.length} plant records.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setTypeFilter("All types");
              setLocationFilter("All locations");
            }}
            className=" border border-emerald-950/10 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-100"
          >
            Clear filters
          </button>
        </div>
      </Card>

      {filteredPlants.length === 0 ? (
        <EmptyState
          title="No plants match these filters"
          description="Broaden the search or clear the filters to see every seeded crop again."
        />
      ) : (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-[760px] w-full border-collapse text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-[0.18em] text-slate-500">
                <tr>
                  <th className="px-4 py-4 font-medium">Plant</th>
                  <th className="px-4 py-4 font-medium">Type</th>
                  <th className="px-4 py-4 font-medium">Harvest</th>
                  <th className="px-4 py-4 font-medium">Location</th>
                </tr>
              </thead>
              <tbody>
                {filteredPlants.map((plant) => (
                  <tr key={plant.slug} className="border-t border-slate-200 bg-white transition hover:bg-slate-50">
                    <td className="px-4 py-4 align-top">
                      <Link
                        href={`/plant-codex/${plant.slug}`}
                        className="font-medium text-foreground underline decoration-slate-300 underline-offset-4"
                      >
                        {plant.name}
                      </Link>
                      <p className="mt-1 max-w-[320px] text-xs leading-5 text-slate-500">
                        {plant.notes}
                      </p>
                    </td>
                    <td className="px-4 py-4 align-top">
                      <Badge tone="slate">{plant.type}</Badge>
                      <p className="mt-2 text-xs text-slate-500">{plant.plantingSeason}</p>
                    </td>
                    <td className="px-4 py-4 align-top text-slate-600">
                      <p className="font-medium text-foreground">{formatDate(plant.estimatedHarvestTrimDate)}</p>
                      <p className="mt-1 text-xs text-slate-500">{plant.harvestTrimIntervalDays} day cycle</p>
                    </td>
                    <td className="px-4 py-4 align-top text-slate-600">
                      <p className="font-medium text-foreground">{plant.location}</p>
                      <p className="mt-1 text-xs text-slate-500">{plant.sunlight}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}