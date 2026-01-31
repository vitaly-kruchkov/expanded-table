import { TextField } from "@mui/material";
import type { StringEditorProps } from "./types";
import { useEditorFocus } from "../../hooks/useEditorFocus";

export function StringEditor({
  value,
  onChange,
  onApply,
  onCancel,
  error,
}: StringEditorProps) {
  const { ref, onKeyDown } = useEditorFocus<HTMLInputElement>(
    onApply,
    onCancel,
    { select: true }
  );

  return (
    <TextField
      inputRef={ref}
      size="small"
      fullWidth
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      onBlur={onApply}
      error={Boolean(error)}
      helperText={error}
      variant="outlined"
      sx={{ "& .MuiInputBase-root": { fontSize: "inherit" } }}
    />
  );
}
