"use client";

import { useCallback, useEffect, useReducer } from "react";
import { COMPLETION_SOUND_URL } from "~/constants/pomodoro";
import type { PomodoroSettings, SessionType } from "~/types/pomodoro";
import { formatSecondsToClock, getNextSession } from "~/utils/pomodoro";

const getSessionDurationSeconds = (
  sessionType: SessionType,
  settings: PomodoroSettings
) => {
  if (sessionType === "focus") return settings.focusMinutes * 60;
  if (sessionType === "short_break") return settings.shortBreakMinutes * 60;

  return settings.longBreakMinutes * 60;
};

const DEFAULT_SETTINGS: PomodoroSettings = {
  focusMinutes: 25,
  shortBreakMinutes: 5,
  longBreakMinutes: 15,
  notificationsEnabled: true,
  soundEnabled: true
};

type TimerState = {
  settings: PomodoroSettings;
  sessionType: SessionType;
  isRunning: boolean;
  timeLeft: number;
  sessionsCompleted: number;
  shouldPlayCompletionSound: boolean;
  pendingNotification: {
    title: string;
    body: string;
  } | null;
};

type TimerAction =
  | { type: "sync-settings"; payload: PomodoroSettings }
  | { type: "set-session-type"; payload: SessionType }
  | { type: "toggle-timer" }
  | { type: "reset-timer" }
  | { type: "skip-session" }
  | { type: "tick" }
  | { type: "ack-completion-sound" }
  | { type: "ack-notification" };

const initialState: TimerState = {
  settings: DEFAULT_SETTINGS,
  sessionType: "focus",
  isRunning: false,
  timeLeft: getSessionDurationSeconds("focus", DEFAULT_SETTINGS),
  sessionsCompleted: 0,
  shouldPlayCompletionSound: false,
  pendingNotification: null
};

const getCompletionNotificationBody = (sessionType: SessionType) => {
  if (sessionType === "focus") {
    return "Focus session complete! Time for a break.";
  }

  return "Break over! Ready to focus?";
};

const getNextSessionState = (
  settings: PomodoroSettings,
  sessionType: SessionType,
  sessionsCompleted: number
) => {
  const { nextSessionType, nextSessionsCompleted } = getNextSession(
    sessionType,
    sessionsCompleted
  );

  return {
    sessionType: nextSessionType,
    isRunning: false,
    timeLeft: getSessionDurationSeconds(nextSessionType, settings),
    sessionsCompleted: nextSessionsCompleted
  };
};

const timerReducer = (state: TimerState, action: TimerAction): TimerState => {
  switch (action.type) {
    case "sync-settings":
      return {
        ...state,
        settings: action.payload,
        timeLeft: state.isRunning
          ? state.timeLeft
          : getSessionDurationSeconds(state.sessionType, action.payload)
      };

    case "set-session-type":
      return {
        ...state,
        sessionType: action.payload,
        isRunning: false,
        timeLeft: getSessionDurationSeconds(action.payload, state.settings)
      };

    case "toggle-timer":
      return {
        ...state,
        isRunning: !state.isRunning
      };

    case "reset-timer":
      return {
        ...state,
        isRunning: false,
        timeLeft: getSessionDurationSeconds(state.sessionType, state.settings)
      };

    case "skip-session": {
      return {
        ...state,
        ...getNextSessionState(
          state.settings,
          state.sessionType,
          state.sessionsCompleted
        )
      };
    }

    case "tick": {
      if (!state.isRunning) return state;

      if (state.timeLeft > 1) {
        return {
          ...state,
          timeLeft: state.timeLeft - 1
        };
      }

      return {
        ...state,
        ...getNextSessionState(
          state.settings,
          state.sessionType,
          state.sessionsCompleted
        ),
        shouldPlayCompletionSound: state.settings.soundEnabled,
        pendingNotification: {
          title: "FocusZen",
          body: getCompletionNotificationBody(state.sessionType)
        }
      };
    }

    case "ack-completion-sound":
      return {
        ...state,
        shouldPlayCompletionSound: false
      };

    case "ack-notification":
      return {
        ...state,
        pendingNotification: null
      };

    default:
      return state;
  }
};

type UsePomodoroTimerOptions = {
  settings?: PomodoroSettings;
};

export const usePomodoroTimer = ({
  settings = DEFAULT_SETTINGS
}: UsePomodoroTimerOptions = {}) => {
  const [state, dispatch] = useReducer(timerReducer, initialState);
  const {
    focusMinutes,
    shortBreakMinutes,
    longBreakMinutes,
    notificationsEnabled,
    soundEnabled
  } = settings;

  const setSessionType = useCallback((sessionType: SessionType) => {
    dispatch({ type: "set-session-type", payload: sessionType });
  }, []);

  const toggleTimer = useCallback(() => {
    dispatch({ type: "toggle-timer" });
  }, []);

  const resetTimer = useCallback(() => {
    dispatch({ type: "reset-timer" });
  }, []);

  const skipSession = useCallback(() => {
    dispatch({ type: "skip-session" });
  }, []);

  useEffect(() => {
    dispatch({
      type: "sync-settings",
      payload: {
        focusMinutes,
        shortBreakMinutes,
        longBreakMinutes,
        notificationsEnabled,
        soundEnabled
      }
    });
  }, [
    focusMinutes,
    shortBreakMinutes,
    longBreakMinutes,
    notificationsEnabled,
    soundEnabled
  ]);

  useEffect(() => {
    if (!state.isRunning) return;

    const timerId = window.setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [state.isRunning]);

  useEffect(() => {
    if (!state.shouldPlayCompletionSound) return;

    const audio = new Audio(COMPLETION_SOUND_URL);

    audio.play().catch(() => {});

    dispatch({ type: "ack-completion-sound" });
  }, [state.shouldPlayCompletionSound]);

  useEffect(() => {
    if (!state.settings.notificationsEnabled) return;
    if (!("Notification" in window)) return;
    if (Notification.permission === "default") {
      Notification.requestPermission().catch(() => {});
    }
  }, [state.settings.notificationsEnabled]);

  useEffect(() => {
    if (!state.pendingNotification) return;

    if (
      state.settings.notificationsEnabled &&
      "Notification" in window &&
      Notification.permission === "granted"
    ) {
      new Notification(state.pendingNotification.title, {
        body: state.pendingNotification.body
      });
    }

    dispatch({ type: "ack-notification" });
  }, [state.pendingNotification, state.settings.notificationsEnabled]);

  return {
    sessionType: state.sessionType,
    isRunning: state.isRunning,
    timeDisplay: formatSecondsToClock(state.timeLeft),
    setSessionType,
    toggleTimer,
    resetTimer,
    skipSession
  };
};
