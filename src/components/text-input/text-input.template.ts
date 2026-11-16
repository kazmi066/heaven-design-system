import {
  attribute,
  errorStyles,
  find,
  setError,
  setStringAttribute,
} from "../shared/field.js";
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
      line-height: var(--hds-line-height-normal);
    }

    :host([required]) .hds-text-input__label::after {
      content: " *" / "";
      color: var(--hds-color-text-danger);
    }

    .hds-text-input__control {
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

    .hds-text-input__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--hds-space-xs);
    }

    .hds-text-input__toggle {
      display: inline-flex;
      align-items: center;
      gap: var(--hds-space-2xs);
      min-block-size: 1.5rem;
      margin: 0;
      border: 1px var(--hds-border-style-solid) transparent;
      border-radius: var(--hds-radius-full);
      padding: 0 0.5rem;
      background: transparent;
      color: var(--hds-color-text-weak);
      font-family: inherit;
      font-size: var(--hds-font-size-sm);
      font-weight: var(--hds-font-weight-medium);
      line-height: var(--hds-line-height-tight);
      cursor: pointer;
      transition-property: background-color, color, scale;
      transition-duration: var(--hds-duration-normal);
      transition-timing-function: var(--hds-ease-out);

      &:hover:not(:disabled) {
        background: var(--hds-color-surface-hover);
        color: var(--hds-color-text);
      }

      &:active {
        scale: 0.96;
      }

      &:focus-visible {
        outline: 2px solid var(--hds-color-focus);
        outline-offset: 2px;
      }

      &:disabled {
        cursor: not-allowed;
        opacity: 0.6;
      }
    }

    .hds-text-input__toggle[hidden],
    .hds-text-input__toggle-icon[hidden] {
      display: none;
    }

    .hds-text-input__toggle-icon {
      width: 1rem;
      height: 1rem;
    }

${errorStyles("hds-text-input")}

    .hds-text-input__label:empty,
    .hds-text-input__error:empty {
      display: none;
    }

    @media (prefers-reduced-motion: reduce) {
      .hds-text-input__control,
      .hds-text-input__error,
      .hds-text-input__toggle {
        transition-duration: var(--hds-duration-instant);
      }
    }

    @media (forced-colors: active) {
      .hds-text-input__error::before {
        background: CanvasText;
      }
    }
  </style>
`;

export const html = ({
  label = "",
  type = "text",
  name = "",
  placeholder = "",
  autocomplete = "",
  ariaLabel = "",
  errorMessage = "",
  passwordVisible = false,
  disabled = false,
  readonly = false,
  required = false,
  controlId = "hds-text-input-control",
  errorId = "hds-text-input-error",
}: TextInputTemplateArgs = {}): string => `
  <div class="hds-text-input">
    <div class="hds-text-input__header">
      <label
        class="hds-text-input__label"
        for="${controlId}"
        data-label
      >${label}</label>
      <button
        class="hds-text-input__toggle"
        type="button"
        data-password-toggle
        aria-controls="${controlId}"
        aria-live="polite"
        aria-label="${passwordVisible ? "Hide password" : "Show password"}"
        ${type === "password" ? "" : "hidden"}
        ${disabled ? "disabled" : ""}
      >
        <span data-toggle-label>${passwordVisible ? "Hide" : "Show"}</span>
        <svg
          class="hds-text-input__toggle-icon"
          data-icon-show
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
          ${passwordVisible ? "hidden" : ""}
        >
          <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"></path>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>
        <svg
          class="hds-text-input__toggle-icon"
          data-icon-hide
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
          ${passwordVisible ? "" : "hidden"}
        >
          <path d="M3 3l18 18"></path>
          <path d="M10.6 10.6a3 3 0 0 0 4.2 4.2"></path>
          <path d="M6.1 6.1C3.9 7.6 2 12 2 12s3.5 7 10 7a9.8 9.8 0 0 0 4.4-1"></path>
          <path d="M10.9 5.1A10.3 10.3 0 0 1 12 5c6.5 0 10 7 10 7a18.3 18.3 0 0 1-3.3 3.9"></path>
        </svg>
      </button>
    </div>
    <input
      class="hds-text-input__control"
      id="${controlId}"
      type="${type === "password" && passwordVisible ? "text" : type}"
      ${attribute("name", name)}
      ${attribute("placeholder", placeholder)}
      ${attribute("autocomplete", autocomplete)}
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
    >${errorMessage}</p>
  </div>
`;

const Template = {
  render(args: TextInputTemplateArgs = {}): string {
    return `
      ${css()}
      ${html(args)}
    `;
  },

  update(root: ShadowRoot, state: TextInputState): void {
    const label = find<HTMLLabelElement>(root, "[data-label]");
    const toggle = find<HTMLButtonElement>(root, "[data-password-toggle]");
    const toggleLabel = find<HTMLElement>(root, "[data-toggle-label]");
    const showIcon = find<SVGElement>(root, "[data-icon-show]");
    const hideIcon = find<SVGElement>(root, "[data-icon-hide]");
    const input = find<HTMLInputElement>(root, ".hds-text-input__control");
    const error = find<HTMLElement>(root, "[data-error]");

    label.textContent = state.label;

    const isPassword = state.type === "password";
    const passwordVisible = isPassword && state.passwordVisible;

    toggle.hidden = !isPassword;
    toggle.disabled = state.disabled;
    toggleLabel.textContent = passwordVisible ? "Hide" : "Show";
    showIcon.toggleAttribute("hidden", passwordVisible);
    hideIcon.toggleAttribute("hidden", !passwordVisible);
    setStringAttribute(
      toggle,
      "aria-label",
      passwordVisible ? "Hide password" : "Show password",
    );
    setStringAttribute(toggle, "aria-controls", input.id);

    input.type = passwordVisible ? "text" : state.type;
    input.disabled = state.disabled;
    input.readOnly = state.readonly;
    input.required = state.required;

    setStringAttribute(input, "name", state.name);
    setStringAttribute(input, "placeholder", state.placeholder);
    setStringAttribute(input, "autocomplete", state.autocomplete);
    setStringAttribute(input, "aria-label", state.ariaLabel);

    setError(input, error, state.errorMessage);
  },
};

export default Template;
