import { TableRow as MuiRow, TableCell } from "@mui/material";
import { TableCell as Cell } from "./TableCell";
import type { TableRow, ColumnConfig } from "../../model/types";

interface Props {
  row: TableRow;
  columns: ColumnConfig[];
}

export function TableRow({ row, columns }: Props) {
  return (
    <MuiRow>
      {columns.map((col) => (
        <TableCell key={col.key} sx={{ p: 0.5 }}>
          <Cell rowId={row.id} column={col} cell={row.cells[col.key]!} />
        </TableCell>
      ))}
    </MuiRow>
  );
}
