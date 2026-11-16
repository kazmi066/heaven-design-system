import { attribute, find, setStringAttribute } from "../shared/field.js";
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
      --_size: 1.25rem;
      display: inline-flex;
      align-items: flex-start;
      gap: var(--hds-space-xs);
      min-block-size: 1.5rem;
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
      width: var(--_size);
      height: var(--_size);
      flex: 0 0 auto;
      /* Centers the circle on the first line of the label. */
      margin: max(0px, (1lh - var(--_size)) / 2) 0 0;
      border: 1px var(--hds-border-style-solid) var(--hds-color-border-control);
      border-radius: var(--hds-radius-full);
      background: var(--hds-color-surface);
      color: var(--hds-color-text-on-strong);
      box-shadow: var(--hds-shadow-sm);
      cursor: inherit;
      transition-property: background-color, border-color, box-shadow, scale;
      transition-duration: var(--hds-duration-normal);
      transition-timing-function: var(--hds-ease-out);

      &::before {
        width: 0.5rem;
        height: 0.5rem;
        border-radius: var(--hds-radius-full);
        background: currentColor;
        content: "";
        scale: 0;
        transition: scale var(--hds-duration-normal) var(--hds-ease-bounce);
      }

      &:hover:not(:disabled) {
        border-color: var(--hds-color-text);
      }

      &:active:not(:disabled) {
        scale: 0.92;
      }

      &:checked {
        border-color: var(--hds-color-accent-strong);
        background: var(--hds-color-accent-strong);
      }

      &:checked::before {
        scale: 1;
      }

      &:focus-visible {
        outline: 2px solid var(--hds-color-focus);
        outline-offset: 2px;
        box-shadow: 0 0 0 6px
          color-mix(in oklab, var(--hds-color-focus) 22%, transparent);
      }

      &:disabled {
        box-shadow: none;
      }

      &:disabled:not(:checked) {
        background: var(--hds-color-surface-hover);
      }
    }

    .hds-radio-input:has(.hds-radio-input__control:disabled) {
      cursor: not-allowed;
      opacity: 0.6;
    }

    .hds-radio-input__label:empty {
      display: none;
    }

    @media (prefers-reduced-motion: reduce) {
      .hds-radio-input__control,
      .hds-radio-input__control::before {
        transition-duration: var(--hds-duration-instant);
      }

      .hds-radio-input__control:active:not(:disabled) {
        scale: none;
      }
    }

    @media (forced-colors: active) {
      .hds-radio-input__control:checked {
        border-color: Highlight;
        background: Highlight;
        color: HighlightText;
        forced-color-adjust: none;
      }
    }
  </style>
`;

export const html = ({
  label = "",
  name = "",
  value = "on",
  ariaLabel = "",
  checked = false,
  disabled = false,
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
    />
    <span
      class="hds-radio-input__label"
      id="${labelId}"
      data-label
    >${label}</span>
  </label>
`;

const Template = {
  render(args: RadioInputTemplateArgs = {}): string {
    return html(args);
  },

  update(root: HTMLElement, state: RadioInputState): void {
    const label = find<HTMLElement>(root, "[data-label]");
    const input = find<HTMLInputElement>(root, ".hds-radio-input__control");

    label.textContent = state.label;

    input.value = state.value;
    input.checked = state.checked;
    input.disabled = state.disabled;

    setStringAttribute(input, "name", state.name);
    setStringAttribute(input, "aria-label", state.label ? "" : state.ariaLabel);

    setStringAttribute(input, "aria-labelledby", state.label ? label.id : "");
  },
};

export default Template;
