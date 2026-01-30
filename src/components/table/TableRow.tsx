import { TableCell } from "./TableCell";
import type { TableRow as TableRowType, ColumnConfig } from "../../model/types";

interface TableRowProps {
  row: TableRowType;
  columns: ColumnConfig[];
}

export function TableRow({ row, columns }: TableRowProps) {
  return (
    <tr>
      {columns.map((col) => (
        <td key={col.key} style={{ padding: 4, verticalAlign: "middle" }}>
          <TableCell column={col} cell={row.cells[col.key]!} />
        </td>
      ))}
    </tr>
  );
}
