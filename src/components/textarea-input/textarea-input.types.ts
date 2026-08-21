export interface TextareaInputState {
  label: string;
  name: string;
  placeholder: string;
  value: string;
  ariaLabel: string;
  errorMessage: string;
  rows: number;
  readonly: boolean;
  disabled: boolean;
  required: boolean;
}

export interface TextareaInputTemplateIds {
  controlId: string;
  labelId: string;
  errorId: string;
}

export type TextareaInputTemplateArgs = Partial<TextareaInputState> &
  Partial<TextareaInputTemplateIds>;

export type TextareaInputStoryArgs = Partial<TextareaInputState>;
