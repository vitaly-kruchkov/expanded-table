import { useCallback, useEffect } from "react";

export function useEditKeys(onApply: () => void, onCancel: () => void) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onCancel();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onCancel]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        onApply();
      }
      if (e.key === "Escape") {
        e.preventDefault();
        onCancel();
      }
    },
    [onApply, onCancel],
  );

  return { onKeyDown };
}
