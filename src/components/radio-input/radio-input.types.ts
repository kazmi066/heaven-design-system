export interface RadioInputState {
  label: string;
  name: string;
  value: string;
  ariaLabel: string;
  checked: boolean;
  disabled: boolean;
}

export interface RadioInputTemplateIds {
  controlId: string;
  labelId: string;
}

export type RadioInputTemplateArgs = Partial<RadioInputState> &
  Partial<RadioInputTemplateIds>;

export type RadioInputStoryArgs = Partial<RadioInputState>;
