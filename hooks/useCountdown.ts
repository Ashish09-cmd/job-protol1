"use client";
import { useCallback, useEffect, useState } from "react";

/** Counts down once a second from `seconds` to 0. Call `restart` to begin again. */
export function useCountdown(seconds: number) {
  const [secondsLeft, setSecondsLeft] = useState(seconds);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setTimeout(() => setSecondsLeft((value) => value - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft]);

  const restart = useCallback(() => setSecondsLeft(seconds), [seconds]);

  return { secondsLeft, restart };
}

/** 75 becomes "01:15". */
export function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}
