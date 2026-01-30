import { create } from "zustand";
import type { TableRow, ColumnConfig } from "./types";
import { columns, initialRows } from "./mockData";

type EditingCell = { rowId: string; columnKey: string } | null;

export const useTableStore = create<{
  rows: TableRow[];
  columns: ColumnConfig[];
  editingCell: EditingCell;
  saveRows: () => Promise<void>;
}>((set, get) => ({
  rows: initialRows,
  columns: columns,
  editingCell: null,

  saveRows: async () => {
    const { rows } = get();
    await new Promise((r) => setTimeout(r, 300));
    set({
      rows: rows.map((r) => ({
        ...r,
        cells: Object.fromEntries(
          Object.entries(r.cells).map(([k, c]) => [
            k,
            { ...c, status: "view" as const },
          ]),
        ),
      })),
    });
  },
}));
