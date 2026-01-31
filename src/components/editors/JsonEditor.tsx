import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { Box, FormHelperText } from "@mui/material";
import { useEditKeys } from "../../hooks/useEditKeys";
import { toJsonString } from "../../utils/validation";
import type { JsonEditorProps } from "./types";

const options = {
  minimap: { enabled: false },
  lineNumbers: "off" as const,
  folding: false,
  scrollBeyondLastLine: false,
  wordWrap: "on" as const,
  padding: { top: 8, bottom: 8 },
  fontSize: 13,
  tabSize: 2,
  automaticLayout: true,
};

export function JsonEditor({
  value,
  onChange,
  onApply,
  onCancel,
  error,
}: JsonEditorProps) {
  const [text, setText] = useState(() => toJsonString(value));
  useEditKeys(onApply, onCancel);

  useEffect(() => {
    setText(toJsonString(value));
  }, [value]);

  const onMount = (
    editor: import("monaco-editor").editor.IStandaloneCodeEditor
  ) => {
    editor.onDidBlurEditorWidget(() => onApply());
    editor.addAction({
      id: "apply-json",
      label: "Применить (Ctrl+Enter)",
      keybindings: [2048 | 3],
      run: () => onApply(),
    });
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Editor
        height={180}
        language="json"
        value={text}
        onChange={(v) => {
          setText(v ?? "");
          onChange(v ?? "");
        }}
        onMount={onMount}
        theme="light"
        options={options}
        loading={null}
      />
      {error && (
        <FormHelperText error sx={{ mt: 0.5, mx: 1 }}>
          {error}
        </FormHelperText>
      )}
    </Box>
  );
}
