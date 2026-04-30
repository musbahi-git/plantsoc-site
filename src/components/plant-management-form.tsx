"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { locationRecords } from "@/lib/site-data";
import type { PlantRecord } from "@/lib/site-data";

type PlantManagementFormProps = {
  mode: "create" | "edit";
  plant?: PlantRecord;
};

function parseCompanionPlants(value: FormDataEntryValue | null) {
  return String(value ?? "")
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function getString(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function getNumber(formData: FormData, key: string) {
  const value = Number.parseInt(getString(formData, key), 10);
  return Number.isFinite(value) ? value : NaN;
}

export function PlantManagementForm({ mode, plant }: PlantManagementFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const plantingSeasonValue = plant?.plantingSeason ?? "Spring";
  const sunlightValue = plant?.sunlight ?? "Full sun";
  const soilTypeValue = plant?.soilType ?? "Loamy";
  const companionPlantsValue = plant?.companionPlants.join(", ") ?? "";
  const lifeCycleValue = plant?.lifeCycle ?? "Annual";
  const harvestTrimIntervalDaysValue = plant?.harvestTrimIntervalDays ?? 7;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: getString(formData, "name"),
      type: getString(formData, "type"),
      plantingSeason: getString(formData, "plantingSeason"),
      plantingDate: getString(formData, "plantingDate"),
      sunlight: getString(formData, "sunlight"),
      soilType: getString(formData, "soilType"),
      companionPlants: parseCompanionPlants(formData.get("companionPlants")),
      harvestTrimIntervalDays: getNumber(formData, "harvestTrimIntervalDays"),
      estimatedHarvestTrimDate: getString(formData, "estimatedHarvestTrimDate"),
      notes: getString(formData, "notes"),
      lifeCycle: getString(formData, "lifeCycle"),
      location: getString(formData, "location"),
    };

    if (!payload.name || !payload.type || !payload.plantingDate || !payload.estimatedHarvestTrimDate) {
      setError("Please complete the required plant fields.");
      setIsSubmitting(false);
      return;
    }

    if (!Number.isFinite(payload.harvestTrimIntervalDays)) {
      setError("Please enter a valid harvest interval.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(
        mode === "create" ? "/api/plants" : `/api/plants/${plant?.slug}`,
        {
          method: mode === "create" ? "POST" : "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      if (!response.ok) {
        const result = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(result?.error ?? "Could not save the plant record.");
      }

      const result = (await response.json()) as { plant?: PlantRecord };

      if (mode === "create") {
        router.push(`/plant-codex/${result.plant?.slug ?? plant?.slug}`);
      } else {
        router.refresh();
      }
    } catch (submissionError) {
      setError(
        submissionError instanceof Error ? submissionError.message : "Could not save the plant record.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete() {
    if (!plant) {
      return;
    }

    const confirmed = window.confirm(`Delete ${plant.name}? This cannot be undone.`);

    if (!confirmed) {
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch(`/api/plants/${plant.slug}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const result = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(result?.error ?? "Could not delete the plant record.");
      }

      router.push("/plant-codex");
    } catch (submissionError) {
      setError(
        submissionError instanceof Error ? submissionError.message : "Could not delete the plant record.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-1.5 text-sm font-medium text-slate-600">
          <span>Plant name</span>
          <input
            name="name"
            defaultValue={plant?.name ?? ""}
            required
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-slate-400 focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
            placeholder="Tomato"
          />
        </label>

        <label className="space-y-1.5 text-sm font-medium text-slate-600">
          <span>Type</span>
          <input
            name="type"
            defaultValue={plant?.type ?? ""}
            required
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-slate-400 focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
            placeholder="Vegetable"
          />
        </label>

        <label className="space-y-1.5 text-sm font-medium text-slate-600">
          <span>Planting date</span>
          <input
            name="plantingDate"
            type="date"
            defaultValue={plant?.plantingDate ?? ""}
            required
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-foreground outline-none transition focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
          />
        </label>

        <label className="space-y-1.5 text-sm font-medium text-slate-600">
          <span>Harvest date</span>
          <input
            name="estimatedHarvestTrimDate"
            type="date"
            defaultValue={plant?.estimatedHarvestTrimDate ?? ""}
            required
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-foreground outline-none transition focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
          />
        </label>

        <label className="space-y-1.5 text-sm font-medium text-slate-600 sm:col-span-2">
          <span>Notes</span>
          <textarea
            name="notes"
            defaultValue={plant?.notes ?? ""}
            rows={4}
            required
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-slate-400 focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
            placeholder="Short guidance for the site team"
          />
        </label>

        <label className="space-y-1.5 text-sm font-medium text-slate-600 sm:col-span-2">
          <span>Location</span>
          <select
            name="location"
            defaultValue={plant?.location ?? locationRecords[0]?.name}
            required
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-foreground outline-none transition focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
          >
            {locationRecords.map((location) => (
              <option key={location.slug} value={location.name}>
                {location.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <details className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
        <summary className="cursor-pointer list-none text-sm font-medium text-foreground">
          More details
        </summary>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="space-y-1.5 text-sm font-medium text-slate-600">
            <span>Planting season</span>
            <input
              name="plantingSeason"
              defaultValue={plantingSeasonValue}
              required
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-foreground outline-none transition focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
            />
          </label>

          <label className="space-y-1.5 text-sm font-medium text-slate-600">
            <span>Harvest interval (days)</span>
            <input
              name="harvestTrimIntervalDays"
              type="number"
              min="1"
              step="1"
              defaultValue={harvestTrimIntervalDaysValue}
              required
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-foreground outline-none transition focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
            />
          </label>

          <label className="space-y-1.5 text-sm font-medium text-slate-600">
            <span>Sunlight</span>
            <input
              name="sunlight"
              defaultValue={sunlightValue}
              required
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-slate-400 focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
              placeholder="Full sun"
            />
          </label>

          <label className="space-y-1.5 text-sm font-medium text-slate-600">
            <span>Soil type</span>
            <input
              name="soilType"
              defaultValue={soilTypeValue}
              required
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-slate-400 focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
              placeholder="Loamy"
            />
          </label>

          <label className="space-y-1.5 text-sm font-medium text-slate-600">
            <span>Companion plants</span>
            <input
              name="companionPlants"
              defaultValue={companionPlantsValue}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-slate-400 focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
              placeholder="Basil, Marigold"
            />
          </label>

          <label className="space-y-1.5 text-sm font-medium text-slate-600">
            <span>Life cycle</span>
            <input
              name="lifeCycle"
              defaultValue={lifeCycleValue}
              required
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-slate-400 focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
              placeholder="Annual"
            />
          </label>
        </div>
      </details>

      <div className="flex flex-col gap-3 border-t border-slate-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-500">
          {mode === "create"
            ? "Core fields are visible; the rest stay tucked away unless you need them."
            : "Update the record or remove it from the codex."}
        </p>
        <div className="flex flex-wrap gap-3">
          {mode === "edit" ? (
            <button
              type="button"
              onClick={handleDelete}
              disabled={isSubmitting}
              className="rounded-full border border-rose-200 bg-white px-5 py-3 text-sm font-medium text-rose-700 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-70"
            >
              Delete
            </button>
          ) : null}
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-full bg-emerald-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Saving..." : mode === "create" ? "Create plant" : "Save changes"}
          </button>
        </div>
      </div>

      {error ? (
        <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
          {error}
        </p>
      ) : null}
    </form>
  );
}