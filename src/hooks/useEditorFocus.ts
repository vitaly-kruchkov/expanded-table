import { useEffect, useRef } from "react";
import { useEditKeys } from "./useEditKeys";

export function useEditorFocus<T extends HTMLElement>(
  onApply: () => void,
  onCancel: () => void,
  options?: { select?: boolean }
) {
  const ref = useRef<T>(null);
  const { onKeyDown } = useEditKeys(onApply, onCancel);

  useEffect(() => {
    ref.current?.focus();
    if (options?.select && "select" in ref.current!) {
      (ref.current as unknown as HTMLInputElement).select();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ref, onKeyDown };
}
