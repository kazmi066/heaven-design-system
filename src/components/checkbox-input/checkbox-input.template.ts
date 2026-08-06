import type {
  CheckboxInputState,
  CheckboxInputTemplateArgs,
} from "./checkbox-input.types.js";

export const css = (): string => `
  <style id="hds-checkbox-input-styles">
    hds-checkbox-input {
      display: inline-block;
      vertical-align: top;
    }

    hds-checkbox-input[hidden] {
      display: none;
    }

    .hds-checkbox-input {
      display: grid;
      gap: var(--hds-space-2xs);
      color: var(--hds-color-text);
      font-family: var(--hds-font-family);
      font-size: inherit;
      font-weight: inherit;
      line-height: inherit;
    }

    .hds-checkbox-input__field {
      display: inline-flex;
      align-items: flex-start;
      gap: var(--hds-space-xs);
      cursor: pointer;
    }

    .hds-checkbox-input__control {
      appearance: none;
      box-sizing: border-box;
      display: grid;
      place-content: center;
      width: 1.125rem;
      height: 1.125rem;
      flex: 0 0 auto;
      margin: 0;
      border: 1px var(--hds-border-style-solid) var(--hds-color-border-hover);
      border-radius: var(--hds-radius-sm);
      background: var(--hds-color-surface);
      color: var(--hds-color-text-on-accent);
      cursor: inherit;
      font: inherit;
      transition-property: background, border-color;
      transition-duration: var(--hds-duration-normal);
      transition-timing-function: var(--hds-ease-out);

      &::before {
        width: 0.625rem;
        height: 0.625rem;
        background: currentColor;
        clip-path: polygon(14% 44%, 0 59%, 40% 100%, 100% 18%, 84% 3%, 39% 72%);
        content: "";
        transform: scale(0);
        transition: transform var(--hds-duration-fast) var(--hds-ease-out);
      }

      &:hover:not(:disabled) {
        border-color: var(--hds-color-accent);
      }

      &:checked,
      &:indeterminate {
        border-color: var(--hds-color-accent);
        background: var(--hds-color-accent);
      }

      &:checked::before,
      &:indeterminate::before {
        transform: scale(1);
      }

      &:indeterminate::before {
        width: 0.625rem;
        height: 0.125rem;
        clip-path: none;
      }

      &:focus-visible {
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
        color: var(--hds-color-text-weakest);
      }
    }

    .hds-checkbox-input__field:has(.hds-checkbox-input__control:disabled) {
      color: var(--hds-color-text-weaker);
      cursor: not-allowed;
      opacity: 0.65;
    }

    .hds-checkbox-input__label[hidden],
    .hds-checkbox-input__error[hidden] {
      display: none;
    }

    .hds-checkbox-input__error {
      margin: 0 0 0 calc(1.125rem + var(--hds-space-xs));
      color: var(--hds-color-danger);
      font-size: var(--hds-font-size-sm);
      font-weight: var(--hds-font-weight-regular);
      line-height: var(--hds-line-height-normal);
    }

    @media (prefers-reduced-motion: reduce) {
      .hds-checkbox-input__control,
      .hds-checkbox-input__control::before {
        transition-duration: var(--hds-duration-instant);
      }
    }

    @media (forced-colors: active) {
      .hds-checkbox-input__control:checked,
      .hds-checkbox-input__control:indeterminate {
        border-color: Highlight;
        background: Highlight;
        color: HighlightText;
        forced-color-adjust: none;
      }
    }
  </style>
`;

const attribute = (name: string, value: string): string =>
  value ? `${name}="${value}"` : "";

export const html = ({
  label = "",
  name = "",
  value = "on",
  ariaLabel = "",
  errorMessage = "",
  checked = false,
  disabled = false,
  required = false,
  controlId = "hds-checkbox-input-control",
  labelId = "hds-checkbox-input-label",
  errorId = "hds-checkbox-input-error",
}: CheckboxInputTemplateArgs = {}): string => `
  <span class="hds-checkbox-input">
    <label class="hds-checkbox-input__field" for="${controlId}">
      <input
        class="hds-checkbox-input__control"
        id="${controlId}"
        type="checkbox"
        ${attribute("name", name)}
        value="${value}"
        ${label ? `aria-labelledby="${labelId}"` : attribute("aria-label", ariaLabel)}
        ${checked ? "checked" : ""}
        ${disabled ? "disabled" : ""}
        ${required ? "required" : ""}
      />
      <span
        class="hds-checkbox-input__label"
        id="${labelId}"
        data-label
        ${label ? "" : "hidden"}
      >
        ${label}
      </span>
    </label>
    <span
      class="hds-checkbox-input__error"
      id="${errorId}"
      data-error
      role="alert"
      ${errorMessage ? "" : "hidden"}
    >
      ${errorMessage}
    </span>
  </span>
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
  render(args: CheckboxInputTemplateArgs = {}): string {
    return html(args);
  },

  update(root: HTMLElement, state: CheckboxInputState): void {
    const label = root.querySelector<HTMLElement>("[data-label]");
    const input = root.querySelector<HTMLInputElement>(
      ".hds-checkbox-input__control",
    );
    const error = root.querySelector<HTMLElement>("[data-error]");

    if (!label || !input || !error) {
      throw new Error("Checkbox input template is missing required elements.");
    }

    label.textContent = state.label;
    label.hidden = !state.label;

    input.value = state.value;
    input.checked = state.checked;
    input.indeterminate = state.indeterminate;
    input.disabled = state.disabled;
    input.required = state.required;

    setStringAttribute(input, "name", state.name);
    setStringAttribute(input, "aria-label", state.label ? "" : state.ariaLabel);

    if (state.label) {
      input.setAttribute("aria-labelledby", label.id);
    } else {
      input.removeAttribute("aria-labelledby");
    }

    const hasError = Boolean(state.errorMessage);

    input.setCustomValidity(state.errorMessage);

    if (hasError) {
      error.hidden = false;
      error.textContent = state.errorMessage;
      input.setAttribute("aria-invalid", "true");
      input.setAttribute("aria-describedby", error.id);
    } else {
      error.textContent = "";
      error.hidden = true;
      input.removeAttribute("aria-invalid");
      input.removeAttribute("aria-describedby");
    }
  },
};

export default Template;
