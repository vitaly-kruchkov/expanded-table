import type { ColumnConfig, CellValue, TableRow } from "../model/types";

export type ValidationResult =
  | { ok: true; value: CellValue }
  | { ok: false; error: string };

const isEmpty = (value: unknown) =>
  value === "" || value === null || value === undefined;

const validators = {
  string(value: unknown): ValidationResult {
    if (isEmpty(value)) {
      return { ok: false, error: "Значение не может быть пустым" };
    }
    return { ok: true, value: String(value) };
  },

  number(value: unknown): ValidationResult {
    if (isEmpty(value)) return { ok: true, value: null };
    const num = Number(value);
    return Number.isFinite(num)
      ? { ok: true, value: num }
      : { ok: false, error: "Введите корректное число" };
  },

  enum(value: unknown, options: string[]): ValidationResult {
    const v = String(value).trim();
    return options.includes(v)
      ? { ok: true, value: v }
      : { ok: false, error: `Допустимые значения: ${options.join(", ")}` };
  },

  timestamp(
    value: unknown,
    column: ColumnConfig,
    row?: { cells: Record<string, { value: CellValue }> }
  ): ValidationResult {
    if (isEmpty(value)) return { ok: true, value: null };
    const date = value instanceof Date ? value : new Date(String(value));

    if (Number.isNaN(date.getTime())) {
      return { ok: false, error: "Некорректный формат даты" };
    }

    console.log(date);

    if (column.key === "updated_at" && row?.cells.created_at?.value) {
      const created = new Date(String(row.cells.created_at.value));
      if (!Number.isNaN(created.getTime()) && date < created) {
        return {
          ok: false,
          error: "Updadet time не может быть раньше Created time",
        };
      }
    }

    return { ok: true, value: date.toISOString() };
  },

  json(value: unknown, key: string): ValidationResult {
    let parsed = value;

    if (typeof value === "string") {
      if (!value.trim()) {
        return { ok: false, error: "Введите JSON" };
      }
      try {
        parsed = JSON.parse(value);
      } catch {
        return { ok: false, error: "Ошибка парсинга JSON" };
      }
    }

    if (key === "tags") {
      return Array.isArray(parsed) &&
        parsed.every((item) => typeof item === "string")
        ? { ok: true, value: parsed }
        : { ok: false, error: "Ожидается массив строк" };
    }

    return parsed && typeof parsed === "object"
      ? { ok: true, value: parsed as Record<string, unknown> }
      : { ok: false, error: "Ожидается объект" };
  },
};

export function validateCellValue(
  value: unknown,
  column: ColumnConfig,
  row?: TableRow
): ValidationResult {
  switch (column.type) {
    case "string":
      return validators.string(value);
    case "number":
      return validators.number(value);
    case "enum":
      return validators.enum(value, column.options ?? []);
    case "timestamp":
      return validators.timestamp(value, column, row);
    case "json":
      return validators.json(value, column.key);
    default:
      return { ok: true, value: value as CellValue };
  }
}

export function toDate(value: string | null): Date | null {
  if (value === null || value === "") return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

export function toJsonString(value: CellValue): string {
  if (value === null || value === undefined) return "";
  if (typeof value === "string") return value;
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}
