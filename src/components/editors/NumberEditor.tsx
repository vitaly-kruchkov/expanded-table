import { TextField } from "@mui/material";
import type { NumberEditorProps } from "./types";
import { useEditorFocus } from "../../hooks/useEditorFocus";

export function NumberEditor({
  value,
  onChange,
  onApply,
  onCancel,
  error,
}: NumberEditorProps) {
  const { ref, onKeyDown } = useEditorFocus<HTMLInputElement>(
    onApply,
    onCancel,
    { select: true }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const s = e.target.value.trim();
    if (s === "") onChange(null);
    else if (Number.isFinite(Number(s))) onChange(Number(s));
  };

  return (
    <TextField
      inputRef={ref}
      size="small"
      fullWidth
      type="number"
      value={String(value)}
      onChange={handleChange}
      onKeyDown={onKeyDown}
      onBlur={onApply}
      error={Boolean(error)}
      helperText={error}
      variant="outlined"
      sx={{ "& .MuiInputBase-root": { fontSize: "inherit" } }}
    />
  );
}
