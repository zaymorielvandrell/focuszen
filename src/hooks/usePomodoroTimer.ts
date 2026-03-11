"use client";

import { useEffect, useReducer } from "react";
import { COMPLETION_SOUND_URL } from "~/constants/pomodoro";
import type { SessionType } from "~/types/pomodoro";
import {
  formatSecondsToClock,
  getNextSession,
  getSessionDurationSeconds
} from "~/utils/pomodoro";

type TimerState = {
  sessionType: SessionType;
  isRunning: boolean;
  timeLeft: number;
  sessionsCompleted: number;
  shouldPlayCompletionSound: boolean;
};

type TimerAction =
  | { type: "set-session-type"; payload: SessionType }
  | { type: "toggle-timer" }
  | { type: "reset-timer" }
  | { type: "skip-session" }
  | { type: "tick" }
  | { type: "ack-completion-sound" };

const initialState: TimerState = {
  sessionType: "focus",
  isRunning: false,
  timeLeft: getSessionDurationSeconds("focus"),
  sessionsCompleted: 0,
  shouldPlayCompletionSound: false
};

const timerReducer = (state: TimerState, action: TimerAction): TimerState => {
  switch (action.type) {
    case "set-session-type":
      return {
        ...state,
        sessionType: action.payload,
        isRunning: false,
        timeLeft: getSessionDurationSeconds(action.payload)
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
        timeLeft: getSessionDurationSeconds(state.sessionType)
      };

    case "skip-session": {
      const { nextSessionType, nextSessionsCompleted } = getNextSession(
        state.sessionType,
        state.sessionsCompleted
      );

      return {
        ...state,
        sessionType: nextSessionType,
        isRunning: false,
        timeLeft: getSessionDurationSeconds(nextSessionType),
        sessionsCompleted: nextSessionsCompleted
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

      const { nextSessionType, nextSessionsCompleted } = getNextSession(
        state.sessionType,
        state.sessionsCompleted
      );

      return {
        ...state,
        sessionType: nextSessionType,
        isRunning: false,
        timeLeft: getSessionDurationSeconds(nextSessionType),
        sessionsCompleted: nextSessionsCompleted,
        shouldPlayCompletionSound: true
      };
    }

    case "ack-completion-sound":
      return {
        ...state,
        shouldPlayCompletionSound: false
      };

    default:
      return state;
  }
};

export const usePomodoroTimer = () => {
  const [state, dispatch] = useReducer(timerReducer, initialState);

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

  return {
    isRunning: state.isRunning,
    timeDisplay: formatSecondsToClock(state.timeLeft),
    setSessionType: (sessionType: SessionType) => {
      dispatch({ type: "set-session-type", payload: sessionType });
    },
    toggleTimer: () => {
      dispatch({ type: "toggle-timer" });
    },
    resetTimer: () => {
      dispatch({ type: "reset-timer" });
    },
    skipSession: () => {
      dispatch({ type: "skip-session" });
    }
  };
};
