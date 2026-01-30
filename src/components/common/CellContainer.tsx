import type { ReactNode } from "react";
import type { CellStatus } from "../../model/types";
import { Box } from "@mui/material";

interface Props {
  status: CellStatus;
  error?: string;
  children: ReactNode;
  onClick?: () => void;
}

const STATUS_STYLES: Record<
  CellStatus,
  { bg: string; border: string; outline?: string }
> = {
  view: { bg: "transparent", border: "1px solid transparent" },
  editing: {
    bg: "action.hover",
    border: "1px solid",
    outline: "2px solid primary.main",
  },
  dirty: { bg: "action.selected", border: "1px solid primary.light" },
  error: { bg: "error.light", border: "2px solid" },
};

export function CellContainer({ status, error, children, onClick }: Props) {
  const styles = STATUS_STYLES[status];
  const isError = status === "error";

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
        borderColor: isError ? "error.main" : "divider",
        outline: styles.outline,
        outlineOffset: -1,
        borderRadius: 1,
        cursor: onClick ? "pointer" : "default",
        "&:hover": onClick ? { backgroundColor: "action.hover" } : {},
      }}>
      <Box sx={{ flex: 1, minWidth: 0 }}>{children}</Box>
      {error && (
        <Box
          component="span"
          sx={{ color: "error.main", fontSize: "0.75rem", ml: 0.5 }}
          title={error}>
          !
        </Box>
      )}
    </Box>
  );
}
