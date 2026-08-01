import type { Meta, StoryObj } from "@storybook/html";
import "./text-input.js";
import { TEXT_INPUT_TYPES } from "./text-input.constants.js";
import type { TextInputStoryArgs } from "./text-input.types.js";

const textInput = ({
  label = "",
  type = "text",
  name = "",
  placeholder = "",
  autocomplete = "",
  value = "",
  errorMessage = "",
  disabled = false,
  readonly = false,
  required = false,
}: TextInputStoryArgs): string => `
  <hds-text-input
    label="${label}"
    type="${type}"
    name="${name}"
    placeholder="${placeholder}"
    autocomplete="${autocomplete}"
    value="${value}"
    ${errorMessage ? `error-message="${errorMessage}"` : ""}
    ${disabled ? "disabled" : ""}
    ${readonly ? "readonly" : ""}
    ${required ? "required" : ""}
  ></hds-text-input>
`;

const meta = {
  title: "Components/Text Input",
  component: "hds-text-input",
  argTypes: {
    label: { control: "text" },
    type: { control: "select", options: TEXT_INPUT_TYPES },
    name: { control: "text" },
    placeholder: { control: "text" },
    autocomplete: { control: "text" },
    value: { control: "text" },
    errorMessage: {
      control: "text",
      description: "Validation message shown below the input.",
    },
    disabled: { control: "boolean" },
    readonly: { control: "boolean" },
    required: { control: "boolean" },
  },
  parameters: {
    docs: {
      description: {
        component:
          "`hds-text-input` provides a labeled text-entry control with an accessible validation error region.",
      },
    },
  },
} satisfies Meta<TextInputStoryArgs>;

export default meta;
type Story = StoryObj<TextInputStoryArgs>;

export const Playground: Story = {
  args: {
    label: "Email address",
    type: "email",
    name: "email",
    placeholder: "name@example.com",
    autocomplete: "email",
    value: "",
    errorMessage: "",
    disabled: false,
    readonly: false,
    required: false,
  },
  render: textInput,
};

export const States: Story = {
  render: () => `
    <div style="display: grid; gap: 1rem; width: min(22rem, 80vw);">
      <hds-text-input label="Default" placeholder="Enter a value"></hds-text-input>
      <hds-text-input label="Required" placeholder="Required field" required></hds-text-input>
      <hds-text-input label="Invalid Field" value="not-an-email" error-message="Enter a valid email address"></hds-text-input>
      <hds-text-input label="Readonly" value="Read-only value" readonly></hds-text-input>
      <hds-text-input label="Disabled" value="Disabled value" disabled></hds-text-input>
    </div>
  `,
};
