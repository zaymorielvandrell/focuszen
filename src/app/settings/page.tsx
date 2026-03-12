"use client";

import {
  BellIcon,
  RefreshCwIcon,
  SettingsIcon,
  Volume2Icon
} from "lucide-react";
import { usePomodoroSettings } from "~/hooks/use-pomodoro-settings";

const Settings = () => {
  const {
    focusMinutes,
    shortBreakMinutes,
    longBreakMinutes,
    notificationsEnabled,
    soundEnabled
  } = usePomodoroSettings();

  return (
    <div className="card mx-auto w-full max-w-xl bg-base-100 shadow-sm">
      <div className="card-body">
        <div className="flex items-center gap-2">
          <SettingsIcon />
          <h2 className="text-lg font-semibold">Settings</h2>
        </div>
        <div className="divider opacity-40"></div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Focus</legend>
            <input
              type="number"
              min={1}
              className="input"
              value={focusMinutes.value}
              onChange={(event) => {
                focusMinutes.setValue(Number(event.target.value));
              }}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Short</legend>
            <input
              type="number"
              min={1}
              className="input"
              value={shortBreakMinutes.value}
              onChange={(event) => {
                shortBreakMinutes.setValue(Number(event.target.value));
              }}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Long</legend>
            <input
              type="number"
              min={1}
              className="input"
              value={longBreakMinutes.value}
              onChange={(event) => {
                longBreakMinutes.setValue(Number(event.target.value));
              }}
            />
          </fieldset>
        </div>
        <div className="divider opacity-40"></div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-box bg-base-200">
                <BellIcon />
              </div>
              <p>Notifications</p>
            </div>
            <div>
              <input
                type="checkbox"
                className="toggle"
                checked={notificationsEnabled.value}
                onChange={notificationsEnabled.toggle}
              />
            </div>
          </div>
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-box bg-base-200">
                <Volume2Icon />
              </div>
              <p>Sound</p>
            </div>
            <div>
              <input
                type="checkbox"
                className="toggle"
                checked={soundEnabled.value}
                onChange={soundEnabled.toggle}
              />
            </div>
          </div>
        </div>
        <div className="divider opacity-40"></div>
        <div className="card-actions">
          <button type="button" className="btn btn-block btn-error">
            <RefreshCwIcon />
            Reset Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
