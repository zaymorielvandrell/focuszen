import type { SessionType } from "~/types/pomodoro";

export const SESSION_MINUTES: Record<SessionType, number> = {
  focus: 25,
  short_break: 5,
  long_break: 15
};

export const LONG_BREAK_INTERVAL = 4;

export const COMPLETION_SOUND_URL =
  "https://actions.google.com/sounds/v1/alarms/beep_short.ogg";
