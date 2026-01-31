import { Box, Typography } from "@mui/material";
import type {
  TableCell as CellType,
  ColumnConfig,
  CellValue,
  CellStatus,
} from "../../model/types";
import { useTableStore } from "../../model/tableStore";
import { formatCellDisplay } from "../../utils/formatters";
import { EDITORS } from "../editors/const";

const Styles: Record<
  CellStatus,
  { bg?: string; border: string; outline?: string }
> = {
  view: { bg: "transparent", border: "1px solid transparent" },
  editing: {
    bg: "action.hover",
    border: "1px solid",
    outline: "2px solid primary.main",
  },
  dirty: { bg: "action.selected", border: "1px solid primary.light" },
  error: { border: "2px solid error.light" },
};

interface Props {
  rowId: string;
  column: ColumnConfig;
  cell: CellType;
}

export function TableCell({ rowId, column, cell }: Props) {
  const { startEdit, cancelEdit, setDraft, applyEdit } = useTableStore();
  const showEditor = cell.status === "editing" || cell.status === "error";

  const styles = Styles[cell.status];

  const onClick =
    column.editable && !showEditor
      ? () => startEdit(rowId, column.key)
      : undefined;

  const onDraft = (value: CellValue) => setDraft(rowId, column.key, value);

  const common = {
    value: cell.draft as never,
    onChange: onDraft,
    onApply: () => applyEdit(rowId, column.key),
    onCancel: () => cancelEdit(rowId, column.key),
    error: cell.error,
  };

  const Editor = EDITORS[column.type];

  return (
    <Box
      onClick={onClick}
      sx={{
        width: "100%",
        minHeight: 36,
        px: 1,
        py: 0.5,
        display: "flex",
        alignItems: "center",
        backgroundColor: styles.bg,
        border: styles.border,
        borderColor: cell.status === "error" ? "error.main" : "divider",
        outline: styles.outline,
        outlineOffset: -1,
        borderRadius: 1,
        cursor: onClick ? "pointer" : "default",
        "&:hover": onClick ? { backgroundColor: "action.hover" } : {},
      }}>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        {showEditor ? (
          column.type === "enum" ? (
            <Editor {...common} options={column.options ?? []} />
          ) : (
            <Editor options={[]} {...common} />
          )
        ) : (
          <Typography variant="body2" noWrap>
            {formatCellDisplay(cell.value, column.type)}
          </Typography>
        )}
      </Box>

      {cell.error && (
        <Typography
          variant="caption"
          color="error"
          sx={{ ml: 0.5 }}
          title={cell.error}
        />
      )}
    </Box>
  );
}
