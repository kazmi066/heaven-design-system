export type TabsVariant = "underline" | "pills";

export interface TabsChangeDetail {
  index: number;
  tab: HTMLButtonElement;
  panel: HTMLElement | null;
}

export interface TabsStoryItem {
  label: string;
  content: string;
  disabled?: boolean;
}

export interface TabsStoryArgs {
  variant?: TabsVariant;
  label?: string;
  selected?: number;
  items?: TabsStoryItem[];
}
