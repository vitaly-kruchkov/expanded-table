import type { ColumnConfig } from "./table.types";

export const columns: ColumnConfig[] = [
  {
    key: "id",
    title: "ID",
    type: "string",
    editable: false,
  },
  {
    key: "name",
    title: "Name",
    type: "string",
    editable: true,
  },
  {
    key: "status",
    title: "Status",
    type: "enum",
    editable: true,
    options: ["active", "inactive", "draft"],
  },
  {
    key: "count",
    title: "Count",
    type: "number",
    editable: true,
  },
  {
    key: "price",
    title: "Price",
    type: "number",
    editable: true,
  },
  {
    key: "created_at",
    title: "Created at",
    type: "timestamp",
    editable: false,
  },
  {
    key: "updated_at",
    title: "Updated at",
    type: "timestamp",
    editable: true,
  },
  {
    key: "tags",
    title: "Tags",
    type: "json",
    editable: true,
  },
  {
    key: "metadata",
    title: "Metadata",
    type: "json",
    editable: true,
  },
];
