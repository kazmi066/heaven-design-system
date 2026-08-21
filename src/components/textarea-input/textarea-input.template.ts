import type {
  TextareaInputState,
  TextareaInputTemplateArgs,
} from "./textarea-input.types.js";

export const css = (): string => `
  <style id="hds-textarea-input-styles">
    hds-textarea-input {
      display: block;
    }

    hds-textarea-input[hidden] {
      display: none;
    }

    .hds-textarea-input {
      display: grid;
      gap: var(--hds-space-2xs);
      font-family: var(--hds-font-family);
    }

    .hds-textarea-input__label {
      color: var(--hds-color-text);
      font-size: var(--hds-font-size-sm);
      font-weight: var(--hds-font-weight-medium);
      line-height: var(--hds-line-height-tight);
    }

    .hds-textarea-input__control {
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
      resize: vertical;
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

    .hds-textarea-input__error {
      margin: 0;
      color: var(--hds-color-danger);
      font-size: var(--hds-font-size-sm);
      line-height: var(--hds-line-height-normal);
    }

    .hds-textarea-input__error[hidden] {
      display: none;
    }

    @media (prefers-reduced-motion: reduce) {
      .hds-textarea-input__control {
        transition-duration: var(--hds-duration-instant);
      }
    }
  </style>
`;

const attribute = (name: string, value: string): string =>
  value ? `${name}="${value}"` : "";

export const html = ({
  label = "",
  name = "",
  placeholder = "",
  value = "",
  ariaLabel = "",
  errorMessage = "",
  rows = 3,
  readonly = false,
  disabled = false,
  required = false,
  controlId = "hds-textarea-input-control",
  labelId = "hds-textarea-input-label",
  errorId = "hds-textarea-input-error",
}: TextareaInputTemplateArgs = {}): string => `
  <div class="hds-textarea-input">
    <label
      class="hds-textarea-input__label"
      for="${controlId}"
      data-label
      ${label ? "" : "hidden"}
    >
      ${label}
    </label>
    <textarea
      class="hds-textarea-input__control"
      id="${controlId}"
      rows="${rows}"
      ${attribute("name", name)}
      ${attribute("placeholder", placeholder)}
      ${attribute("aria-label", ariaLabel)}
      ${disabled ? "disabled" : ""}
      ${readonly ? "readonly" : ""}
      ${required ? "required" : ""}
    >${value}</textarea>
    <p
      class="hds-textarea-input__error"
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
  render(args: TextareaInputTemplateArgs = {}): string {
    return html(args);
  },

  update(root: HTMLElement, state: TextareaInputState): void {
    const label = root.querySelector<HTMLLabelElement>("[data-label]");
    const textarea = root.querySelector<HTMLTextAreaElement>(
      ".hds-textarea-input__control",
    );
    const error = root.querySelector<HTMLElement>("[data-error]");

    if (!label || !textarea || !error) {
      throw new Error("Textarea input template is missing required elements.");
    }

    label.textContent = state.label;
    label.hidden = !state.label;

    textarea.rows = state.rows;
    textarea.disabled = state.disabled;
    textarea.readOnly = state.readonly;
    textarea.required = state.required;

    setStringAttribute(textarea, "name", state.name);
    setStringAttribute(textarea, "placeholder", state.placeholder);
    setStringAttribute(textarea, "aria-label", state.label ? "" : state.ariaLabel);

    if (state.label) {
      textarea.setAttribute("aria-labelledby", label.id);
    } else {
      textarea.removeAttribute("aria-labelledby");
    }

    const hasError = Boolean(state.errorMessage);

    textarea.setCustomValidity(state.errorMessage);

    if (hasError) {
      error.hidden = false;
      error.textContent = state.errorMessage;
      textarea.setAttribute("aria-invalid", "true");
      textarea.setAttribute("aria-describedby", error.id);
    } else {
      error.textContent = "";
      error.hidden = true;
      textarea.removeAttribute("aria-invalid");
      textarea.removeAttribute("aria-describedby");
    }

    if (textarea.value !== state.value) {
      textarea.value = state.value;
    }
  },
};

export default Template;
