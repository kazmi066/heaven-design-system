import type { AlertVariant } from "./alert.types.js";

export const ALERT_VARIANTS = [
  "info",
  "success",
  "warning",
  "danger",
] as const satisfies readonly AlertVariant[];
