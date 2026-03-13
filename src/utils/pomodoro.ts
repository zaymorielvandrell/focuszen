import { LONG_BREAK_INTERVAL } from "~/constants/pomodoro";
import type { SessionType } from "~/types/pomodoro";

export const getNextSession = (
  sessionType: SessionType,
  sessionsCompleted: number
): {
  nextSessionType: SessionType;
  nextSessionsCompleted: number;
} => {
  if (sessionType !== "focus") {
    return {
      nextSessionType: "focus",
      nextSessionsCompleted: sessionsCompleted
    };
  }

  const nextSessionsCompleted = sessionsCompleted + 1;
  const nextSessionType =
    nextSessionsCompleted % LONG_BREAK_INTERVAL === 0
      ? "long_break"
      : "short_break";

  return {
    nextSessionType,
    nextSessionsCompleted
  };
};

export const formatSecondsToClock = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const remainder = (seconds % 60).toString().padStart(2, "0");

  return `${minutes}:${remainder}`;
};
