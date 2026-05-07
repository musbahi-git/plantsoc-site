"use client";

import { useState } from "react";

type SubmissionState = "idle" | "submitting" | "success" | "error";

type WorkSubmissionFormProps = {
  category: string;
  area: string;
  submitLabel: string;
  prompt: string;
};

export function WorkSubmissionForm({ category, area, submitLabel, prompt }: WorkSubmissionFormProps) {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [state, setState] = useState<SubmissionState>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setError("");

    const message = [title.trim(), details.trim()].filter(Boolean).join("\n\n");

    try {
      const response = await fetch("/api/suggestions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "",
          contact: "",
          category,
          area,
          message,
        }),
      });

      if (!response.ok) {
        const result = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(result?.error ?? "Could not submit this item.");
      }

      setState("success");
      setTitle("");
      setDetails("");
      event.currentTarget.reset();
    } catch (submissionError) {
      setState("error");
      setError(submissionError instanceof Error ? submissionError.message : "Something went wrong.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-1.5 text-sm font-medium text-slate-600">
          <span>Title</span>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
            className="w-full  border border-slate-200 bg-white px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-slate-400 focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
            placeholder="Fix bench"
          />
        </label>

        <label className="space-y-1.5 text-sm font-medium text-slate-600 sm:col-span-2">
          <span>Details</span>
          <textarea
            value={details}
            onChange={(event) => setDetails(event.target.value)}
            required
            rows={4}
            className="w-full  border border-slate-200 bg-white px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-slate-400 focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
            placeholder="Add the context, location, or follow-up note."
          />
        </label>
      </div>

      <div className="flex flex-col gap-3 border-t border-slate-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-500">{prompt}</p>
        <button
          type="submit"
          disabled={state === "submitting"}
          className=" bg-emerald-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {state === "submitting" ? "Submitting..." : submitLabel}
        </button>
      </div>

      {state === "success" ? (
        <p className=" border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900" aria-live="polite">
          Submitted. It is now waiting in the admin review inbox.
        </p>
      ) : null}

      {state === "error" ? (
        <p className=" border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800" aria-live="polite">
          {error}
        </p>
      ) : null}
    </form>
  );
}