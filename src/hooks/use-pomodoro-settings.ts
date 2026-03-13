"use client";

import {
  FOCUS_MINUTES_STORAGE_KEY,
  LONG_BREAK_MINUTES_STORAGE_KEY,
  NOTIFICATIONS_STORAGE_KEY,
  SESSION_MINUTES,
  SHORT_BREAK_MINUTES_STORAGE_KEY,
  SOUND_STORAGE_KEY
} from "~/constants/pomodoro";
import { useBooleanPreference } from "~/hooks/use-boolean-preference";
import { useNumberPreference } from "~/hooks/use-number-preference";

export const usePomodoroSettings = () => {
  const focusMinutes = useNumberPreference(
    FOCUS_MINUTES_STORAGE_KEY,
    SESSION_MINUTES.focus
  );
  const shortBreakMinutes = useNumberPreference(
    SHORT_BREAK_MINUTES_STORAGE_KEY,
    SESSION_MINUTES.short_break
  );
  const longBreakMinutes = useNumberPreference(
    LONG_BREAK_MINUTES_STORAGE_KEY,
    SESSION_MINUTES.long_break
  );
  const notificationsEnabled = useBooleanPreference(
    NOTIFICATIONS_STORAGE_KEY,
    true
  );
  const soundEnabled = useBooleanPreference(SOUND_STORAGE_KEY, true);

  return {
    focusMinutes,
    shortBreakMinutes,
    longBreakMinutes,
    notificationsEnabled,
    soundEnabled
  };
};
