"use client";

import {
  BellIcon,
  RefreshCwIcon,
  SettingsIcon,
  Volume2Icon
} from "lucide-react";
import { useRef } from "react";
import { SESSION_MINUTES } from "~/constants/pomodoro";
import { usePomodoroSettings } from "~/hooks/use-pomodoro-settings";

const Settings = () => {
  const restoreDefaultsModalRef = useRef<HTMLDialogElement>(null);
  const {
    focusMinutes,
    shortBreakMinutes,
    longBreakMinutes,
    notificationsEnabled,
    soundEnabled
  } = usePomodoroSettings();

  const durationFields: Array<{
    label: string;
    value: number;
    setValue: (value: number) => void;
  }> = [
    {
      label: "Focus",
      value: focusMinutes.value,
      setValue: focusMinutes.setValue
    },
    {
      label: "Short",
      value: shortBreakMinutes.value,
      setValue: shortBreakMinutes.setValue
    },
    {
      label: "Long",
      value: longBreakMinutes.value,
      setValue: longBreakMinutes.setValue
    }
  ];

  const toggleFields: Array<{
    icon: typeof BellIcon;
    label: string;
    checked: boolean;
    onChange: () => void;
  }> = [
    {
      icon: BellIcon,
      label: "Notifications",
      checked: notificationsEnabled.value,
      onChange: notificationsEnabled.toggle
    },
    {
      icon: Volume2Icon,
      label: "Sound",
      checked: soundEnabled.value,
      onChange: soundEnabled.toggle
    }
  ];

  const handleOpenRestoreDefaultsModal = () => {
    restoreDefaultsModalRef.current?.showModal();
  };

  const handleRestoreDefaults = () => {
    focusMinutes.setValue(SESSION_MINUTES.focus);
    shortBreakMinutes.setValue(SESSION_MINUTES.short_break);
    longBreakMinutes.setValue(SESSION_MINUTES.long_break);
    notificationsEnabled.setValue(true);
    soundEnabled.setValue(true);
    restoreDefaultsModalRef.current?.close();
  };

  return (
    <div>
      <div className="fz-surface-glow fz-surface-glow--top-right card mx-auto max-w-xl shadow">
        <div className="card-body">
          <div className="flex items-center gap-2">
            <SettingsIcon />
            <h2 className="text-lg font-semibold sm:text-xl md:text-2xl">
              Settings
            </h2>
          </div>
          <div className="divider opacity-40"></div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {durationFields.map(({ label, value, setValue }) => (
              <fieldset key={label} className="fieldset">
                <legend className="fieldset-legend">{label}</legend>
                <input
                  type="number"
                  min={1}
                  className="input"
                  value={value}
                  onChange={(event) => setValue(Number(event.target.value))}
                />
              </fieldset>
            ))}
          </div>
          <div className="divider opacity-40"></div>
          <div className="flex flex-col gap-4">
            {toggleFields.map(({ icon: Icon, label, checked, onChange }) => (
              <div
                key={label}
                className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="flex size-8 items-center justify-center rounded-box bg-base-200">
                    <Icon />
                  </div>
                  <p>{label}</p>
                </div>
                <div>
                  <input
                    type="checkbox"
                    className="toggle"
                    checked={checked}
                    onChange={onChange}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="divider opacity-40"></div>
          <div className="card-actions">
            <button
              type="button"
              className="btn btn-block btn-error"
              onClick={handleOpenRestoreDefaultsModal}>
              <RefreshCwIcon />
              Restore Defaults
            </button>
          </div>
        </div>
      </div>
      <dialog ref={restoreDefaultsModalRef} className="modal">
        <div className="modal-box">
          <h3 className="text-base font-semibold sm:text-lg md:text-xl">
            Restore Default Settings?
          </h3>
          <p className="my-4">
            This will restore focus, short break, long break, notification, and
            sound preferences to their default values.
          </p>
          <div className="modal-action">
            <form method="dialog">
              <button type="submit" className="btn">
                Cancel
              </button>
            </form>
            <button
              type="button"
              className="btn btn-error"
              onClick={handleRestoreDefaults}>
              Restore Defaults
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Settings;
