import type { CellEditorProps, CellValue } from "../../model/types";

export interface EditorProps<T> extends CellEditorProps {
  value: T;
  onChange: (value: T) => void;
}

export type StringEditorProps = EditorProps<string>;

export type NumberEditorProps = EditorProps<number | null>;

export type DateEditorProps = EditorProps<string | null>;

export type JsonEditorProps = EditorProps<CellValue>;

export interface EnumEditorProps extends EditorProps<string> {
  options: string[];
}
