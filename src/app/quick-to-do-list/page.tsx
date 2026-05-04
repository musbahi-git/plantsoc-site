import Link from "next/link";
import { Badge, Card, StatCard } from "@/components/ui";
import { formatDate, quickTodos } from "@/lib/site-data";
import { WorkSubmissionForm } from "@/components/work-submission-form";

export const metadata = {
  title: "Quick To Do List | PlantSoc & Community Allotment",
};

export default function QuickToDoListPage() {
  const openCount = quickTodos.filter((task) => task.status !== "Done").length;
  const doingCount = quickTodos.filter((task) => task.status === "Doing").length;

  return (
    <div className="w-full space-y-8 pb-10">
      <section className="space-y-5 pt-2">
        <Badge tone="emerald">Quick access</Badge>
        <div className="max-w-3xl space-y-3">
          <h1 className="font-display text-4xl leading-none tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Quick To Do List
          </h1>
          <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Small jobs, simple submission, and one readable page for fast site work.
          </p>
        </div>
        <nav className="flex flex-wrap gap-3 text-sm font-medium">
          <a href="#submit" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-foreground transition hover:border-slate-300">
            Submit a task
          </a>
          <a href="#tasks" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-foreground transition hover:border-slate-300">
            View current tasks
          </a>
          <Link href="/projects-big-to-dos" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-foreground transition hover:border-slate-300">
            Longer projects
          </Link>
        </nav>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <StatCard label="Open items" value={openCount.toString()} detail="Tasks that still need action or assignment." />
        <StatCard label="Doing now" value={doingCount.toString()} detail="Items currently underway on the site." />
        <StatCard label="Due this week" value={quickTodos.filter((task) => new Date(task.due).getTime() <= new Date(2026, 4, 5).getTime()).length.toString()} detail="Seed tasks that should move quickly." />
      </section>

      <Card id="submit" className="p-6 sm:p-7">
        <div className="max-w-3xl space-y-3">
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-slate-500">Submit</p>
          <h2 className="font-display text-2xl leading-tight text-foreground sm:text-[2rem]">
            Send a small job
          </h2>
          <p className="text-sm leading-6 text-slate-600">
            This goes to the admin inbox as a task-sized suggestion.
          </p>
        </div>
        <div className="mt-6">
          <WorkSubmissionForm
            category="Maintenance task"
            area="Quick To Do List"
            submitLabel="Submit task"
            prompt="Keep it short. A title and one detail note is enough."
          />
        </div>
      </Card>

      <Card id="tasks" className="p-5 sm:p-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-slate-500">Current tasks</p>
            <h2 className="font-display text-2xl leading-tight text-foreground sm:text-[2rem]">What needs doing next</h2>
          </div>
          <Badge tone="slate">{quickTodos.length} items</Badge>
        </div>

        <div className="mt-4 divide-y divide-slate-200">
          {quickTodos.map((task) => (
            <article key={task.id} className="flex flex-col gap-3 py-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="font-medium text-foreground">{task.title}</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">{task.detail}</p>
                <p className="mt-2 text-xs text-slate-500">{task.owner}</p>
              </div>
              <div className="flex items-center gap-3 sm:justify-end">
                <Badge tone={task.status === "Waiting" ? "amber" : task.status === "Done" ? "emerald" : "slate"}>
                  {task.status}
                </Badge>
                <span className="text-sm text-slate-600">{formatDate(task.due)}</span>
              </div>
            </article>
          ))}
        </div>
      </Card>
    </div>
  );
}