export type AlertVariant = "info" | "success" | "warning" | "danger";

export interface AlertStoryArgs {
  variant?: AlertVariant;
  heading?: string;
  message?: string;
}
