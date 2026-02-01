import { getRows, updateRow } from "./table.data";
import { columns } from "./table.columns";
import { validateValue } from "./table.validation";
import type { TableRow } from "./table.types";

export function loadTable(): TableRow[] {
  return getRows();
}

export function patchRow(id: string, patch: Record<string, unknown>) {
  const row = getRows().find((r) => r.id === id);
  if (!row) throw new Error("Row not found");

  const next = { ...row.cells };

  for (const [key, value] of Object.entries(patch)) {
    const column = columns.find((column) => column.key === key);
    if (!column) continue;

    const result = validateValue(value, column);
    if (!result.ok) {
      throw new Error(`${key}: ${result.error}`);
    }

    next[key] = result.value;
  }

  updateRow(id, next);
}
