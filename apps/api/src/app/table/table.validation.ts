import type { CellValue, ColumnConfig, ValidationResult } from "./table.types";

export function validateValue(
  value: unknown,
  column: ColumnConfig
): ValidationResult {
  if (column.type === "timestamp") {
    if (value === null) return { ok: true, value: null };

    const d = new Date(String(value));
    if (Number.isNaN(d.getTime())) {
      return { ok: false, error: "Некорректная дата" };
    }

    return { ok: true, value: d.toISOString() };
  }

  if (column.type === "number") {
    if (value === null) return { ok: true, value: null };
    const n = Number(value);
    return Number.isFinite(n)
      ? { ok: true, value: n }
      : { ok: false, error: "Некорректное число" };
  }

  if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean" ||
    value === null
  ) {
    return { ok: true, value };
  }

  if (typeof value === "object") {
    return { ok: true, value: value as CellValue };
  }

  return { ok: false, error: "Некорректный тип значения" };
}
