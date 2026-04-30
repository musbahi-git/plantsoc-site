import { NextResponse } from "next/server";
import { deletePlantRecord, findPlantRecordBySlug, updatePlantRecord, type PlantInput } from "@/lib/plant-store";
import { isAdminUnlocked } from "@/lib/admin-auth";

function parsePlantInput(payload: Record<string, unknown>): PlantInput | null {
  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const type = typeof payload.type === "string" ? payload.type.trim() : "";
  const plantingSeason = typeof payload.plantingSeason === "string" ? payload.plantingSeason.trim() : "";
  const plantingDate = typeof payload.plantingDate === "string" ? payload.plantingDate.trim() : "";
  const sunlight = typeof payload.sunlight === "string" ? payload.sunlight.trim() : "";
  const soilType = typeof payload.soilType === "string" ? payload.soilType.trim() : "";
  const notes = typeof payload.notes === "string" ? payload.notes.trim() : "";
  const lifeCycle = typeof payload.lifeCycle === "string" ? payload.lifeCycle.trim() : "";
  const location = typeof payload.location === "string" ? payload.location.trim() : "";
  const estimatedHarvestTrimDate = typeof payload.estimatedHarvestTrimDate === "string" ? payload.estimatedHarvestTrimDate.trim() : "";

  const rawCompanions = payload.companionPlants;
  const companionPlants = Array.isArray(rawCompanions)
    ? rawCompanions.filter((entry): entry is string => typeof entry === "string").map((entry) => entry.trim()).filter(Boolean)
    : typeof rawCompanions === "string"
      ? rawCompanions.split(",").map((entry) => entry.trim()).filter(Boolean)
      : [];

  const harvestTrimIntervalDays = Number(payload.harvestTrimIntervalDays);

  if (
    !name ||
    !type ||
    !plantingSeason ||
    !plantingDate ||
    !sunlight ||
    !soilType ||
    !notes ||
    !lifeCycle ||
    !location ||
    !estimatedHarvestTrimDate ||
    !Number.isFinite(harvestTrimIntervalDays) ||
    harvestTrimIntervalDays <= 0
  ) {
    return null;
  }

  return {
    name,
    type,
    plantingSeason,
    plantingDate,
    sunlight,
    soilType,
    companionPlants,
    harvestTrimIntervalDays,
    estimatedHarvestTrimDate,
    notes,
    lifeCycle,
    location,
  };
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  if (!(await isAdminUnlocked())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { slug } = await params;

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body must be JSON." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid plant payload." }, { status: 400 });
  }

  const existing = findPlantRecordBySlug(slug);

  if (!existing) {
    return NextResponse.json({ error: "Plant not found." }, { status: 404 });
  }

  const input = parsePlantInput(body as Record<string, unknown>);

  if (!input) {
    return NextResponse.json({ error: "Please complete all plant fields." }, { status: 400 });
  }

  const plant = updatePlantRecord(slug, input);
  return NextResponse.json({ plant });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  if (!(await isAdminUnlocked())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { slug } = await params;
  const deleted = deletePlantRecord(slug);

  if (!deleted) {
    return NextResponse.json({ error: "Plant not found." }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}