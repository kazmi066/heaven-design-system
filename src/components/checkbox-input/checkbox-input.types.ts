export interface CheckboxInputState {
  label: string;
  name: string;
  value: string;
  ariaLabel: string;
  errorMessage: string;
  checked: boolean;
  indeterminate: boolean;
  disabled: boolean;
  required: boolean;
}

export interface CheckboxInputTemplateIds {
  controlId: string;
  labelId: string;
  errorId: string;
}

export type CheckboxInputTemplateArgs = Partial<CheckboxInputState> &
  Partial<CheckboxInputTemplateIds>;

export type CheckboxInputStoryArgs = Partial<CheckboxInputState>;
