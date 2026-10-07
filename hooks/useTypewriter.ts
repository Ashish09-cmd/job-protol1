"use client";

import { useEffect, useState } from "react";

type Phase = "typing" | "holding" | "deleting" | "switching";

export interface UseTypewriterOptions {
  /** Delay between typed characters (ms). */
  typingSpeed?: number;
  /** Delay between deleted characters (ms). */
  deletingSpeed?: number;
  /** How long a completed word stays on screen (ms). */
  holdDuration?: number;
  /** Pause between a word being erased and the next one starting (ms). */
  switchDelay?: number;
}

export interface UseTypewriterResult {
  /** The portion of the current word that should be visible. */
  text: string;
  /** True while the word is resting (fully typed or fully erased). */
  isIdle: boolean;
}

const DEFAULTS: Required<UseTypewriterOptions> = {
  typingSpeed: 90,
  deletingSpeed: 50,
  holdDuration: 1600,
  switchDelay: 350,
};

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);

    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return reduced;
}

/**
 * Cycles through `words` with a typing / deleting effect.
 * `words` should be a stable reference (module constant or memoized).
 */
export function useTypewriter(
  words: readonly string[],
  options: UseTypewriterOptions = {},
): UseTypewriterResult {
  const { typingSpeed, deletingSpeed, holdDuration, switchDelay } = {
    ...DEFAULTS,
    ...options,
  };

  const reducedMotion = usePrefersReducedMotion();
  const [state, setState] = useState<{
    index: number;
    length: number;
    phase: Phase;
  }>({ index: 0, length: 0, phase: "typing" });

  useEffect(() => {
    if (reducedMotion || words.length === 0) return;

    const word = words[state.index];
    let timeout: ReturnType<typeof setTimeout> | undefined;

    switch (state.phase) {
      case "typing":
        if (state.length < word.length) {
          timeout = setTimeout(
            () => setState((s) => ({ ...s, length: s.length + 1 })),
            typingSpeed,
          );
        } else {
          setState((s) => ({ ...s, phase: "holding" }));
        }
        break;

      case "holding":
        // With a single word there is nothing to rotate to.
        if (words.length > 1) {
          timeout = setTimeout(
            () => setState((s) => ({ ...s, phase: "deleting" })),
            holdDuration,
          );
        }
        break;

      case "deleting":
        if (state.length > 0) {
          timeout = setTimeout(
            () => setState((s) => ({ ...s, length: s.length - 1 })),
            deletingSpeed,
          );
        } else {
          setState((s) => ({ ...s, phase: "switching" }));
        }
        break;

      case "switching":
        timeout = setTimeout(
          () =>
            setState((s) => ({
              index: (s.index + 1) % words.length,
              length: 0,
              phase: "typing",
            })),
          switchDelay,
        );
        break;
    }

    return () => clearTimeout(timeout);
  }, [
    state,
    words,
    reducedMotion,
    typingSpeed,
    deletingSpeed,
    holdDuration,
    switchDelay,
  ]);

  if (reducedMotion) {
    return { text: words[0] ?? "", isIdle: true };
  }

  return {
    text: (words[state.index] ?? "").slice(0, state.length),
    isIdle: state.phase === "holding" || state.phase === "switching",
  };
}
