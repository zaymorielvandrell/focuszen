"use client";

import {
  ArmchairIcon,
  BrainIcon,
  CoffeeIcon,
  PauseIcon,
  PlayIcon,
  RotateCcwIcon,
  SkipForwardIcon
} from "lucide-react";
import { usePomodoroKeyboardShortcuts } from "~/hooks/use-pomodoro-keyboard-shortcuts";
import { usePomodoroSettings } from "~/hooks/use-pomodoro-settings";
import { usePomodoroTimer } from "~/hooks/use-pomodoro-timer";
import type { SessionType } from "~/types/pomodoro";

const SESSION_BUTTONS: Array<{
  icon: typeof BrainIcon;
  label: string;
  sessionType: SessionType;
}> = [
  { icon: BrainIcon, label: "Focus", sessionType: "focus" },
  { icon: CoffeeIcon, label: "Short", sessionType: "short_break" },
  { icon: ArmchairIcon, label: "Long", sessionType: "long_break" }
];

const Page = () => {
  const { settings } = usePomodoroSettings();

  const {
    sessionType,
    isRunning,
    timeDisplay,
    setSessionType,
    toggleTimer,
    resetTimer,
    skipSession
  } = usePomodoroTimer({ settings });

  usePomodoroKeyboardShortcuts({
    toggleTimer,
    resetTimer,
    skipSession
  });

  return (
    <div className="card w-full bg-base-100 shadow-sm">
      <div className="card-body">
        <div className="flex items-center justify-center gap-2">
          {SESSION_BUTTONS.map(
            ({ icon: Icon, label, sessionType: buttonType }) => (
              <button
                key={buttonType}
                type="button"
                className={`btn btn-sm ${sessionType === buttonType ? "btn-active" : ""}`}
                onClick={() => setSessionType(buttonType)}>
                <Icon />
                {label}
              </button>
            )
          )}
        </div>
        <p className="py-8 text-center font-mono text-8xl sm:text-9xl md:text-[10rem]">
          {timeDisplay}
        </p>
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
