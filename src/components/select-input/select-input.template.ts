import type {
  SelectInputState,
  SelectInputTemplateArgs,
} from "./select-input.types.js";

export const css = (): string => `
  <style>
    :host {
      display: block;
    }

    :host([hidden]) {
      display: none;
    }

    .hds-select-input {
      display: grid;
      gap: var(--hds-space-2xs);
      font-family: var(--hds-font-family);
    }

    .hds-select-input__label {
      color: var(--hds-color-text);
      font-size: var(--hds-font-size-sm);
      font-weight: var(--hds-font-weight-medium);
      line-height: var(--hds-line-height-tight);
    }

    .hds-select-input__wrapper {
      position: relative;
      display: block;
    }

    .hds-select-input__control {
      box-sizing: border-box;
      width: 100%;
      min-width: 0;
      appearance: none;
      -webkit-appearance: none;
      border: 1px var(--hds-border-style-solid) var(--hds-color-border);
      border-radius: var(--hds-radius-sm);
      padding: 0.625rem 2.5rem 0.625rem 0.75rem;
      background: var(--hds-color-surface);
      color: var(--hds-color-text);
      font: inherit;
      line-height: var(--hds-line-height-normal);
      outline: none;
      cursor: pointer;
      transition-property: background, border-color, outline-color;
      transition-duration: var(--hds-duration-normal);
      transition-timing-function: var(--hds-ease-out);

      &::placeholder {
        color: var(--hds-color-text-weaker);
      }

      &:hover:not(:disabled) {
        border-color: var(--hds-color-border-hover);
      }

      &:focus-visible {
        border-color: var(--hds-color-accent);
        outline: 2px solid var(--hds-color-accent);
        outline-offset: 2px;
      }

      &[aria-invalid="true"] {
        border-color: var(--hds-color-danger);
      }

      &[aria-invalid="true"]:focus-visible {
        outline-color: var(--hds-color-danger);
      }

      &:disabled {
        background: var(--hds-color-surface-hover);
        color: var(--hds-color-text-weaker);
        cursor: not-allowed;
        opacity: 0.65;
      }
    }

    .hds-select-input__chevron {
      position: absolute;
      top: 50%;
      right: 0.75rem;
      width: 1rem;
      height: 1rem;
      pointer-events: none;
      color: var(--hds-color-text-weak);
      transform: translateY(-50%);
    }

    .hds-select-input__control:disabled ~ .hds-select-input__chevron {
      color: var(--hds-color-text-weaker);
    }

    .hds-select-input__error {
      margin: 0;
      color: var(--hds-color-danger);
      font-size: var(--hds-font-size-sm);
      line-height: var(--hds-line-height-normal);
    }

    .hds-select-input__error[hidden] {
      display: none;
    }

    @media (prefers-reduced-motion: reduce) {
      .hds-select-input__control {
        transition-duration: var(--hds-duration-instant);
      }
    }
  </style>
`;

const attribute = (name: string, value: string): string =>
  value ? `${name}="${value}"` : "";

const optionMarkup = (
  value: string,
  label: string,
  disabled: boolean,
): string =>
  `<option value="${value}" ${disabled ? "disabled" : ""}>${label}</option>`;

export const html = ({
  label = "",
  name = "",
  placeholder = "",
  ariaLabel = "",
  errorMessage = "",
  options = [],
  disabled = false,
  required = false,
  controlId = "hds-select-input-control",
  errorId = "hds-select-input-error",
}: SelectInputTemplateArgs = {}): string => `
  <div class="hds-select-input">
    <label
      class="hds-select-input__label"
      for="${controlId}"
      data-label
      ${label ? "" : "hidden"}
    >
      ${label}
    </label>
    <div class="hds-select-input__wrapper">
      <select
        class="hds-select-input__control"
        id="${controlId}"
        ${attribute("name", name)}
        ${attribute("aria-label", ariaLabel)}
        ${disabled ? "disabled" : ""}
        ${required ? "required" : ""}
      >
        ${placeholder ? `<option value="" hidden>${placeholder}</option>` : ""}
        ${options
          .map((option) =>
            optionMarkup(option.value, option.label, Boolean(option.disabled)),
          )
          .join("")}
      </select>
      <svg
        class="hds-select-input__chevron"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </div>
    <p
      class="hds-select-input__error"
      id="${errorId}"
      data-error
      role="alert"
      ${errorMessage ? "" : "hidden"}
    >
      ${errorMessage}
    </p>
  </div>
`;

const setStringAttribute = (
  element: HTMLElement,
  name: string,
  value: string,
): void => {
  if (value) {
    element.setAttribute(name, value);
  } else {
    element.removeAttribute(name);
  }
};

const Template = {
  render(args: SelectInputTemplateArgs = {}): string {
    return `
      ${css()}
      ${html(args)}
    `;
  },

  update(root: ShadowRoot, state: SelectInputState): void {
    const label = root.querySelector<HTMLLabelElement>("[data-label]");
    const select = root.querySelector<HTMLSelectElement>(
      ".hds-select-input__control",
    );
    const error = root.querySelector<HTMLElement>("[data-error]");

    if (!label || !select || !error) {
      throw new Error("Select input template is missing required elements.");
    }

    label.textContent = state.label;
    label.hidden = !state.label;

    select.disabled = state.disabled;
    select.required = state.required;

    setStringAttribute(select, "name", state.name);
    setStringAttribute(
      select,
      "aria-label",
      state.label ? "" : state.ariaLabel,
    );

    if (state.label) {
      select.setAttribute("aria-labelledby", label.id);
    } else {
      select.removeAttribute("aria-labelledby");
    }

    const hasError = Boolean(state.errorMessage);

    select.setCustomValidity(state.errorMessage);

    if (hasError) {
      error.hidden = false;
      error.textContent = state.errorMessage;
      select.setAttribute("aria-invalid", "true");
      select.setAttribute("aria-describedby", error.id);
    } else {
      error.textContent = "";
      error.hidden = true;
      select.removeAttribute("aria-invalid");
      select.removeAttribute("aria-describedby");
    }

    if (select.value !== state.value) {
      select.value = state.value;
    }
  },
};

export default Template;
