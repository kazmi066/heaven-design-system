import type { Meta, StoryObj } from "@storybook/html";
import "./textarea-input.js";
import type { HdsTextareaInput } from "./textarea-input.js";
import type { TextareaInputStoryArgs } from "./textarea-input.types.js";

const textareaInput = ({
  label = "",
  name = "",
  placeholder = "",
  value = "",
  errorMessage = "",
  rows = 3,
  readonly = false,
  disabled = false,
  required = false,
}: TextareaInputStoryArgs): string => `
  <hds-textarea-input
    label="${label}"
    name="${name}"
    placeholder="${placeholder}"
    value="${value}"
    ${errorMessage ? `error-message="${errorMessage}"` : ""}
    rows="${rows}"
    ${readonly ? "readonly" : ""}
    ${disabled ? "disabled" : ""}
    ${required ? "required" : ""}
  ></hds-textarea-input>
`;

const meta = {
  title: "Components/Textarea Input",
  component: "hds-textarea-input",
  argTypes: {
    label: { control: "text" },
    name: { control: "text" },
    placeholder: { control: "text" },
    value: { control: "text" },
    errorMessage: {
      control: "text",
      description: "Validation message shown below the textarea.",
    },
    rows: {
      control: { type: "number", min: 1, max: 12 },
      table: { defaultValue: { summary: "3" } },
    },
    readonly: { control: "boolean" },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
  },
  parameters: {
    docs: {
      description: {
        component:
          "`hds-textarea-input` provides a labeled multi-line text-entry control with an accessible validation error region.",
      },
    },
  },
} satisfies Meta<TextareaInputStoryArgs>;

export default meta;
type Story = StoryObj<TextareaInputStoryArgs>;

export const Playground: Story = {
  args: {
    label: "Tell us about your project or interest",
    name: "project",
    placeholder: "",
    value: "",
    errorMessage: "",
    rows: 3,
    readonly: false,
    disabled: false,
    required: false,
  },
  render: textareaInput,
};

export const States: Story = {
  render: () => `
    <div style="display: grid; gap: 1rem; width: min(22rem, 80vw);">
      <hds-textarea-input label="Default" placeholder="Enter a message"></hds-textarea-input>
      <hds-textarea-input label="Required" placeholder="Required field" required></hds-textarea-input>
      <hds-textarea-input label="Invalid Field" value="Too short." error-message="Enter at least 10 characters."></hds-textarea-input>
      <hds-textarea-input label="Readonly" value="Read-only value" readonly></hds-textarea-input>
      <hds-textarea-input label="Disabled" value="Disabled value" disabled></hds-textarea-input>
    </div>
  `,
};

const validationExample = (): HTMLFormElement => {
  const form = document.createElement("form");

  form.noValidate = true;
  form.style.display = "grid";
  form.style.gap = "var(--hds-space-sm)";
  form.style.justifyItems = "start";
  form.style.width = "min(22rem, 80vw)";
  form.innerHTML = `
    <hds-textarea-input
      label="Tell us about your project or interest"
      name="project"
      placeholder="Ubuntu"
      required
    ></hds-textarea-input>
    <button type="submit">Submit</button>
    <p data-status role="status" style="margin: 0; color: var(--hds-color-success);" hidden></p>
  `;

  const textarea = form.querySelector<HdsTextareaInput>("hds-textarea-input");
  const status = form.querySelector<HTMLElement>("[data-status]");

  if (!textarea || !status) {
    throw new Error("Textarea validation story is unavailable.");
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    textarea.errorMessage = "";

    if (textarea.validity.valueMissing) {
      textarea.errorMessage = "This field is required.";
      textarea.focus();
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
          "Submit the empty required field to reveal an accessible error. The real textarea remains in the form, so `FormData`, native events, reset, and required validity continue to work.",
      },
    },
  },
  render: validationExample,
};
