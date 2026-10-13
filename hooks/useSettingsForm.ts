"use client";

import { useCallback, useMemo, useState } from "react";

export type SaveStatus = "idle" | "saving" | "saved" | "error";

/**
 * Local form state with dirty tracking, Discard and Save.
 * `persist` is where the API call goes; throw to show the error state.
 */
export function useSettingsForm<T extends object>(
  initial: T,
  persist?: (values: T) => Promise<void>,
) {
  const [savedValues, setSavedValues] = useState<T>(initial);
  const [values, setValues] = useState<T>(initial);
  const [status, setStatus] = useState<SaveStatus>("idle");

  const dirty = useMemo(
    () => JSON.stringify(values) !== JSON.stringify(savedValues),
    [values, savedValues],
  );

  const update = useCallback(<K extends keyof T>(key: K, value: T[K]) => {
    setValues((current) => ({ ...current, [key]: value }));
    setStatus("idle");
  }, []);

  const discard = useCallback(() => {
    setValues(savedValues);
    setStatus("idle");
  }, [savedValues]);

  const save = useCallback(async () => {
    setStatus("saving");
    try {
      // TODO: send `values` to the API through `persist`.
      await persist?.(values);
      setSavedValues(values);
      setStatus("saved");
    } catch {
      setStatus("error");
    }
  }, [persist, values]);

  return { values, update, dirty, status, discard, save };
}
