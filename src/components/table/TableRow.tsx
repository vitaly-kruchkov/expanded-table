import { TableRow as MuiRow, TableCell } from "@mui/material";
import { TableCell as Cell } from "./TableCell";
import type { TableRow, ColumnConfig } from "../../model/types";

interface Props {
  row: TableRow;
  columns: ColumnConfig[];
}

export function TableRow({ row, columns }: Props) {
  if (!row || !row.cells) {
    return (
      <MuiRow>
        <TableCell colSpan={columns.length} align="center">
          Некорректные данные строки
        </TableCell>
      </MuiRow>
    );
  }
  return (
    <MuiRow>
      {columns.map((col) => {
        const cell = row.cells[col.key];

        return (
          <TableCell key={col.key} sx={{ p: 0.5 }}>
            <Cell rowId={row.id} column={col} cell={cell} />
          </TableCell>
        );
      })}
    </MuiRow>
  );
}
