import Link from "next/link";
import { notFound } from "next/navigation";
import { isAdminUnlocked } from "@/lib/admin-auth";
import { PlantManagementForm } from "@/components/plant-management-form";
import { Badge, Card, SectionHeading } from "@/components/ui";
import { formatDate } from "@/lib/site-data";
import { findPlantRecordBySlug } from "@/lib/plant-store";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const plant = findPlantRecordBySlug(slug);

  if (!plant) {
    return {
      title: "Plant not found | PlantSoc & Community Allotment",
    };
  }

  return {
    title: `${plant.name} | Plant Codex`,
    description: plant.notes,
  };
}

export default async function PlantDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [plant, adminUnlocked] = await Promise.all([
    findPlantRecordBySlug(slug),
    isAdminUnlocked(),
  ]);

  if (!plant) {
    notFound();
  }

  return (
    <div className="w-full space-y-8 pb-10">
      <section className="rounded-[32px] border border-emerald-950/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.94)_0%,rgba(244,235,220,0.96)_100%)] p-6 shadow-[0_24px_80px_rgba(19,38,31,0.08)] sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-3">
            <Badge tone="emerald">Plant detail</Badge>
            <h1 className="font-display text-4xl leading-none text-foreground sm:text-5xl">
              {plant.name}
            </h1>
            <p className="max-w-2xl text-base leading-7 text-emerald-950/70">{plant.notes}</p>
          </div>
          <Link
            href="/plant-codex"
            className="inline-flex items-center justify-center rounded-full border border-emerald-950/10 bg-white/85 px-5 py-3 text-sm font-semibold text-emerald-950 transition hover:bg-white"
          >
            Back to codex
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card className="p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-950/45">Type</p>
          <p className="mt-2 font-display text-2xl text-foreground">{plant.type}</p>
        </Card>
        <Card className="p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-950/45">Planting season</p>
          <p className="mt-2 font-display text-2xl text-foreground">{plant.plantingSeason}</p>
        </Card>
        <Card className="p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-950/45">Harvest date</p>
          <p className="mt-2 font-display text-2xl text-foreground">{formatDate(plant.estimatedHarvestTrimDate)}</p>
        </Card>
        <Card className="p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-950/45">Location</p>
          <p className="mt-2 font-display text-2xl text-foreground">{plant.location}</p>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="p-6 sm:p-7">
          <SectionHeading
            eyebrow="Record summary"
            title="All of the tracked properties"
            description="This page mirrors the Notion entry shape so the data can later connect to edit forms and database persistence."
          />

          <dl className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-emerald-950/10 bg-white/80 p-4">
              <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-950/45">Planting date</dt>
              <dd className="mt-2 text-base font-medium text-foreground">{formatDate(plant.plantingDate)}</dd>
            </div>
            <div className="rounded-2xl border border-emerald-950/10 bg-white/80 p-4">
              <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-950/45">Sunlight</dt>
              <dd className="mt-2 text-base font-medium text-foreground">{plant.sunlight}</dd>
            </div>
            <div className="rounded-2xl border border-emerald-950/10 bg-white/80 p-4">
              <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-950/45">Soil type</dt>
              <dd className="mt-2 text-base font-medium text-foreground">{plant.soilType}</dd>
            </div>
            <div className="rounded-2xl border border-emerald-950/10 bg-white/80 p-4">
              <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-950/45">Life cycle</dt>
              <dd className="mt-2 text-base font-medium text-foreground">{plant.lifeCycle}</dd>
            </div>
            <div className="rounded-2xl border border-emerald-950/10 bg-white/80 p-4">
              <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-950/45">Harvest interval</dt>
              <dd className="mt-2 text-base font-medium text-foreground">{plant.harvestTrimIntervalDays} days</dd>
            </div>
            <div className="rounded-2xl border border-emerald-950/10 bg-white/80 p-4">
              <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-950/45">Placement</dt>
              <dd className="mt-2 text-base font-medium text-foreground">{plant.location}</dd>
            </div>
          </dl>
        </Card>

        <Card className="p-6 sm:p-7">
          <SectionHeading
            eyebrow="Companions"
            title="Plants that work well with it"
            description="Companion plants are tracked in the codex so coordinators can plan rotations and mixed beds."
          />
          <div className="mt-6 flex flex-wrap gap-2">
            {plant.companionPlants.map((companion) => (
              <span key={companion} className="rounded-full border border-emerald-950/10 bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-950/75">
                {companion}
              </span>
            ))}
          </div>
          <div className="mt-8 rounded-3xl border border-emerald-950/10 bg-amber-50/70 p-5 text-sm leading-6 text-emerald-950/70">
            This detail route is generated from the same source record as the table view, so it can later support inline editing without changing the route structure.
          </div>
        </Card>
      </section>

      {adminUnlocked ? (
        <Card className="p-6 sm:p-7">
          <SectionHeading
            eyebrow="Admin controls"
            title="Edit this plant"
            description="The private workspace can update the record in place or remove it from the codex entirely."
          />
          <div className="mt-6">
            <PlantManagementForm mode="edit" plant={plant} />
          </div>
        </Card>
      ) : null}
    </div>
  );
}