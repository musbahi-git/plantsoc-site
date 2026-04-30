"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui";
import type { SuggestionRecord, SuggestionStatus } from "@/lib/suggestion-store";
import { formatDate } from "@/lib/site-data";

type SuggestionInboxProps = {
  suggestions: SuggestionRecord[];
};

const statusActions: SuggestionStatus[] = ["Reviewing", "Planned", "Closed"];

export function SuggestionInbox({ suggestions }: SuggestionInboxProps) {
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function updateStatus(id: string, status: SuggestionStatus) {
    setPendingId(id);

    startTransition(async () => {
      try {
        const response = await fetch(`/api/suggestions/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        });

        if (!response.ok) {
          throw new Error("Unable to update suggestion status.");
        }

        router.refresh();
      } finally {
        setPendingId(null);
      }
    });
  }

  return (
    <div className="space-y-4">
      {suggestions.map((suggestion) => (
        <div key={suggestion.id} className="rounded-[28px] border border-emerald-950/10 bg-white/80 p-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm text-emerald-950/60">
                {suggestion.name}
              </p>
            </div>
            <Badge tone="amber">{suggestion.status}</Badge>
          </div>

          <p className="mt-4 text-sm leading-6 text-emerald-950/70">{suggestion.message}</p>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-emerald-950/55">
            <span>Submitted {formatDate(suggestion.submittedAt)}</span>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {statusActions.map((status) =>+
             (
              <button
                key={status}
                type="button"
                onClick={() => updateStatus(suggestion.id, status)}
                disabled={pendingId === suggestion.id && isPending}
                className="rounded-full border border-emerald-950/10 bg-emerald-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-950 transition hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}