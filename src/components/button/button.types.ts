export type ButtonVariant =
  | "default"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "error";

export type ButtonSize = "s" | "m" | "l";

export type ButtonType = "button" | "submit" | "reset";

export interface ButtonState {
  variant: ButtonVariant;
  size: ButtonSize;
  type: ButtonType;
  disabled: boolean;
  loading: boolean;
  loadingLabel: string;
}

export type ButtonTemplateArgs = Partial<ButtonState>;

export interface ButtonStoryArgs extends ButtonTemplateArgs {
  icon?: boolean;
  label?: string;
}
