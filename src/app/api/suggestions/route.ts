import { NextResponse } from "next/server";
import { addSuggestion } from "@/lib/suggestion-store";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body must be JSON." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid suggestion payload." }, { status: 400 });
  }

  const payload = body as Record<string, unknown>;
  const message = typeof payload.message === "string" ? payload.message.trim() : "";
  const category = typeof payload.category === "string" ? payload.category.trim() : "";
  const area = typeof payload.area === "string" ? payload.area.trim() : "General";
  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const contact = typeof payload.contact === "string" ? payload.contact.trim() : "";

  if (!message) {
    return NextResponse.json({ error: "Please add a suggestion message." }, { status: 400 });
  }

  if (!category) {
    return NextResponse.json({ error: "Please choose a suggestion type." }, { status: 400 });
  }

  const suggestion = addSuggestion({ name, contact, category, area, message });

  return NextResponse.json({ suggestion }, { status: 201 });
}