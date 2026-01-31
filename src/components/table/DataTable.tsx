import {
  Paper,
  Box,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { useTableStore } from "../../model/tableStore";
import { TableRow as Row } from "./TableRow";

export function DataTable() {
  const { rows, columns, saveRows } = useTableStore();

  const hasDirty = rows.some((row) =>
    Object.values(row.cells).some((col) => col.status === "dirty"),
  );

  return (
    <Paper>
      <Box p={1} display="flex" justifyContent="flex-end">
        <Button
          size="small"
          variant="contained"
          disabled={!hasDirty}
          onClick={() => saveRows()}>
          Сохранить
        </Button>
      </Box>

      <Table size="small" stickyHeader>
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell key={col.key} sx={{ fontWeight: 600 }}>
                {col.title}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row) => (
            <Row key={row.id} row={row} columns={columns} />
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
