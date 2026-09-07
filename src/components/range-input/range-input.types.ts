export interface RangeInputState {
  label: string;
  name: string;
  value: string;
  min: string;
  max: string;
  step: string;
  ariaLabel: string;
  errorMessage: string;
  disabled: boolean;
}

export interface RangeInputTemplateIds {
  controlId: string;
  errorId: string;
}

export type RangeInputTemplateArgs = Partial<RangeInputState> &
  Partial<RangeInputTemplateIds>;

export type RangeInputStoryArgs = Partial<RangeInputState>;
