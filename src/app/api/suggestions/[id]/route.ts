import { NextResponse } from "next/server";
import { updateSuggestionStatus, type SuggestionStatus } from "@/lib/suggestion-store";

const allowedStatuses: SuggestionStatus[] = ["New", "Reviewing", "Planned", "Closed"];

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  let body: { status?: string } = {};

  try {
    body = (await request.json()) as { status?: string };
  } catch {
    return NextResponse.json({ error: "Request body must be JSON." }, { status: 400 });
  }

  if (!body.status || !allowedStatuses.includes(body.status as SuggestionStatus)) {
    return NextResponse.json({ error: "Invalid suggestion status." }, { status: 400 });
  }

  const { id } = await params;
  const suggestion = updateSuggestionStatus(id, body.status as SuggestionStatus);

  if (!suggestion) {
    return NextResponse.json({ error: "Suggestion not found." }, { status: 404 });
  }

  return NextResponse.json({ suggestion });
}