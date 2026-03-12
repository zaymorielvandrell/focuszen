"use client";

import { useEffect } from "react";

type ShortcutActions = {
  toggleTimer: () => void;
  resetTimer: () => void;
  skipSession: () => void;
};

export const usePomodoroKeyboardShortcuts = ({
  toggleTimer,
  resetTimer,
  skipSession
}: ShortcutActions) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        event.target instanceof HTMLSelectElement ||
        (event.target instanceof HTMLElement && event.target.isContentEditable)
      ) {
        return;
      }

      if (event.code === "Space") {
        event.preventDefault();
        toggleTimer();
      }

      if (event.code === "KeyR") {
        resetTimer();
      }

      if (event.code === "KeyS") {
        skipSession();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [resetTimer, skipSession, toggleTimer]);
};
