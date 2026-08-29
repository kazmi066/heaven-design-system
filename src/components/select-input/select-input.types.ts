export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectInputState {
  label: string;
  name: string;
  placeholder: string;
  value: string;
  ariaLabel: string;
  errorMessage: string;
  options: SelectOption[];
  disabled: boolean;
  required: boolean;
}

export interface SelectInputTemplateIds {
  controlId: string;
  errorId: string;
}

export type SelectInputTemplateArgs = Partial<SelectInputState> &
  Partial<SelectInputTemplateIds>;

export type SelectInputStoryArgs = Partial<SelectInputState>;
