import type { TableRow } from "../model/types";

const API_URL = "http://localhost:3000/api/table";

export async function fetchTable(): Promise<TableRow[]> {
  const res = await fetch(API_URL);
  if (!res.ok) {
    throw new Error("Failed to load table");
  }
  return res.json();
}

export async function patchRow(
  rowId: string,
  patch: Record<string, unknown>
): Promise<void> {
  const res = await fetch(API_URL, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: rowId, patch }),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Save failed");
  }
}
