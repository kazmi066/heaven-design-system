import type {
  ButtonSize,
  ButtonType,
  ButtonVariant,
} from "./button.types.js";

export const BUTTON_VARIANTS = [
  "default",
  "secondary",
  "success",
  "danger",
  "warning",
  "info",
  "error",
] as const satisfies readonly ButtonVariant[];

export const BUTTON_SIZES = ["s", "m", "l"] as const satisfies readonly ButtonSize[];

export const BUTTON_TYPES = [
  "button",
  "submit",
  "reset",
] as const satisfies readonly ButtonType[];
