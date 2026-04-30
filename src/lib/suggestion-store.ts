import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

export type SuggestionStatus = "New" | "Reviewing" | "Planned" | "Closed";

export type SuggestionRecord = {
  id: string;
  name: string;
  contact: string;
  category: string;
  area: string;
  message: string;
  submittedAt: string;
  status: SuggestionStatus;
};

const suggestionStorePath = join(process.cwd(), "data", "suggestions.json");

function readSuggestionStore() {
  try {
    const raw = readFileSync(suggestionStorePath, "utf8");
    const parsed = JSON.parse(raw) as unknown;

    if (!Array.isArray(parsed)) {
      return [] as SuggestionRecord[];
    }

    return parsed.filter(isSuggestionRecord);
  } catch {
    return [] as SuggestionRecord[];
  }
}

function writeSuggestionStore(records: SuggestionRecord[]) {
  mkdirSync(dirname(suggestionStorePath), { recursive: true });
  writeFileSync(suggestionStorePath, `${JSON.stringify(records, null, 2)}\n`, "utf8");
}

function isSuggestionStatus(value: unknown): value is SuggestionStatus {
  return value === "New" || value === "Reviewing" || value === "Planned" || value === "Closed";
}

function isSuggestionRecord(value: unknown): value is SuggestionRecord {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.id === "string" &&
    typeof candidate.name === "string" &&
    typeof candidate.contact === "string" &&
    typeof candidate.category === "string" &&
    typeof candidate.area === "string" &&
    typeof candidate.message === "string" &&
    typeof candidate.submittedAt === "string" &&
    isSuggestionStatus(candidate.status)
  );
}

export function listSuggestions() {
  return [...readSuggestionStore()].sort(
    (left, right) => right.submittedAt.localeCompare(left.submittedAt),
  );
}

export function addSuggestion(input: {
  name: string;
  contact: string;
  category: string;
  area: string;
  message: string;
}) {
  const record: SuggestionRecord = {
    id: crypto.randomUUID(),
    name: input.name || "Anonymous",
    contact: input.contact,
    category: input.category,
    area: input.area,
    message: input.message,
    submittedAt: new Date().toISOString(),
    status: "New",
  };

  const records = readSuggestionStore();
  records.unshift(record);
  writeSuggestionStore(records);

  return record;
}

export function updateSuggestionStatus(id: string, status: SuggestionStatus) {
  const records = readSuggestionStore();
  const recordIndex = records.findIndex((record) => record.id === id);

  if (recordIndex === -1) {
    return null;
  }

  records[recordIndex] = {
    ...records[recordIndex],
    status,
  };

  writeSuggestionStore(records);

  return records[recordIndex];
}