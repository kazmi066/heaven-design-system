import type { BadgeVariant } from "./badge.types.js";

export const BADGE_VARIANTS = [
  "default",
  "secondary",
  "success",
  "danger",
  "warning",
  "info",
] as const satisfies readonly BadgeVariant[];
