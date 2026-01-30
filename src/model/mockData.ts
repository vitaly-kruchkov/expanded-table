import type { ColumnConfig, TableRow } from "./types";

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

export const initialRows: TableRow[] = [
  {
    id: "row_001",
    cells: {
      id: {
        value: "row_001",
        draft: "row_001",
        status: "view",
      },
      name: {
        value: "Test entity",
        draft: "Test entity",
        status: "view",
      },
      status: {
        value: "active",
        draft: "active",
        status: "view",
      },
      count: {
        value: 42,
        draft: 42,
        status: "view",
      },
      price: {
        value: 199.99,
        draft: 199.99,
        status: "view",
      },
      created_at: {
        value: "2024-12-01T10:30:00Z",
        draft: "2024-12-01T10:30:00Z",
        status: "view",
      },
      updated_at: {
        value: null,
        draft: null,
        status: "view",
      },
      tags: {
        value: ["alpha", "beta", "release"],
        draft: ["alpha", "beta", "release"],
        status: "view",
      },
      metadata: {
        value: {
          owner: "user_123",
          priority: 3,
          flags: {
            archived: false,
            visible: true,
          },
        },
        draft: {
          owner: "user_123",
          priority: 3,
          flags: {
            archived: false,
            visible: true,
          },
        },
        status: "view",
      },
    },
  },
  {
    id: "row_002",
    cells: {
      id: {
        value: "row_002",
        draft: "row_002",
        status: "view",
      },
      name: {
        value: "Another item",
        draft: "Another item",
        status: "view",
      },
      status: {
        value: "draft",
        draft: "draft",
        status: "view",
      },
      count: {
        value: 0,
        draft: 0,
        status: "view",
      },
      price: {
        value: 0,
        draft: 0,
        status: "view",
      },
      created_at: {
        value: "2024-12-02T14:45:00Z",
        draft: "2024-12-02T14:45:00Z",
        status: "view",
      },
      updated_at: {
        value: "2024-12-03T09:15:00Z",
        draft: "2024-12-03T09:15:00Z",
        status: "view",
      },
      tags: {
        value: ["test", "dev"],
        draft: ["test", "dev"],
        status: "view",
      },
      metadata: {
        value: {
          owner: "user_456",
          priority: 1,
        },
        draft: {
          owner: "user_456",
          priority: 1,
        },
        status: "view",
      },
    },
  },
  {
    id: "row_003",
    cells: {
      id: {
        value: "row_003",
        draft: "row_003",
        status: "view",
      },
      name: {
        value: "Inactive record",
        draft: "Inactive record",
        status: "view",
      },
      status: {
        value: "inactive",
        draft: "inactive",
        status: "view",
      },
      count: {
        value: 100,
        draft: 100,
        status: "view",
      },
      price: {
        value: 49.99,
        draft: 49.99,
        status: "view",
      },
      created_at: {
        value: "2024-11-15T08:00:00Z",
        draft: "2024-11-15T08:00:00Z",
        status: "view",
      },
      updated_at: {
        value: null,
        draft: null,
        status: "view",
      },
      tags: {
        value: [],
        draft: [],
        status: "view",
      },
      metadata: {
        value: {},
        draft: {},
        status: "view",
      },
    },
  },
];
