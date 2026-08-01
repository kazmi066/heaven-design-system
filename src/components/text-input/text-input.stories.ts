import type { Meta, StoryObj } from "@storybook/html";
import "./text-input.js";
import type { HdsTextInput } from "./text-input.js";
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

const validationExample = (): HTMLFormElement => {
  const form = document.createElement("form");

  form.className = "sb-validation-form";
  form.noValidate = true;
  form.setAttribute("aria-labelledby", "validation-example-title");
  form.innerHTML = `
    <style>
      .sb-validation-form {
        display: grid;
        gap: var(--hds-space-sm);
        width: min(30rem, 80vw);
        color: var(--hds-color-text);
        font-family: var(--hds-font-family);
      }

      .sb-validation-form h2,
      .sb-validation-form p {
        margin: 0;
      }

      .sb-validation-form__intro,
      .sb-validation-form__status {
        color: var(--hds-color-text-weak);
        line-height: var(--hds-line-height-normal);
      }

      .sb-validation-form__status[data-state="success"] {
        color: var(--hds-color-success);
      }

      .sb-validation-form__status[data-state="error"] {
        color: var(--hds-color-danger);
      }

      .sb-validation-form__status[hidden] {
        display: none;
      }

      .sb-validation-form__submit {
        justify-self: start;
        border: 1px var(--hds-border-style-solid) var(--hds-color-accent);
        border-radius: var(--hds-radius-sm);
        padding: 0.625rem 1rem;
        background: var(--hds-color-accent);
        color: var(--hds-color-text-on-accent);
        font: inherit;
        cursor: pointer;
      }

      .sb-validation-form__submit:hover {
        filter: brightness(93%);
      }

      .sb-validation-form__submit:focus-visible {
        outline: 2px solid var(--hds-color-accent);
        outline-offset: 2px;
      }
    </style>

    <h2 id="validation-example-title">Submit validation example</h2>
    <p class="sb-validation-form__intro">
      Submit the empty form, then inspect each component's Shadow Root to see
      its unique IDs and ARIA relationships update.
    </p>

    <hds-text-input
      label="Email address"
      type="email"
      name="email"
      placeholder="name@example.com"
      autocomplete="email"
      required
    ></hds-text-input>

    <hds-text-input
      label="Display name"
      type="text"
      name="displayName"
      placeholder="Awais"
      autocomplete="name"
      required
    ></hds-text-input>

    <button class="sb-validation-form__submit" type="submit">
      Validate form
    </button>

    <p
      class="sb-validation-form__status"
      data-form-status
      role="status"
      hidden
    ></p>
  `;

  const fields = Array.from(form.querySelectorAll("hds-text-input"));
  const status = form.querySelector<HTMLElement>("[data-form-status]");

  if (!status) {
    throw new Error("Validation story status element is unavailable.");
  }

  const validateField = (field: HdsTextInput): boolean => {
    field.errorMessage = "";

    if (field.validity.valueMissing) {
      field.errorMessage = "This field is required.";
    } else if (field.validity.typeMismatch) {
      field.errorMessage = "Enter a valid email address.";
    }

    return field.checkValidity();
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const invalidFields = fields.filter((field) => !validateField(field));

    status.hidden = false;

    if (invalidFields.length > 0) {
      status.dataset.state = "error";
      status.textContent = `Please correct ${invalidFields.length} ${
        invalidFields.length === 1 ? "field" : "fields"
      }.`;
      invalidFields[0].focus();
      return;
    }

    status.dataset.state = "success";
    status.textContent = "Validation passed. The form is ready to submit.";
  });

  return form;
};

export const SubmitValidation: Story = {
  name: "Submit Validation",
  parameters: {
    docs: {
      description: {
        story:
          "Submit the form to reveal accessible field errors. Inspect each `hds-text-input` Shadow Root to observe its unique label, input, error ID, `aria-invalid`, and `aria-describedby` values.",
      },
    },
  },
  render: validationExample,
};
