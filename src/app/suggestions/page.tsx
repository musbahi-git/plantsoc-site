import { Badge, Card, SectionHeading } from "@/components/ui";
import { SuggestionForm } from "@/components/suggestion-form";

export const metadata = {
  title: "Suggestions | PlantSoc & Community Allotment",
};

export default function SuggestionsPage() {
  return (
    <div className="w-full space-y-8 pb-10">
      <section className="space-y-5 pt-2">
        <Badge tone="amber">Public form</Badge>
        <div className="max-w-3xl space-y-3">
          <h1 className="font-display text-4xl leading-none tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Suggestions
          </h1>
          <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Share what should be planted, improved, or reviewed next. Submissions go to the admin inbox.
          </p>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="p-6 sm:p-7">
          <SectionHeading
            eyebrow="Send a note"
            title="What should we do next?"
            description="Keep it short and actionable so it can move into the work queue quickly."
          />
          <div className="mt-6">
            <SuggestionForm />
          </div>
        </Card>

        <Card className="p-6 sm:p-7">
          <SectionHeading
            eyebrow="Good suggestions"
            title="Useful examples"
            description="Simple notes are easier to review and turn into work."
          />
          <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-600">
            <li className="-2xl border border-slate-200 bg-white px-4 py-3">Planting ideas for beds, borders, and the herb spiral.</li>
            <li className="-2xl border border-slate-200 bg-white px-4 py-3">Maintenance work that should move into the todo list.</li>
            <li className="-2xl border border-slate-200 bg-white px-4 py-3">Events, workshops, or safety improvements for the site.</li>
          </ul>
        </Card>
      </section>
    </div>
  );
}