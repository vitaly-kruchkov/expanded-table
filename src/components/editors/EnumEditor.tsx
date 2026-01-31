import { Select, MenuItem, FormControl } from "@mui/material";
import type { EnumEditorProps } from "./types";
import { useEditorFocus } from "../../hooks/useEditorFocus";

export function EnumEditor({
  value,
  options,
  onChange,
  onApply,
  onCancel,
  error,
}: EnumEditorProps) {
  const { ref, onKeyDown } = useEditorFocus<HTMLInputElement>(
    onApply,
    onCancel
  );

  return (
    <FormControl fullWidth size="small" error={Boolean(error)}>
      <Select
        ref={ref}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        onBlur={onApply}
        variant="outlined"
        displayEmpty
        sx={{ fontSize: "inherit", minHeight: 32 }}>
        {options.map((opt) => (
          <MenuItem key={opt} value={opt}>
            {opt}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
