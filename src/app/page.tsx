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
  const {
    focusMinutes,
    shortBreakMinutes,
    longBreakMinutes,
    notificationsEnabled,
    soundEnabled
  } = usePomodoroSettings();

  const {
    sessionType,
    isRunning,
    timeDisplay,
    setSessionType,
    toggleTimer,
    resetTimer,
    skipSession
  } = usePomodoroTimer({
    settings: {
      focusMinutes: focusMinutes.value,
      shortBreakMinutes: shortBreakMinutes.value,
      longBreakMinutes: longBreakMinutes.value,
      notificationsEnabled: notificationsEnabled.value,
      soundEnabled: soundEnabled.value
    }
  });

  usePomodoroKeyboardShortcuts({
    toggleTimer,
    resetTimer,
    skipSession
  });

  return (
    <div>
      <div className="min-h-dvh">
        <div className="fz-surface-glow fz-surface-glow--top-left card shadow">
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
            <p className="my-8 text-center font-mono text-8xl sm:text-9xl md:text-[10rem]">
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
                  <span className="sr-only">
                    {isRunning ? "Pause" : "Start"}
                  </span>
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
      </div>
      <div className="flex flex-col gap-16">
        <div>
          <h1 className="font-serif text-xl font-semibold sm:text-2xl md:text-3xl">
            Online Pomodoro Timer to Get More Done
          </h1>
          <p className="mt-4">
            FocusZen helps you turn scattered work into focused sessions. Start
            in seconds, stay in flow, and finish more without burning out.
          </p>
        </div>
        <div>
          <h2 className="font-serif text-lg font-semibold sm:text-xl md:text-2xl">
            What is FocusZen?
          </h2>
          <p className="mt-4">
            FocusZen is a lightweight Pomodoro timer built for deep work.
            Whether you are studying, writing, or coding, it keeps your day
            structured so you can focus on one priority at a time.
          </p>
        </div>
        <div>
          <h2 className="font-serif text-lg font-semibold sm:text-xl md:text-2xl">
            What is the Pomodoro method?
          </h2>
          <p className="mt-4">
            The Pomodoro method, created by Francesco Cirillo, breaks work into
            focused intervals followed by short breaks. This rhythm helps you
            stay consistent, maintain concentration, and avoid mental fatigue.
          </p>
        </div>
        <div>
          <h2 className="font-serif text-lg font-semibold sm:text-xl md:text-2xl">
            How to use this timer
          </h2>
          <ol className="mt-4 list-decimal space-y-1 pl-6">
            <li>Choose a session mode: Focus, Short Break, or Long Break.</li>
            <li>Press start and commit to one important task.</li>
            <li>Take a short break when the focus session ends.</li>
            <li>Repeat the cycle until your key tasks are complete.</li>
            <li>Adjust durations in Settings to match your ideal pace.</li>
          </ol>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div>
            <h2 className="font-serif text-lg font-semibold sm:text-xl md:text-2xl">
              Current features
            </h2>
            <ul className="mt-4 list-disc space-y-1 pl-6 text-pretty">
              <li>Custom focus, short break, and long break durations.</li>
              <li>Fast session controls: start, pause, reset, and skip.</li>
              <li>Keyboard shortcuts for distraction-free control.</li>
              <li>Optional notifications and sound preferences.</li>
            </ul>
          </div>
          <div>
            <h2 className="font-serif text-lg font-semibold sm:text-xl md:text-2xl">
              Planned upgrades
            </h2>
            <ul className="mt-4 list-disc space-y-1 pl-6 text-pretty">
              <li>Task and project tracking for each timer session.</li>
              <li>Progress reports by day, week, month, and year.</li>
              <li>CSV export and integrations with external tools.</li>
              <li>Even cleaner workflows with fewer distractions.</li>
            </ul>
          </div>
        </div>
        <p className="mt-4">
          Ready to focus? Start your next session now and build momentum one
          Pomodoro at a time.
        </p>
      </div>
    </div>
  );
};

export default Page;
