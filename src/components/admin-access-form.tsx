"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function AdminAccessForm() {
  const [accessKey, setAccessKey] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/admin/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accessKey }),
      });

      if (!response.ok) {
        const result = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(result?.error ?? "Unable to unlock the workspace.");
      }

      setAccessKey("");
      router.refresh();
    } catch (submissionError) {
      setError(
        submissionError instanceof Error ? submissionError.message : "Unable to unlock the workspace.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block space-y-2 text-sm font-medium text-emerald-950/70">
        <span>Access key</span>
        <input
          type="password"
          value={accessKey}
          onChange={(event) => setAccessKey(event.target.value)}
          className="w-full  border border-emerald-950/10 bg-white px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-emerald-950/35 focus:border-emerald-950/25 focus:ring-2 focus:ring-emerald-950/10"
          placeholder="Enter the admin access key"
        />
      </label>

      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-emerald-950/55">
          Unlock the private workspace to review suggestions and manage content.
        </p>
        <button
          type="submit"
          disabled={isSubmitting}
          className=" bg-emerald-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Unlocking..." : "Unlock workspace"}
        </button>
      </div>

      {error ? (
        <p className=" border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
          {error}
        </p>
      ) : null}
    </form>
  );
}