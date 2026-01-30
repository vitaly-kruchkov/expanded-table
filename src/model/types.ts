export type CellValue =
  | string
  | number
  | boolean
  | null
  | string[]
  | Record<string, unknown>;

export type CellStatus = "view" | "editing" | "dirty" | "error";

export interface TableCell {
  value: CellValue;
  draft: CellValue;
  status: CellStatus;
  error?: string;
}

export interface TableRow {
  id: string;
  cells: Record<string, TableCell>;
}

export type ColumnType = "string" | "number" | "enum" | "timestamp" | "json";

export interface ColumnConfig {
  key: string;
  title: string;
  type: ColumnType;
  editable: boolean;
  options?: string[];
}
