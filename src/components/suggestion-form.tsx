"use client";

import { useState } from "react";

type SubmissionState = "idle" | "submitting" | "success" | "error";

export function SuggestionForm() {
  const [state, setState] = useState<SubmissionState>("idle");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [name, setName] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setError("");

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: name.trim(),
      message: String(formData.get("message") ?? "").trim(),
    };

    try {
      const response = await fetch("/api/suggestions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const result = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(result?.error ?? "Could not submit your suggestion.");
      }

      setState("success");
      setMessage(payload.message);
      event.currentTarget.reset();
      setName("");
    } catch (submissionError) {
      setState("error");
      setError(submissionError instanceof Error ? submissionError.message : "Something went wrong.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm font-medium text-emerald-950/70">
          <span>Your name (optional)</span>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full  border border-emerald-950/10 bg-white px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-emerald-950/35 focus:border-emerald-950/25 focus:ring-2 focus:ring-emerald-950/10"
            placeholder="Anonymous or your name"
          />
        </label>
      </div>



      <label className="block space-y-2 text-sm font-medium text-emerald-950/70">
        <span>What should we plant or do next?</span>
        <textarea
          name="message"
          required
          rows={6}
          className="w-full border border-emerald-950/10 bg-white px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-emerald-950/35 focus:border-emerald-950/25 focus:ring-2 focus:ring-emerald-950/10"
          placeholder="Share the crop, task, or improvement you want the allotment team to review."
        />
      </label>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-emerald-950/55">
          Suggestions are queued for admin review. This form will keep working once the data layer is connected.
        </p>
        <button
          type="submit"
          disabled={state === "submitting"}
          className="inline-flex items-center justify-center  bg-emerald-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {state === "submitting" ? "Sending..." : "Submit suggestion"}
        </button>
      </div>

      {state === "success" ? (
        <p className=" border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          Thanks. Your suggestion was sent and is waiting in the review queue: {message}
        </p>
      ) : null}

      {state === "error" ? (
        <p className=" border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
          {error}
        </p>
      ) : null}
    </form>
  );
}