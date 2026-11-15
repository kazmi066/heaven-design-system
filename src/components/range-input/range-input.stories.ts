import type { Meta, StoryObj } from "@storybook/html";
import "./range-input.js";
import type { HdsRangeInput } from "./range-input.js";
import type { RangeInputStoryArgs } from "./range-input.types.js";

const rangeInput = ({
  label = "",
  name = "",
  value = "",
  min = "0",
  max = "100",
  step = "1",
  errorMessage = "",
  disabled = false,
}: RangeInputStoryArgs): string => `
  <div style="width: min(22rem, 80vw);">
    <hds-range-input
      label="${label}"
      name="${name}"
      value="${value}"
      min="${min}"
      max="${max}"
      step="${step}"
      ${errorMessage ? `error-message="${errorMessage}"` : ""}
      ${disabled ? "disabled" : ""}
    ></hds-range-input>
  </div>
`;

const meta = {
  title: "Components/Range Input",
  component: "hds-range-input",
  argTypes: {
    label: { control: "text" },
    name: { control: "text" },
    value: { control: "text" },
    min: { control: "text" },
    max: { control: "text" },
    step: { control: "text" },
    errorMessage: {
      control: "text",
      description: "Validation message shown below the slider.",
    },
    disabled: { control: "boolean" },
  },
  parameters: {
    docs: {
      description: {
        component:
          '`hds-range-input` is a native `input type="range"` with an accessible label, live value readout, and validation error region.',
      },
    },
  },
} satisfies Meta<RangeInputStoryArgs>;

export default meta;
type Story = StoryObj<RangeInputStoryArgs>;

export const Playground: Story = {
  args: {
    label: "Volume",
    name: "volume",
    value: "50",
    min: "0",
    max: "100",
    step: "1",
    errorMessage: "",
    disabled: false,
  },
  render: rangeInput,
};

export const States: Story = {
  render: () => `
    <fieldset class="sb-fieldset">
      <legend>States</legend>
      <hds-range-input label="Default" value="40"></hds-range-input>
      <hds-range-input
        label="Invalid"
        value="15"
        error-message="Choose a value of at least 20"
      ></hds-range-input>
      <hds-range-input label="Disabled" value="70" disabled></hds-range-input>
    </fieldset>
  `,
};

export const Bounds: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Pass `min`, `max`, and `step` through to the native control. The readout follows the live value.",
      },
    },
  },
  render: () => `
    <fieldset class="sb-fieldset">
      <legend>Scale</legend>
      <hds-range-input
        label="Opacity"
        name="opacity"
        min="0"
        max="1"
        step="0.1"
        value="0.5"
      ></hds-range-input>
      <hds-range-input
        label="Temperature"
        name="temperature"
        min="-10"
        max="40"
        step="1"
        value="21"
      ></hds-range-input>
    </fieldset>
  `,
};

const validationExample = (): HTMLFormElement => {
  const form = document.createElement("form");

  form.className = "sb-validation-form";
  form.noValidate = true;
  form.setAttribute("aria-labelledby", "range-validation-example-title");
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

    <h2 id="range-validation-example-title">Submit validation example</h2>
    <p class="sb-validation-form__intro">
      Submit with the slider below 20 to reveal an accessible error. Inspect
      the component's Shadow Root to see its unique IDs and ARIA
      relationships update.
    </p>

    <hds-range-input
      label="Volume"
      name="volume"
      min="0"
      max="100"
      step="1"
      value="10"
    ></hds-range-input>

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

  const field = form.querySelector<HdsRangeInput>("hds-range-input");
  const status = form.querySelector<HTMLElement>("[data-form-status]");

  if (!field || !status) {
    throw new Error("Validation story status element is unavailable.");
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    field.errorMessage = "";

    if (Number(field.value) < 20) {
      field.errorMessage = "Volume must be at least 20.";
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
          "Submit the form to reveal an accessible error. Inspect the `hds-range-input` Shadow Root to observe its unique label, input, error ID, `aria-invalid`, and `aria-describedby` values.",
      },
    },
  },
  render: validationExample,
};
