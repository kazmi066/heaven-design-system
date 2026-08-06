import type { Meta, StoryObj } from "@storybook/html";
import "./radio-input.js";
import type { RadioInputStoryArgs } from "./radio-input.types.js";

const radioInput = ({
  label = "",
  name = "",
  value = "on",
  ariaLabel = "",
  checked = false,
  disabled = false,
}: RadioInputStoryArgs): string => `
  <hds-radio-input
    label="${label}"
    name="${name}"
    value="${value}"
    ${ariaLabel ? `aria-label="${ariaLabel}"` : ""}
    ${checked ? "checked" : ""}
    ${disabled ? "disabled" : ""}
  ></hds-radio-input>
`;

const meta = {
  title: "Components/Radio Input",
  component: "hds-radio-input",
  argTypes: {
    label: { control: "text" },
    name: { control: "text" },
    value: { control: "text" },
    ariaLabel: {
      control: "text",
      description: "Accessible name used when no visible label is provided.",
    },
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  parameters: {
    docs: {
      description: {
        component:
          "`hds-radio-input` lets someone choose one option from a named set. Give every option the same `name`, a distinct `value`, and mark the first option as `checked` so the group always starts with a selection.",
      },
    },
  },
} satisfies Meta<RadioInputStoryArgs>;

export default meta;
type Story = StoryObj<RadioInputStoryArgs>;

export const Playground: Story = {
  args: {
    label: "Standard delivery",
    name: "delivery",
    value: "standard",
    ariaLabel: "",
    checked: true,
    disabled: false,
  },
  render: radioInput,
};

export const Group: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "The first option starts checked. The native inputs remain in the outer form, so the browser handles same-name grouping, keyboard interaction, and submitted values.",
      },
    },
  },
  render: () => `
    <form>
      <fieldset style="display: grid; gap: 0.75rem; min-width: 18rem; border: 0; padding: 0; color: var(--hds-color-text); font-family: var(--hds-font-family);">
        <legend style="margin-bottom: 0.75rem; font-weight: var(--hds-font-weight-semibold);">
          Delivery speed
        </legend>
        <hds-radio-input
          label="Standard, 3 to 5 days"
          name="delivery"
          value="standard"
          checked
        ></hds-radio-input>
        <hds-radio-input
          label="Express, next day"
          name="delivery"
          value="express"
        ></hds-radio-input>
        <hds-radio-input
          label="Pickup, today"
          name="delivery"
          value="pickup"
        ></hds-radio-input>
      </fieldset>
    </form>
  `,
};

export const States: Story = {
  render: () => `
    <div style="display: grid; gap: 0.75rem; min-width: 14rem;">
      <hds-radio-input label="Selected" name="default-state" checked></hds-radio-input>
      <hds-radio-input label="Not selected" name="default-state"></hds-radio-input>
      <hds-radio-input label="Disabled and selected" name="disabled-state" checked disabled></hds-radio-input>
      <hds-radio-input label="Disabled" name="disabled-state" disabled></hds-radio-input>
    </div>
  `,
};
