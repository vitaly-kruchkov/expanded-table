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

  const safeRows = rows || [];
  const safeColumns = columns || [];

  const hasDirty = safeRows.some((row) => {
    if (!row || !row.cells) return false;
    return Object.values(row.cells).some(
      (col) => col && col.status === "dirty"
    );
  });

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
            {safeColumns.map((col) => (
              <TableCell key={col.key} sx={{ fontWeight: 600 }}>
                {col.title}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {safeRows.map((row) => (
            <Row key={row.id} row={row} columns={safeColumns} />
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
