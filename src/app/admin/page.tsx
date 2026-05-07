import Link from "next/link";
import { Badge, Card, EmptyState, SectionHeading, StatCard } from "@/components/ui";
import { AdminAccessForm } from "@/components/admin-access-form";
import { AdminLogoutButton } from "@/components/admin-logout-button";
import { PlantManagementForm } from "@/components/plant-management-form";
import { SuggestionInbox } from "@/components/suggestion-inbox";
import { isAdminUnlocked } from "@/lib/admin-auth";
import { listPlantRecords } from "@/lib/plant-store";
import { listSuggestions } from "@/lib/suggestion-store";
import { committeeRoles, formatDate, projectSections, quickTodos } from "@/lib/site-data";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin Workspace | PlantSoc & Community Allotment",
};

export default async function AdminPage() {
  const unlocked = await isAdminUnlocked();
  const plantRecords = listPlantRecords();
  const suggestions = unlocked ? listSuggestions() : [];

  return (
    <div className="w-full space-y-8 pb-10">
      <section className=" border p-6 shadow-[0_24px_80px_rgba(19,38,31,0.10)] sm:p-8">
        <div className="space-y-3">
          <Badge tone="slate">Private workspace</Badge>
          <h1 className="font-display text-4xl leading-none text-foreground sm:text-5xl">
            Admin workspace
          </h1>
          <p className="max-w-2xl text-base leading-7 text-emerald-950/70 sm:text-lg">
            The control surface for content review, task updates, and the records that should stay private while the public site stays readable.
          </p>
        </div>
      </section>

      {!unlocked ? (
        <Card className="p-6 sm:p-7">
          <SectionHeading
            eyebrow="Locked"
            title="Unlock the private workspace"
            description="Use the access key to view suggestions, review content, and manage the private coordination surface."
          />
          <div className="mt-6">
            <AdminAccessForm />
          </div>
        </Card>
      ) : (
        <>
          <div className="flex justify-end">
            <AdminLogoutButton />
          </div>

          <section className="grid gap-4 md:grid-cols-4">
            <StatCard label="Plants" value={plantRecords.length.toString()} detail="Manage codex records and future import updates." />
            <StatCard label="Tasks" value={quickTodos.length.toString()} detail="Small jobs that can be promoted into projects." />
            <StatCard label="Projects" value={projectSections.length.toString()} detail="Long-running workstreams and blocked items." />
            <StatCard label="Suggestions" value={suggestions.length.toString()} detail="Public ideas waiting to be reviewed." />
          </section>

          <Card id="plant-manager" className="p-6 sm:p-7">
            <SectionHeading
              eyebrow="Plant manager"
              title="Add a new plant record"
              description="Create a new codex entry here, then use the detail page to edit or remove it later."
            />
            <div className="mt-6">
              <PlantManagementForm mode="create" />
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {plantRecords.slice(0, 6).map((plant) => (
                <Link
                  key={plant.slug}
                  href={`/plant-codex/${plant.slug}`}
                  className="rounded-[28px] border border-emerald-950/10 bg-white/80 p-4 transition hover:bg-white"
                >
                  <p className="font-display text-2xl text-foreground">{plant.name}</p>
                  <p className="mt-1 text-sm text-emerald-950/60">
                    {plant.type} - {plant.location}
                  </p>
                  <p className="mt-3 text-xs uppercase tracking-[0.22em] text-emerald-950/45">
                    {formatDate(plant.estimatedHarvestTrimDate)}
                  </p>
                </Link>
              ))}
            </div>
          </Card>

          <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <Card className="p-6 sm:p-7">
              <SectionHeading
                eyebrow="Inbox"
                title="Suggestion review queue"
                description="Submissions from the public form flow here once the API route receives them."
              />

              <div className="mt-6 space-y-4">
                {suggestions.length === 0 ? (
                  <EmptyState
                    title="No suggestions yet"
                    description="Use the public form to create the first review item, then refresh this page to see it appear here."
                    action={<Link href="/suggestions" className="rounded-full bg-emerald-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-900">Open public form</Link>}
                  />
                ) : (
                  <SuggestionInbox suggestions={suggestions} />
                )}
              </div>
            </Card>

            <div className="space-y-6">
              <Card className="p-6 sm:p-7">
                <SectionHeading
                  eyebrow="Manage"
                  title="What to work on next"
                  description="A compact map of the major surfaces that will later receive editing and moderation tools."
                />
                <div className="mt-5 space-y-3 text-sm font-semibold">
                  <Link href="/admin#plant-manager" className="block rounded-2xl border border-emerald-950/10 bg-emerald-50/80 px-4 py-3 transition hover:bg-white">Plant manager</Link>
                  <Link href="/plant-codex" className="block rounded-2xl border border-emerald-950/10 bg-white/80 px-4 py-3 transition hover:bg-white">Plant codex records</Link>
                  <Link href="/quick-to-do-list" className="block rounded-2xl border border-emerald-950/10 bg-white/80 px-4 py-3 transition hover:bg-white">Quick todo list</Link>
                  <Link href="/projects-big-to-dos" className="block rounded-2xl border border-emerald-950/10 bg-white/80 px-4 py-3 transition hover:bg-white">Project board</Link>
                  <Link href="/committee" className="block rounded-2xl border border-emerald-950/10 bg-white/80 px-4 py-3 transition hover:bg-white">Committee content</Link>
                </div>
              </Card>

              <Card className="p-6 sm:p-7">
                <SectionHeading
                  eyebrow="Public split"
                  title="Keep editing surfaces separate"
                  description="This app has public read-only routes and a private admin area, which will later be tied to authentication and role checks."
                />
                <div className="mt-5 space-y-3 text-sm text-emerald-950/70">
                  <p className="rounded-2xl border border-emerald-950/10 bg-emerald-50/80 px-4 py-3">Public: dashboard, codex, harvesting, locations, suggestions, and safety.</p>
                  <p className="rounded-2xl border border-emerald-950/10 bg-white/80 px-4 py-3">Private: task board, project board, committee notes, and inbox review.</p>
                </div>
              </Card>
            </div>
          </section>

          <section className="grid gap-6 xl:grid-cols-2">
            <Card className="p-6 sm:p-7">
              <SectionHeading
                eyebrow="Committee"
                title="Roles currently seeded"
                description="These cards are enough to start the admin layout and can be replaced with real members later."
              />
              <div className="mt-5 space-y-3 text-sm text-emerald-950/70">
                {committeeRoles.slice(0, 3).map((role) => (
                  <div key={role.title} className="rounded-2xl border border-emerald-950/10 bg-white/80 px-4 py-3">
                    <p className="font-semibold text-foreground">{role.title}</p>
                    <p className="mt-1 text-emerald-950/60">{role.lead}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 sm:p-7">
              <SectionHeading
                eyebrow="Next implementation step"
                title="What still needs wiring"
                description="This first admin pass is visual. The next step is auth and persistence so the pages stop relying on module-level seed state."
              />
              <div className="mt-5 space-y-3 text-sm text-emerald-950/70">
                <p className="rounded-2xl border border-emerald-950/10 bg-white/80 px-4 py-3">Connect a database and seed import pipeline.</p>
                <p className="rounded-2xl border border-emerald-950/10 bg-white/80 px-4 py-3">Add authenticated create/edit flows for plants and tasks.</p>
                <p className="rounded-2xl border border-emerald-950/10 bg-white/80 px-4 py-3">Replace the temporary suggestion inbox with durable storage.</p>
              </div>
            </Card>
          </section>
        </>
      )}
    </div>
  );
}