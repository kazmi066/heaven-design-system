import {
  attribute,
  errorStyles,
  find,
  setError,
  setStringAttribute,
} from "../shared/field.js";
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
      line-height: var(--hds-line-height-normal);
    }

    hds-textarea-input[required] .hds-textarea-input__label::after {
      content: " *" / "";
      color: var(--hds-color-text-danger);
    }

    .hds-textarea-input__control {
      display: block;
      box-sizing: border-box;
      width: 100%;
      min-width: 0;
      min-block-size: 2.75rem;
      margin: 0;
      border: 1px var(--hds-border-style-solid) var(--hds-color-border-control);
      border-radius: var(--hds-radius-xl);
      padding: 0.5rem 0.875rem;
      background: var(--hds-color-surface);
      color: var(--hds-color-text);
      box-shadow: var(--hds-shadow-sm);
      font: inherit;
      /* Never below 16px, so iOS does not zoom the page on focus. */
      font-size: max(1rem, 1em);
      line-height: var(--hds-line-height-normal);
      resize: vertical;
      transition-property: background-color, border-color, box-shadow;
      transition-duration: var(--hds-duration-normal);
      transition-timing-function: var(--hds-ease-out);

      &::placeholder {
        color: var(--hds-color-text-weak);
        opacity: 1;
      }

      &:hover:not(:disabled) {
        border-color: var(--hds-color-text);
      }

      &:focus-visible {
        border-color: var(--hds-color-focus);
        outline: 2px solid var(--hds-color-focus);
        outline-offset: -1px;
        box-shadow: 0 0 0 5px
          color-mix(in oklab, var(--hds-color-focus) 22%, transparent);
      }

      &:user-invalid,
      &[aria-invalid="true"] {
        border-color: var(--hds-color-text-danger);
      }

      &:user-invalid:focus-visible,
      &[aria-invalid="true"]:focus-visible {
        outline-color: var(--hds-color-text-danger);
        box-shadow: 0 0 0 5px
          color-mix(in oklab, var(--hds-color-text-danger) 22%, transparent);
      }

      &:read-only {
        background: var(--hds-color-neutral-soft);
      }

      &:disabled {
        background: var(--hds-color-surface-hover);
        color: var(--hds-color-text-weak);
        box-shadow: none;
        cursor: not-allowed;
        opacity: 0.6;
      }
    }

${errorStyles("hds-textarea-input")}

    .hds-textarea-input__label:empty,
    .hds-textarea-input__error:empty {
      display: none;
    }

    @media (prefers-reduced-motion: reduce) {
      .hds-textarea-input__control,
      .hds-textarea-input__error {
        transition-duration: var(--hds-duration-instant);
      }
    }

    @media (forced-colors: active) {
      .hds-textarea-input__error::before {
        background: CanvasText;
      }
    }
  </style>
`;

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
    >${label}</label>
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
    >${errorMessage}</p>
  </div>
`;

const Template = {
  render(args: TextareaInputTemplateArgs = {}): string {
    return html(args);
  },

  update(root: HTMLElement, state: TextareaInputState): void {
    const label = find<HTMLLabelElement>(root, "[data-label]");
    const textarea = find<HTMLTextAreaElement>(
      root,
      ".hds-textarea-input__control",
    );
    const error = find<HTMLElement>(root, "[data-error]");

    label.textContent = state.label;

    textarea.rows = state.rows;
    textarea.disabled = state.disabled;
    textarea.readOnly = state.readonly;
    textarea.required = state.required;

    setStringAttribute(textarea, "name", state.name);
    setStringAttribute(textarea, "placeholder", state.placeholder);
    setStringAttribute(
      textarea,
      "aria-label",
      state.label ? "" : state.ariaLabel,
    );

    setError(textarea, error, state.errorMessage);
  },
};

export default Template;
