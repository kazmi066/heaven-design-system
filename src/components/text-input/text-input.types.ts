export type TextInputType =
  | "text"
  | "email"
  | "password"
  | "search"
  | "tel"
  | "url";

export interface TextInputState {
  label: string;
  type: TextInputType;
  name: string;
  placeholder: string;
  autocomplete: string;
  value: string;
  ariaLabel: string;
  errorMessage: string;
  disabled: boolean;
  readonly: boolean;
  required: boolean;
}

export interface TextInputTemplateIds {
  controlId: string;
  errorId: string;
}

export type TextInputTemplateArgs = Partial<TextInputState> &
  Partial<TextInputTemplateIds>;

export type TextInputStoryArgs = Partial<TextInputState>;
