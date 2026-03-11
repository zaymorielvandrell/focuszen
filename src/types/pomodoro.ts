export type SessionType = "focus" | "short_break" | "long_break";

export type PomodoroSettings = {
  focusMinutes: number;
  shortBreakMinutes: number;
  longBreakMinutes: number;
  notificationsEnabled: boolean;
  soundEnabled: boolean;
};
