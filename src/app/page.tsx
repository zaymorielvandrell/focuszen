"use client";

import {
  PauseIcon,
  PlayIcon,
  RotateCcwIcon,
  SkipForwardIcon
} from "lucide-react";
import { usePomodoroKeyboardShortcuts } from "~/hooks/usePomodoroKeyboardShortcuts";
import { usePomodoroTimer } from "~/hooks/usePomodoroTimer";

const Page = () => {
  const {
    isRunning,
    timeDisplay,
    setSessionType,
    toggleTimer,
    resetTimer,
    skipSession
  } = usePomodoroTimer();

  usePomodoroKeyboardShortcuts({
    toggleTimer,
    resetTimer,
    skipSession
  });

  return (
    <div className="card w-full bg-base-100 shadow-sm card-border">
      <div className="card-body">
        <div className="flex items-center justify-center gap-2">
          <button
            type="button"
            className="btn btn-sm"
            onClick={() => setSessionType("focus")}>
            Focus
          </button>
          <button
            type="button"
            className="btn btn-sm"
            onClick={() => setSessionType("short_break")}>
            Short
          </button>
          <button
            type="button"
            className="btn btn-sm"
            onClick={() => setSessionType("long_break")}>
            Long
          </button>
        </div>
        <p className="py-8 text-center font-mono text-[11rem]">{timeDisplay}</p>
        <div className="card-actions flex-col items-center justify-center gap-8">
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="btn btn-circle btn-ghost btn-lg"
              onClick={resetTimer}>
              <RotateCcwIcon />
              <span className="sr-only">Reset</span>
            </button>
            <button
              type="button"
              className="btn btn-circle btn-xl btn-primary"
              onClick={toggleTimer}>
              {isRunning ? (
                <PauseIcon className="size-6" />
              ) : (
                <PlayIcon className="size-6" />
              )}
              <span className="sr-only">{isRunning ? "Pause" : "Start"}</span>
            </button>
            <button
              type="button"
              className="btn btn-circle btn-ghost btn-lg"
              onClick={skipSession}>
              <SkipForwardIcon />
              <span className="sr-only">Skip</span>
            </button>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-sm font-medium">
              <kbd className="kbd kbd-sm">Space</kbd>{" "}
              {isRunning ? "Pause" : "Start"}
            </p>
            <p className="text-sm font-medium">
              <kbd className="kbd kbd-sm">R</kbd> Reset
            </p>
            <p className="text-sm font-medium">
              <kbd className="kbd kbd-sm">S</kbd> Skip
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
