import { create } from "zustand";
import type { TableRow, TableCell, CellValue, ColumnConfig } from "./types";
import { validateCellValue } from "../utils/validation";
import { columns } from "./mockData";
import { fetchTable } from "../api/table";

function changeRow(
  rows: TableRow[],
  rowId: string,
  columnKey: string,
  changes: Partial<TableCell>
): TableRow[] {
  return rows.map((row) => {
    if (row.id !== rowId) return row;
    const cell = { ...row.cells[columnKey]!, ...changes };
    return { ...row, cells: { ...row.cells, [columnKey]: cell } };
  });
}

export const useTableStore = create<{
  rows: TableRow[];
  columns: ColumnConfig[];
  startEdit: (rowId: string, columnKey: string) => void;
  cancelEdit: (rowId: string, columnKey: string) => void;
  setDraft: (rowId: string, columnKey: string, draft: CellValue) => void;
  applyEdit: (rowId: string, columnKey: string) => boolean;
  saveRows: () => Promise<void>;
  load: () => Promise<void>;
  isLoading: boolean;
}>((set) => ({
  rows: [],
  columns: columns,
  isLoading: false,

  startEdit: (rowId, columnKey) => {
    set((state) => {
      const row = state.rows.find((row) => row.id === rowId);
      const col = state.columns.find((column) => column.key === columnKey);
      const cell = row?.cells[columnKey];
      if (!col?.editable || !cell) return state;

      return {
        rows: changeRow(state.rows, rowId, columnKey, {
          status: "editing",
          draft: cell.value,
          error: undefined,
        }),
      };
    });
  },

  cancelEdit: (rowId, columnKey) => {
    set((state) => {
      const cell = state.rows.find((row) => row.id === rowId)?.cells[columnKey];
      const isEditing = cell?.status === "editing" || cell?.status === "error";
      if (!cell || !isEditing) return state;

      return {
        rows: changeRow(state.rows, rowId, columnKey, {
          status: "view",
          draft: cell.value,
          error: undefined,
        }),
      };
    });
  },

  setDraft: (rowId, columnKey, draft) => {
    set((state) => {
      const cell = state.rows.find((row) => row.id === rowId)?.cells[columnKey];
      const col = state.columns.find((column) => column.key === columnKey);
      if (!col || !cell || cell.status !== "editing") return state;

      const norm =
        typeof draft === "string" &&
        (col.type === "number" || col.type === "timestamp") &&
        draft.trim() === ""
          ? null
          : draft;

      return {
        rows: changeRow(state.rows, rowId, columnKey, {
          draft: norm as CellValue,
          error: undefined,
        }),
      };
    });
  },

  applyEdit: (rowId, columnKey) => {
    let ok = false;
    set((state) => {
      const col = state.columns.find((column) => column.key === columnKey);
      const cell = state.rows.find((row) => row.id === rowId)?.cells[columnKey];
      const row = state.rows.find((row) => row.id === rowId);
      if (!col || !cell) return state;

      const result = validateCellValue(cell.draft, col, row);
      if (!result.ok) {
        return {
          rows: changeRow(state.rows, rowId, columnKey, {
            status: "error",
            error: result.error,
          }),
        };
      }

      ok = true;
      const changed =
        JSON.stringify(cell.value) !== JSON.stringify(result.value);
      return {
        rows: changeRow(state.rows, rowId, columnKey, {
          value: result.value,
          draft: result.value,
          status: changed ? "dirty" : "view",
          error: undefined,
        }),
      };
    });
    return ok;
  },

  saveRows: async () => {
    await new Promise((r) => setTimeout(r, 300));
    set((state) => ({
      rows: state.rows.map((r) => ({
        ...r,
        cells: Object.fromEntries(
          Object.entries(r.cells).map(([k, c]) => [
            k,
            { ...c, status: "view" as const },
          ])
        ),
      })),
    }));
  },

  load: async () => {
    set({ isLoading: true });
    const rows = await fetchTable();
    set({ rows, isLoading: false });
  },
}));
