export type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

export type CellValue = JsonValue;

export interface TableRow {
  id: string;
  cells: Record<string, CellValue>;
}

export type ColumnType = "string" | "number" | "enum" | "timestamp" | "json";

export interface ColumnConfig {
  key: string;
  title: string;
  type: ColumnType;
  editable: boolean;
  options?: string[];
}

export type ValidationResult =
  | { ok: true; value: CellValue }
  | { ok: false; error: string };
