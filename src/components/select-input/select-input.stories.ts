import type { Meta, StoryObj } from "@storybook/html";
import "./select-input.js";
import type { HdsSelectInput } from "./select-input.js";
import type { SelectInputStoryArgs } from "./select-input.types.js";

const selectInput = ({
  label = "",
  name = "",
  placeholder = "",
  value = "",
  errorMessage = "",
  options = [],
  disabled = false,
  required = false,
}: SelectInputStoryArgs): string => `
  <hds-select-input
    label="${label}"
    name="${name}"
    placeholder="${placeholder}"
    value="${value}"
    ${errorMessage ? `error-message="${errorMessage}"` : ""}
    ${disabled ? "disabled" : ""}
    ${required ? "required" : ""}
  >
    ${options
      .map(
        (option) =>
          `<option value="${option.value}"${
            option.disabled ? " disabled" : ""
          }>${option.label}</option>`,
      )
      .join("")}
  </hds-select-input>
`;

const meta = {
  title: "Components/Select Input",
  component: "hds-select-input",
  argTypes: {
    label: { control: "text" },
    name: { control: "text" },
    placeholder: {
      control: "text",
      description: "Text of the first, selected-by-default empty option.",
    },
    value: { control: "text" },
    options: { control: "object" },
    errorMessage: {
      control: "text",
      description: "Validation message shown below the select.",
    },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
  },
  parameters: {
    docs: {
      description: {
        component:
          "`hds-select-input` is a native `select` element with an accessible label, chevron affordance, and validation error region.",
      },
    },
  },
} satisfies Meta<SelectInputStoryArgs>;

export default meta;
type Story = StoryObj<SelectInputStoryArgs>;

export const Playground: Story = {
  args: {
    label: "Framework",
    name: "framework",
    placeholder: "Select a framework",
    value: "",
    options: [
      { value: "react", label: "React" },
      { value: "vue", label: "Vue" },
      { value: "svelte", label: "Svelte" },
      { value: "solid", label: "Solid" },
      { value: "angular", label: "Angular", disabled: true },
    ],
    errorMessage: "",
    disabled: false,
    required: false,
  },
  render: selectInput,
};

export const States: Story = {
  render: () => `
    <div style="display: grid; gap: 1rem; width: min(22rem, 80vw);">
      <hds-select-input label="Default" placeholder="Select an option">
        <option value="one">One</option>
        <option value="two">Two</option>
        <option value="three">Three</option>
      </hds-select-input>
      <hds-select-input label="Required" placeholder="Required selection" required>
        <option value="one">One</option>
        <option value="two">Two</option>
      </hds-select-input>
      <hds-select-input
        label="Invalid"
        value="one"
        error-message="Pick a different option"
      >
        <option value="one">One</option>
        <option value="two">Two</option>
      </hds-select-input>
      <hds-select-input label="Disabled" placeholder="Unavailable" disabled>
        <option value="one">One</option>
        <option value="two">Two</option>
      </hds-select-input>
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
      Submit the empty form, then inspect the component's Shadow Root to see
      its unique IDs and ARIA relationships update.
    </p>

    <hds-select-input
      label="Framework"
      name="framework"
      placeholder="Select a framework"
      required
    >
      <option value="react">React</option>
      <option value="vue">Vue</option>
      <option value="svelte">Svelte</option>
    </hds-select-input>

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

  const field = form.querySelector<HdsSelectInput>("hds-select-input");
  const status = form.querySelector<HTMLElement>("[data-form-status]");

  if (!field || !status) {
    throw new Error("Validation story status element is unavailable.");
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    field.errorMessage = "";

    if (field.validity.valueMissing) {
      field.errorMessage = "Please select a framework.";
    }

    status.hidden = false;

    if (!field.checkValidity()) {
      status.dataset.state = "error";
      status.textContent = "Please correct the highlighted field.";
      field.focus();
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
          "Submit the form to reveal an accessible error. Inspect the `hds-select-input` Shadow Root to observe its unique label, select, error ID, `aria-invalid`, and `aria-describedby` values.",
      },
    },
  },
  render: validationExample,
};
