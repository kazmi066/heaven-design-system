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

    /* The control's required attribute tells assistive tech. The empty alt
       text keeps the asterisk from being read out as well. */
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

    .hds-textarea-input__error {
      display: flex;
      align-items: flex-start;
      gap: var(--hds-space-2xs);
      margin: 0;
      color: var(--hds-color-text-danger);
      font-size: var(--hds-font-size-sm);
      font-weight: var(--hds-font-weight-regular);
      line-height: var(--hds-line-height-normal);
      transition-property: opacity, translate;
      transition-duration: var(--hds-duration-slow);
      transition-timing-function: var(--hds-ease-out);

      /* An icon as well as color, so the error does not rely on color. */
      &::before {
        content: "";
        flex: none;
        inline-size: 1em;
        block-size: 1lh;
        background: currentColor;
        mask: url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 20 20%22%3E%3Cpath fill-rule=%22evenodd%22 d=%22M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM9 6a1 1 0 1 1 2 0v4a1 1 0 1 1-2 0V6Zm1 9a1.25 1.25 0 1 0 0-2.5A1.25 1.25 0 0 0 10 15Z%22/%3E%3C/svg%3E') center / 1em no-repeat;
      }

      /* Slides in when a message appears. */
      @starting-style {
        opacity: 0;
        translate: 0 -0.25rem;
      }
    }

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

    const hasError = Boolean(state.errorMessage);

    textarea.setCustomValidity(state.errorMessage);

    error.textContent = state.errorMessage;

    if (hasError) {
      textarea.setAttribute("aria-invalid", "true");
      textarea.setAttribute("aria-describedby", error.id);
    } else {
      textarea.removeAttribute("aria-invalid");
      textarea.removeAttribute("aria-describedby");
    }
  },
};

export default Template;
