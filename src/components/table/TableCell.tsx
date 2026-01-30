import { CellContainer } from "../common/CellContainer";
import { CellView } from "../common/CellView";
import type { TableCell as CellType, ColumnConfig } from "../../model/types";

interface Props {
  column: ColumnConfig;
  cell: CellType;
}

export function TableCell({ column, cell }: Props) {
  return (
    <CellContainer status={cell.status} error={cell.error}>
      <CellView value={cell.value} type={column.type} />
    </CellContainer>
  );
}
