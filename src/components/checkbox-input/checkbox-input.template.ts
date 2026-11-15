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
      --_size: 1.25rem;
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
      min-block-size: 1.5rem;
      cursor: pointer;
    }

    .hds-checkbox-input__control {
      appearance: none;
      box-sizing: border-box;
      display: grid;
      place-content: center;
      width: var(--_size);
      height: var(--_size);
      flex: 0 0 auto;
      /* Centers the box on the first line of the label at any font size. */
      margin: max(0px, (1lh - var(--_size)) / 2) 0 0;
      border: 1px var(--hds-border-style-solid) var(--hds-color-border-control);
      border-radius: var(--hds-radius-md);
      background: var(--hds-color-surface);
      color: var(--hds-color-text-on-strong);
      box-shadow: var(--hds-shadow-sm);
      cursor: inherit;
      font: inherit;
      transition-property: background-color, border-color, box-shadow, scale;
      transition-duration: var(--hds-duration-normal);
      transition-timing-function: var(--hds-ease-out);

      &::before {
        width: 0.75rem;
        height: 0.75rem;
        background: currentColor;
        clip-path: polygon(14% 44%, 0 59%, 40% 100%, 100% 18%, 84% 3%, 39% 72%);
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

      &:checked,
      &:indeterminate {
        border-color: var(--hds-color-accent-strong);
        background: var(--hds-color-accent-strong);
      }

      &:checked::before,
      &:indeterminate::before {
        scale: 1;
      }

      &:indeterminate::before {
        height: 0.125rem;
        border-radius: var(--hds-radius-full);
        clip-path: none;
      }

      &:focus-visible {
        outline: 2px solid var(--hds-color-focus);
        outline-offset: 2px;
        box-shadow: 0 0 0 6px
          color-mix(in oklab, var(--hds-color-focus) 22%, transparent);
      }

      &:user-invalid,
      &[aria-invalid="true"] {
        border-color: var(--hds-color-text-danger);
      }

      &:user-invalid:focus-visible,
      &[aria-invalid="true"]:focus-visible {
        outline-color: var(--hds-color-text-danger);
      }

      &:disabled {
        box-shadow: none;
      }

      &:disabled:not(:checked, :indeterminate) {
        background: var(--hds-color-surface-hover);
      }
    }

    .hds-checkbox-input__field:has(.hds-checkbox-input__control:disabled) {
      cursor: not-allowed;
      opacity: 0.6;
    }

    /* The control's required attribute tells assistive tech. The empty alt
       text keeps the asterisk from being read out as well. */
    hds-checkbox-input[required] .hds-checkbox-input__label::after {
      content: " *" / "";
      color: var(--hds-color-text-danger);
    }

    .hds-checkbox-input__error {
      display: flex;
      align-items: flex-start;
      gap: var(--hds-space-2xs);
      margin: 0;
      margin-inline-start: calc(var(--_size) + var(--hds-space-xs));
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

    .hds-checkbox-input__label:empty,
    .hds-checkbox-input__error:empty {
      display: none;
    }

    @media (prefers-reduced-motion: reduce) {
      .hds-checkbox-input__control,
      .hds-checkbox-input__control::before,
      .hds-checkbox-input__error {
        transition-duration: var(--hds-duration-instant);
      }

      .hds-checkbox-input__control:active:not(:disabled) {
        scale: none;
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

      .hds-checkbox-input__error::before {
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
      >${label}</span>
    </label>
    <span
      class="hds-checkbox-input__error"
      id="${errorId}"
      data-error
      role="alert"
    >${errorMessage}</span>
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

    error.textContent = state.errorMessage;

    if (hasError) {
      input.setAttribute("aria-invalid", "true");
      input.setAttribute("aria-describedby", error.id);
    } else {
      input.removeAttribute("aria-invalid");
      input.removeAttribute("aria-describedby");
    }
  },
};

export default Template;
