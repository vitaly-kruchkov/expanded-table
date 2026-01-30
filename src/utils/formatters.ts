import type { CellValue, ColumnType } from "../model/types";

export function formatCellDisplay(value: CellValue, type: ColumnType): string {
  if (value === null || value === undefined) return "—";
  if (type === "timestamp") {
    if (value === null || value === "") return "—";
    const date = new Date(String(value));
    return date.toLocaleString(undefined, {
      dateStyle: "short",
      timeStyle: "medium",
    });
  } else if (type === "json") {
    if (Array.isArray(value)) return value.join(", ");
    if (typeof value === "object") return JSON.stringify(value);
    return String(value);
  } else {
    return String(value);
  }
}
