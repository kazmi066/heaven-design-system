import type { Meta, StoryObj } from "@storybook/html";
import "./checkbox-input.js";
import type { HdsCheckboxInput } from "./checkbox-input.js";
import type { CheckboxInputStoryArgs } from "./checkbox-input.types.js";

const checkboxInput = ({
  label = "",
  name = "",
  value = "on",
  ariaLabel = "",
  errorMessage = "",
  checked = false,
  indeterminate = false,
  disabled = false,
  required = false,
}: CheckboxInputStoryArgs): string => `
  <hds-checkbox-input
    label="${label}"
    name="${name}"
    value="${value}"
    ${ariaLabel ? `aria-label="${ariaLabel}"` : ""}
    ${errorMessage ? `error-message="${errorMessage}"` : ""}
    ${checked ? "checked" : ""}
    ${indeterminate ? "indeterminate" : ""}
    ${disabled ? "disabled" : ""}
    ${required ? "required" : ""}
  ></hds-checkbox-input>
`;

const meta = {
  title: "Components/Checkbox Input",
  component: "hds-checkbox-input",
  argTypes: {
    label: { control: "text" },
    name: { control: "text" },
    value: { control: "text" },
    ariaLabel: {
      control: "text",
      description: "Accessible name used when no visible label is provided.",
    },
    errorMessage: {
      control: "text",
      description: "Validation message shown below the checkbox.",
    },
    checked: { control: "boolean" },
    indeterminate: {
      control: "boolean",
      description:
        "Mixed visual state. Set the `indeterminate` property when controlling the component with JavaScript.",
    },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
  },
  parameters: {
    docs: {
      description: {
        component:
          "`hds-checkbox-input` wraps a native checkbox for selection, form submission, required validation, and mixed-state workflows. Use `error-message` or `setCustomValidity()` for consumer-controlled validation feedback.",
      },
    },
  },
} satisfies Meta<CheckboxInputStoryArgs>;

export default meta;
type Story = StoryObj<CheckboxInputStoryArgs>;

export const Playground: Story = {
  args: {
    label: "Send me product updates",
    name: "productUpdates",
    value: "yes",
    ariaLabel: "",
    errorMessage: "",
    checked: false,
    indeterminate: false,
    disabled: false,
    required: false,
  },
  render: checkboxInput,
};

export const States: Story = {
  render: () => `
    <div style="display: grid; gap: 0.75rem; min-width: 18rem;">
      <hds-checkbox-input label="Unchecked"></hds-checkbox-input>
      <hds-checkbox-input label="Checked" checked></hds-checkbox-input>
      <hds-checkbox-input label="Partially selected" indeterminate></hds-checkbox-input>
      <hds-checkbox-input label="Disabled" disabled></hds-checkbox-input>
      <hds-checkbox-input label="Disabled and checked" checked disabled></hds-checkbox-input>
      <hds-checkbox-input label="Required agreement" required error-message="You must accept before continuing."></hds-checkbox-input>
    </div>
  `,
};

const indeterminateExample = (): HTMLElement => {
  const example = document.createElement("div");

  example.style.display = "grid";
  example.style.gap = "var(--hds-space-sm)";
  example.style.justifyItems = "start";
  example.innerHTML = `
    <hds-checkbox-input
      label="Select all notifications"
      name="notifications"
      value="all"
    ></hds-checkbox-input>
    <button type="button">Toggle mixed state</button>
  `;

  const checkbox = example.querySelector<HdsCheckboxInput>(
    "hds-checkbox-input",
  );
  const button = example.querySelector<HTMLButtonElement>("button");

  if (!checkbox || !button) {
    throw new Error("Indeterminate checkbox story is unavailable.");
  }

  checkbox.indeterminate = true;
  button.addEventListener("click", () => {
    checkbox.indeterminate = !checkbox.indeterminate;
  });

  return example;
};

export const Indeterminate: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "The mixed state is available through the `indeterminate` property for parent/child selection controls. User interaction clears it, matching native checkbox behavior.",
      },
    },
  },
  render: indeterminateExample,
};

export const InHeading: Story = {
  name: "In a Heading",
  parameters: {
    docs: {
      description: {
        story:
          "The label inherits its surrounding type styles, so no heading-specific component variant is needed.",
      },
    },
  },
  render: () => `
    <h2 style="margin: 0; color: var(--hds-color-text); font-family: var(--hds-font-family); font-size: var(--hds-font-size-2xl); line-height: var(--hds-line-height-tight);">
      <hds-checkbox-input label="Include archived projects"></hds-checkbox-input>
    </h2>
  `,
};

const validationExample = (): HTMLFormElement => {
  const form = document.createElement("form");

  form.noValidate = true;
  form.style.display = "grid";
  form.style.gap = "var(--hds-space-sm)";
  form.style.justifyItems = "start";
  form.innerHTML = `
    <hds-checkbox-input
      label="I agree to the terms"
      name="terms"
      value="accepted"
      required
    ></hds-checkbox-input>
    <button type="submit">Continue</button>
    <p data-status role="status" style="margin: 0; color: var(--hds-color-success);" hidden></p>
  `;

  const checkbox = form.querySelector<HdsCheckboxInput>("hds-checkbox-input");
  const status = form.querySelector<HTMLElement>("[data-status]");

  if (!checkbox || !status) {
    throw new Error("Checkbox validation story is unavailable.");
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    checkbox.errorMessage = "";

    if (checkbox.validity.valueMissing) {
      checkbox.errorMessage = "You must agree before continuing.";
      checkbox.focus();
      status.hidden = true;
      return;
    }

    status.textContent = "Validation passed. The form is ready to submit.";
    status.hidden = false;
  });

  return form;
};

export const SubmitValidation: Story = {
  name: "Submit Validation",
  parameters: {
    docs: {
      description: {
        story:
          "Submit the unchecked required field to reveal an accessible error. The real checkbox remains in the form, so `FormData`, native events, reset, and required validity continue to work.",
      },
    },
  },
  render: validationExample,
};
