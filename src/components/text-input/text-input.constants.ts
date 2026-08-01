import type { TextInputType } from "./text-input.types.js";

export const TEXT_INPUT_TYPES = [
  "text",
  "email",
  "password",
  "search",
  "tel",
  "url",
] as const satisfies readonly TextInputType[];
