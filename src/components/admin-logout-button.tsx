"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function AdminLogoutButton() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  async function handleLogout() {
    setIsSubmitting(true);

    try {
      await fetch("/api/admin/session", {
        method: "DELETE",
      });
      router.refresh();
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isSubmitting}
      className="rounded-full border border-emerald-950/10 bg-white/85 px-4 py-2 text-sm font-semibold text-emerald-950 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-70"
    >
      {isSubmitting ? "Logging out..." : "Log out"}
    </button>
  );
}