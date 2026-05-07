import Link from "next/link";
import { Badge, Card, StatCard } from "@/components/ui";
import { projectSections } from "@/lib/site-data";
import { WorkSubmissionForm } from "@/components/work-submission-form";

export const metadata = {
  title: "Projects & Big To Dos | PlantSoc & Community Allotment",
};

export default function ProjectsPage() {
  const projectItemCount = projectSections.reduce((count, section) => count + section.items.length, 0);

  return (
    <div className="w-full space-y-8 pb-10">
      <section className="space-y-5 pt-2">
        <Badge tone="amber">Single page planning</Badge>
        <div className="max-w-3xl space-y-3">
          <h1 className="font-display text-4xl leading-none tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Projects & Big To Dos
          </h1>
          <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Bigger work, simpler submission, and a single page that is easier to scan on mobile.
          </p>
        </div>
        <nav className="flex flex-wrap gap-3 text-sm font-medium">
          <a href="#submit" className=" border border-slate-200 bg-white px-4 py-2 text-foreground transition hover:border-slate-300">
            Submit a project
          </a>
          <a href="#lanes" className=" border border-slate-200 bg-white px-4 py-2 text-foreground transition hover:border-slate-300">
            View project lanes
          </a>
          <Link href="/quick-to-do-list" className=" border border-slate-200 bg-white px-4 py-2 text-foreground transition hover:border-slate-300">
            Quick To Do List
          </Link>
        </nav>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <StatCard label="Project lanes" value={projectSections.length.toString()} detail="Grouped areas for bigger work." />
        <StatCard label="Ideas captured" value={projectItemCount.toString()} detail="Seed items currently in the board." />
      </section>

      <Card id="submit" className="p-6 sm:p-7">
        <div className="max-w-3xl space-y-3">
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-slate-500">Submit</p>
          <h2 className="font-display text-2xl leading-tight text-foreground sm:text-[2rem]">
            Share a project idea
          </h2>
          <p className="text-sm leading-6 text-slate-600">
            Use this for bigger jobs that should be reviewed before they become a full project lane.
          </p>
        </div>
        <div className="mt-6">
          <WorkSubmissionForm
            category="Project idea"
            area="Projects & Big To Dos"
            submitLabel="Submit project"
            prompt="A title and a short description is enough to start the review."
          />
        </div>
      </Card>

      <Card id="lanes" className="p-5 sm:p-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-slate-500">Project lanes</p>
            <h2 className="font-display text-2xl leading-tight text-foreground sm:text-[2rem]">What is in the board</h2>
          </div>
          <Badge tone="slate">{projectSections.length} lanes</Badge>
        </div>

        <div className="mt-4 space-y-4">
          {projectSections.map((section, index) => (
            <details
              key={section.title}
              className=" border border-slate-200 bg-white px-4 py-3"
              open={index === 0}
            >
              <summary className="cursor-pointer list-none">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-medium text-foreground">{section.title}</p>
                    <p className="mt-1 text-sm text-slate-600">{section.items.length} items</p>
                  </div>
                  <Badge tone={index === 0 ? "emerald" : "slate"}>{index === 0 ? "Open" : "Collapsed"}</Badge>
                </div>
              </summary>
              <ul className="mt-4 space-y-3 border-t border-slate-200 pt-4">
                {section.items.map((item) => (
                  <li key={item.title} className=" border border-slate-200 bg-slate-50 px-4 py-3">
                    <p className="font-medium text-foreground">{item.title}</p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{item.note}</p>
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      </Card>
    </div>
  );
}