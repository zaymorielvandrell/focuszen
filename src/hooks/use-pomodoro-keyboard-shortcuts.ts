"use client";

import { useEffect } from "react";
import { isEditableElement } from "~/utils/dom";

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
      if (isEditableElement(event.target)) {
        return;
      }

      switch (event.code) {
        case "Space":
          event.preventDefault();
          toggleTimer();
          break;
        case "KeyR":
          resetTimer();
          break;
        case "KeyS":
          skipSession();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [resetTimer, skipSession, toggleTimer]);
};
