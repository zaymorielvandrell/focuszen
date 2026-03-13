export const isEditableElement = (target: EventTarget | null) => {
  return target instanceof HTMLInputElement;
};
