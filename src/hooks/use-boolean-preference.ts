"use client";

import { useEffect, useReducer } from "react";

type PreferenceState = {
  loaded: boolean;
  value: boolean;
};

type PreferenceAction =
  | { type: "hydrate"; payload: boolean }
  | { type: "set"; payload: boolean }
  | { type: "toggle" };

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

  if (action.type === "set") {
    return {
      ...state,
      value: action.payload
    };
  }

  return {
    ...state,
    value: !state.value
  };
};

export const useBooleanPreference = (
  storageKey: string,
  fallbackValue: boolean
) => {
  const [state, dispatch] = useReducer(preferenceReducer, {
    loaded: false,
    value: fallbackValue
  });

  useEffect(() => {
    const storedValue = window.localStorage.getItem(storageKey);

    dispatch({
      type: "hydrate",
      payload: storedValue === null ? fallbackValue : storedValue === "true"
    });
  }, [storageKey, fallbackValue]);

  useEffect(() => {
    if (!state.loaded) return;

    window.localStorage.setItem(storageKey, String(state.value));
  }, [storageKey, state.loaded, state.value]);

  return {
    value: state.value,
    setValue: (nextValue: boolean) => {
      dispatch({ type: "set", payload: nextValue });
    },
    toggle: () => {
      dispatch({ type: "toggle" });
    }
  };
};
