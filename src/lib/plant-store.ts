import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { plantCodex as seedPlantRecords, type PlantRecord } from "@/lib/site-data";

export type PlantInput = Omit<PlantRecord, "slug">;

export type HarvestQueueItem = PlantRecord & {
  daysUntilHarvest: number;
};

const plantStorePath = join(process.cwd(), "data", "plants.json");
const dayInMs = 24 * 60 * 60 * 1000;

function isPlantRecord(value: unknown): value is PlantRecord {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.slug === "string" &&
    typeof candidate.name === "string" &&
    typeof candidate.type === "string" &&
    typeof candidate.plantingSeason === "string" &&
    typeof candidate.plantingDate === "string" &&
    typeof candidate.sunlight === "string" &&
    typeof candidate.soilType === "string" &&
    Array.isArray(candidate.companionPlants) &&
    candidate.companionPlants.every((companion) => typeof companion === "string") &&
    typeof candidate.harvestTrimIntervalDays === "number" &&
    typeof candidate.estimatedHarvestTrimDate === "string" &&
    typeof candidate.notes === "string" &&
    typeof candidate.lifeCycle === "string" &&
    typeof candidate.location === "string"
  );
}

function readPlantStore() {
  try {
    const raw = readFileSync(plantStorePath, "utf8");
    const parsed = JSON.parse(raw) as unknown;

    if (!Array.isArray(parsed)) {
      return [...seedPlantRecords];
    }

    const records = parsed.filter(isPlantRecord);
    return records.length > 0 ? records : [...seedPlantRecords];
  } catch {
    return [...seedPlantRecords];
  }
}

function writePlantStore(records: PlantRecord[]) {
  mkdirSync(dirname(plantStorePath), { recursive: true });
  writeFileSync(plantStorePath, `${JSON.stringify(records, null, 2)}\n`, "utf8");
}

function slugifyPlantName(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function createUniqueSlug(name: string, records: PlantRecord[]) {
  const baseSlug = slugifyPlantName(name) || "plant";
  let candidate = baseSlug;
  let suffix = 2;

  while (records.some((record) => record.slug === candidate)) {
    candidate = `${baseSlug}-${suffix}`;
    suffix += 1;
  }

  return candidate;
}

function daysUntil(isoDate: string, referenceDate = new Date()) {
  const target = new Date(isoDate);
  const startOfDay = new Date(
    referenceDate.getFullYear(),
    referenceDate.getMonth(),
    referenceDate.getDate(),
  );

  return Math.round((target.getTime() - startOfDay.getTime()) / dayInMs);
}

export function listPlantRecords() {
  return [...readPlantStore()];
}

export function findPlantRecordBySlug(slug: string) {
  return readPlantStore().find((record) => record.slug === slug);
}

export function getHarvestQueue(records: PlantRecord[] = listPlantRecords()) {
  return [...records]
    .map((plant) => ({
      ...plant,
      daysUntilHarvest: daysUntil(plant.estimatedHarvestTrimDate),
    }))
    .filter((plant) => plant.daysUntilHarvest >= -2 && plant.daysUntilHarvest <= 7)
    .sort((left, right) => left.daysUntilHarvest - right.daysUntilHarvest);
}

export function getPlantCountByLocation(records: PlantRecord[] = listPlantRecords()) {
  return records.reduce<Record<string, number>>((counts, plant) => {
    counts[plant.location] = (counts[plant.location] ?? 0) + 1;
    return counts;
  }, {});
}

export function addPlantRecord(input: PlantInput) {
  const records = readPlantStore();
  const record: PlantRecord = {
    slug: createUniqueSlug(input.name, records),
    ...input,
  };

  records.unshift(record);
  writePlantStore(records);

  return record;
}

export function updatePlantRecord(slug: string, input: PlantInput) {
  const records = readPlantStore();
  const recordIndex = records.findIndex((record) => record.slug === slug);

  if (recordIndex === -1) {
    return null;
  }

  const nextRecord: PlantRecord = {
    slug: records[recordIndex].slug,
    ...input,
  };

  records[recordIndex] = nextRecord;
  writePlantStore(records);

  return nextRecord;
}

export function deletePlantRecord(slug: string) {
  const records = readPlantStore();
  const nextRecords = records.filter((record) => record.slug !== slug);

  if (nextRecords.length === records.length) {
    return false;
  }

  writePlantStore(nextRecords);
  return true;
}