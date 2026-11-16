import type { TabsVariant } from "./tabs.types.js";

export const TABS_VARIANTS = [
  "underline",
  "pills",
] as const satisfies readonly TabsVariant[];

export const TABS_CHANGE_EVENT = "hds-tabs-change";
