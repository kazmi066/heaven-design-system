import type {
  TextInputState,
  TextInputTemplateArgs,
} from "./text-input.types.js";

export const css = (): string => `
  <style>
    :host {
      display: block;
    }

    :host([hidden]) {
      display: none;
    }

    .hds-text-input {
      display: grid;
      gap: var(--hds-space-2xs);
      font-family: var(--hds-font-family);
    }

    .hds-text-input__label {
      color: var(--hds-color-text);
      font-size: var(--hds-font-size-sm);
      font-weight: var(--hds-font-weight-medium);
      line-height: var(--hds-line-height-tight);
    }

    .hds-text-input__control {
      box-sizing: border-box;
      width: 100%;
      min-width: 0;
      border: 1px var(--hds-border-style-solid) var(--hds-color-border);
      border-radius: var(--hds-radius-sm);
      padding: 0.625rem 0.75rem;
      background: var(--hds-color-surface);
      color: var(--hds-color-text);
      font: inherit;
      line-height: var(--hds-line-height-normal);
      outline: none;
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

      &:read-only {
        background: var(--hds-color-surface-active);
      }

      &:disabled {
        background: var(--hds-color-surface-hover);
        color: var(--hds-color-text-weaker);
        cursor: not-allowed;
        opacity: 0.65;
      }
    }

    .hds-text-input__error {
      margin: 0;
      color: var(--hds-color-danger);
      font-size: var(--hds-font-size-sm);
      line-height: var(--hds-line-height-normal);
    }

    .hds-text-input__error[hidden] {
      display: none;
    }

    @media (prefers-reduced-motion: reduce) {
      .hds-text-input__control {
        transition-duration: var(--hds-duration-instant);
      }
    }
  </style>
`;

const attribute = (name: string, value: string): string =>
  value ? `${name}="${value}"` : "";

export const html = ({
  label = "",
  type = "text",
  name = "",
  placeholder = "",
  autocomplete = "",
  value = "",
  ariaLabel = "",
  errorMessage = "",
  disabled = false,
  readonly = false,
  required = false,
  controlId = "hds-text-input-control",
  errorId = "hds-text-input-error",
}: TextInputTemplateArgs = {}): string => `
  <div class="hds-text-input">
    <label
      class="hds-text-input__label"
      for="${controlId}"
      data-label
      ${label ? "" : "hidden"}
    >
      ${label}
    </label>
    <input
      class="hds-text-input__control"
      id="${controlId}"
      type="${type}"
      ${attribute("name", name)}
      ${attribute("placeholder", placeholder)}
      ${attribute("autocomplete", autocomplete)}
      ${attribute("value", value)}
      ${attribute("aria-label", ariaLabel)}
      ${disabled ? "disabled" : ""}
      ${readonly ? "readonly" : ""}
      ${required ? "required" : ""}
    />
    <p
      class="hds-text-input__error"
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
  render(args: TextInputTemplateArgs = {}): string {
    return `
      ${css()}
      ${html(args)}
    `;
  },

  update(root: ShadowRoot, state: TextInputState): void {
    const label = root.querySelector<HTMLLabelElement>("[data-label]");
    const input = root.querySelector<HTMLInputElement>(
      ".hds-text-input__control",
    );
    const error = root.querySelector<HTMLElement>("[data-error]");

    if (!label || !input || !error) {
      throw new Error("Text input template is missing required elements.");
    }

    label.textContent = state.label;
    label.hidden = !state.label;

    input.type = state.type;
    input.disabled = state.disabled;
    input.readOnly = state.readonly;
    input.required = state.required;

    setStringAttribute(input, "name", state.name);
    setStringAttribute(input, "placeholder", state.placeholder);
    setStringAttribute(input, "autocomplete", state.autocomplete);
    setStringAttribute(input, "aria-label", state.ariaLabel);

    const hasError = Boolean(state.errorMessage);

    error.textContent = state.errorMessage;
    error.hidden = !hasError;
    input.setCustomValidity(state.errorMessage);

    if (hasError) {
      input.setAttribute("aria-invalid", "true");
      input.setAttribute("aria-describedby", error.id);
    } else {
      input.removeAttribute("aria-invalid");
      input.removeAttribute("aria-describedby");
    }

    if (input.value !== state.value) {
      input.value = state.value;
    }
  },
};

export default Template;
