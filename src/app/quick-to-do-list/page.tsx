import Link from "next/link";
import { Badge, Card, SectionHeading, StatCard } from "@/components/ui";
import { formatDate, quickTodos } from "@/lib/site-data";

export const metadata = {
  title: "Quick To Do List | PlantSoc & Community Allotment",
};

export default function QuickToDoListPage() {
  const openCount = quickTodos.filter((task) => task.status !== "Done").length;

  return (
    <div className="w-full space-y-8 pb-10">
      <section className="rounded-[32px] border border-emerald-950/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.92)_0%,rgba(244,236,221,0.95)_100%)] p-6 shadow-[0_24px_80px_rgba(19,38,31,0.08)] sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-3">
            <Badge tone="emerald">Small jobs</Badge>
            <h1 className="font-display text-4xl leading-none text-foreground sm:text-5xl">Quick To Do List</h1>
            <p className="max-w-2xl text-base leading-7 text-emerald-950/70 sm:text-lg">
              The short-form work queue for planting, repairs, and prep tasks that should stay visible at a glance.
            </p>
          </div>
          <Link href="/projects-big-to-dos" className="inline-flex items-center justify-center rounded-full border border-emerald-950/10 bg-white/85 px-5 py-3 text-sm font-semibold text-emerald-950 transition hover:bg-white">Longer projects</Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <StatCard label="Open items" value={openCount.toString()} detail="Tasks that still need action or assignment." />
        <StatCard label="Doing now" value={quickTodos.filter((task) => task.status === "Doing").length.toString()} detail="Items currently underway on the site." />
        <StatCard label="Due this week" value={quickTodos.filter((task) => new Date(task.due).getTime() <= new Date(2026, 4, 5).getTime()).length.toString()} detail="Seed tasks that should move quickly." />
      </section>

      <Card className="p-6 sm:p-7">
        <SectionHeading
          eyebrow="Task board"
          title="What needs doing next"
          description="These items stay short and specific so they can be completed without opening a larger project page."
        />

        <div className="mt-6 grid gap-4 xl:grid-cols-2">
          {quickTodos.map((task) => (
            <div key={task.id} className="rounded-[28px] border border-emerald-950/10 bg-white/80 p-5 shadow-[0_16px_44px_rgba(18,34,28,0.05)]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-display text-2xl text-foreground">{task.title}</p>
                  <p className="text-sm text-emerald-950/60">{task.owner}</p>
                </div>
                <Badge tone={task.status === "Waiting" ? "amber" : task.status === "Done" ? "emerald" : "slate"}>{task.status}</Badge>
              </div>
              <p className="mt-4 text-sm leading-6 text-emerald-950/70">{task.detail}</p>
              <div className="mt-4 flex items-center justify-between gap-4 rounded-2xl border border-emerald-950/10 bg-emerald-50/70 px-4 py-3 text-sm text-emerald-950/70">
                <span>Due</span>
                <span className="font-medium text-foreground">{formatDate(task.due)}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}