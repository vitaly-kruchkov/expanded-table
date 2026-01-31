import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ru } from "date-fns/locale";
import { useEditKeys } from "../../hooks/useEditKeys";
import { toDate } from "../../utils/validation";
import type { DateEditorProps } from "./types";

export function DateEditor({
  value,
  onChange,
  onApply,
  onCancel,
  error,
}: DateEditorProps) {
  useEditKeys(onApply, onCancel);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
      <DateTimePicker
        value={toDate(value)}
        onChange={(d) => onChange(d ? d.toISOString() : null)}
        onClose={onApply}
        slotProps={{
          textField: {
            size: "small",
            fullWidth: true,
            error: Boolean(error),
            helperText: error,
            onKeyDown: (e) => e.key === "Enter" && onApply(),
          },
        }}
      />
    </LocalizationProvider>
  );
}
