export type BadgeVariant =
  | "default"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info";

export interface BadgeState {
  variant: BadgeVariant;
}

export type BadgeTemplateArgs = Partial<BadgeState>;

export interface BadgeStoryArgs extends BadgeTemplateArgs {
  label?: string;
}
