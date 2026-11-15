export type BadgeVariant =
  "default" | "secondary" | "success" | "danger" | "warning" | "info";

export interface BadgeStoryArgs {
  variant?: BadgeVariant;
  label?: string;
}
