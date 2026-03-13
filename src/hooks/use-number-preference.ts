"use client";

import { useEffect, useReducer } from "react";

const clampNumber = (value: number, minimum: number) => {
  if (!Number.isFinite(value)) return minimum;

  return Math.max(minimum, Math.round(value));
};

type UseNumberPreferenceOptions = {
  minimum?: number;
};

type PreferenceState = {
  loaded: boolean;
  value: number;
};

type PreferenceAction =
  | { type: "hydrate"; payload: number }
  | { type: "set"; payload: number };

const preferenceReducer = (
  state: PreferenceState,
  action: PreferenceAction
): PreferenceState => {
  if (action.type === "hydrate") {
    return {
      loaded: true,
      value: action.payload
    };
  }

  return {
    ...state,
    value: action.payload
  };
};

export const useNumberPreference = (
  storageKey: string,
  fallbackValue: number,
  { minimum = 1 }: UseNumberPreferenceOptions = {}
) => {
  const fallback = clampNumber(fallbackValue, minimum);

  const [state, dispatch] = useReducer(preferenceReducer, {
    loaded: false,
    value: fallback
  });

  useEffect(() => {
    const storedValue = window.localStorage.getItem(storageKey);
    const parsedValue = storedValue === null ? fallback : Number(storedValue);

    dispatch({
      type: "hydrate",
      payload: clampNumber(parsedValue, minimum)
    });
  }, [fallback, minimum, storageKey]);

  useEffect(() => {
    if (!state.loaded) return;

    window.localStorage.setItem(storageKey, String(state.value));
  }, [state.loaded, state.value, storageKey]);

  return {
    value: state.value,
    setValue: (nextValue: number) => {
      dispatch({ type: "set", payload: clampNumber(nextValue, minimum) });
    }
  };
};
