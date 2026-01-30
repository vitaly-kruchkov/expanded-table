import { formatCellDisplay } from "../../utils/formatters";
import type { CellValue, ColumnType } from "../../model/types";

interface Props {
  value: CellValue;
  type: ColumnType;
}

export function CellView({ value, type }: Props) {
  return <span>{formatCellDisplay(value, type)}</span>;
}
