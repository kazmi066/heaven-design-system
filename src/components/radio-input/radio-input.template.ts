import type {
  RadioInputState,
  RadioInputTemplateArgs,
} from "./radio-input.types.js";

export const css = (): string => `
  <style id="hds-radio-input-styles">
    hds-radio-input {
      display: inline-block;
    }

    hds-radio-input[hidden] {
      display: none;
    }

    .hds-radio-input {
      display: inline-flex;
      align-items: flex-start;
      gap: var(--hds-space-xs);
      color: var(--hds-color-text);
      font-family: var(--hds-font-family);
      font-size: var(--hds-font-size-base);
      line-height: var(--hds-line-height-normal);
      cursor: pointer;
    }

    .hds-radio-input__control {
      appearance: none;
      box-sizing: border-box;
      display: grid;
      place-content: center;
      width: 1.125rem;
      height: 1.125rem;
      flex: 0 0 auto;
      margin: 0.1875rem 0 0;
      border: 1px var(--hds-border-style-solid) var(--hds-color-border-hover);
      border-radius: var(--hds-radius-full);
      background: var(--hds-color-surface);
      color: var(--hds-color-accent);
      cursor: inherit;
      transition-property: background, border-color;
      transition-duration: var(--hds-duration-normal);
      transition-timing-function: var(--hds-ease-out);

      &::before {
        width: 0.5rem;
        height: 0.5rem;
        border-radius: var(--hds-radius-full);
        background: currentColor;
        content: "";
        transform: scale(0);
        transition: transform var(--hds-duration-fast) var(--hds-ease-out);
      }

      &:hover:not(:disabled) {
        border-color: var(--hds-color-accent);
      }

      &:checked {
        border-color: var(--hds-color-accent);
      }

      &:checked::before {
        transform: scale(1);
      }

      &:focus-visible {
        outline: 2px solid var(--hds-color-accent);
        outline-offset: 2px;
      }

      &:disabled {
        background: var(--hds-color-surface-hover);
        color: var(--hds-color-text-weakest);
      }
    }

    .hds-radio-input:has(.hds-radio-input__control:disabled) {
      color: var(--hds-color-text-weaker);
      cursor: not-allowed;
      opacity: 0.65;
    }

    .hds-radio-input__label[hidden] {
      display: none;
    }

    @media (prefers-reduced-motion: reduce) {
      .hds-radio-input__control,
      .hds-radio-input__control::before {
        transition-duration: var(--hds-duration-instant);
      }
    }

    @media (forced-colors: active) {
      .hds-radio-input__control::before {
        background: CanvasText;
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
  checked = false,
  disabled = false,
  required = false,
  controlId = "hds-radio-input-control",
  labelId = "hds-radio-input-label",
}: RadioInputTemplateArgs = {}): string => `
  <label class="hds-radio-input" for="${controlId}">
    <input
      class="hds-radio-input__control"
      id="${controlId}"
      type="radio"
      ${attribute("name", name)}
      value="${value}"
      ${label ? `aria-labelledby="${labelId}"` : attribute("aria-label", ariaLabel)}
      ${checked ? "checked" : ""}
      ${disabled ? "disabled" : ""}
      ${required ? "required" : ""}
    />
    <span
      class="hds-radio-input__label"
      id="${labelId}"
      data-label
      ${label ? "" : "hidden"}
    >
      ${label}
    </span>
  </label>
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
  render(args: RadioInputTemplateArgs = {}): string {
    return html(args);
  },

  update(root: HTMLElement, state: RadioInputState): void {
    const label = root.querySelector<HTMLElement>("[data-label]");
    const input = root.querySelector<HTMLInputElement>(
      ".hds-radio-input__control",
    );

    if (!label || !input) {
      throw new Error("Radio input template is missing required elements.");
    }

    label.textContent = state.label;
    label.hidden = !state.label;

    input.value = state.value;
    input.checked = state.checked;
    input.disabled = state.disabled;
    input.required = state.required;

    setStringAttribute(input, "name", state.name);
    setStringAttribute(input, "aria-label", state.label ? "" : state.ariaLabel);

    if (state.label) {
      input.setAttribute("aria-labelledby", label.id);
    } else {
      input.removeAttribute("aria-labelledby");
    }
  },
};

export default Template;
