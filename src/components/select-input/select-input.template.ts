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
      line-height: var(--hds-line-height-normal);
    }

    /* The control's required attribute tells assistive tech. The empty alt
       text keeps the asterisk from being read out as well. */
    :host([required]) .hds-select-input__label::after {
      content: " *" / "";
      color: var(--hds-color-text-danger);
    }

    .hds-select-input__control {
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
      padding-inline-end: 2.5rem;
      appearance: none;
      -webkit-appearance: none;
      cursor: pointer;

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

      &:disabled {
        background: var(--hds-color-surface-hover);
        color: var(--hds-color-text-weak);
        box-shadow: none;
        cursor: not-allowed;
        opacity: 0.6;
      }
    }

    .hds-select-input__wrapper {
      position: relative;
      display: block;
    }

    .hds-select-input__chevron {
      position: absolute;
      inset-block-start: 50%;
      inset-inline-end: 0.875rem;
      width: 1rem;
      height: 1rem;
      pointer-events: none;
      color: var(--hds-color-text-weak);
      translate: 0 -50%;
      transition-property: color, rotate;
      transition-duration: var(--hds-duration-normal);
      transition-timing-function: var(--hds-ease-out);
    }

    .hds-select-input__control:hover:not(:disabled) ~ .hds-select-input__chevron {
      color: var(--hds-color-text);
    }

    /* Flips while the picker is open, where :open is supported. */
    .hds-select-input__control:open ~ .hds-select-input__chevron {
      rotate: 180deg;
    }

    /* Styled picker on desktop, where the browser supports it. Touch devices
       and other browsers keep the native picker. */
    @supports (appearance: base-select) {
      @media (hover: hover) and (pointer: fine) {
        .hds-select-input__control,
        .hds-select-input__control::picker(select) {
          appearance: base-select;
        }

        .hds-select-input__control {
          display: flex;
          align-items: center;
        }

        .hds-select-input__control::picker-icon {
          display: none;
        }

        .hds-select-input__control::picker(select) {
          margin-block: 0.375rem;
          border: 1px var(--hds-border-style-solid) var(--hds-color-border-strong);
          border-radius: var(--hds-radius-xl);
          padding: 0.25rem;
          background: var(--hds-color-surface);
          color: var(--hds-color-text);
          box-shadow: var(--hds-shadow-md);
          opacity: 0;
          translate: 0 -0.25rem;
          transition-property: opacity, translate, overlay, display;
          transition-duration: var(--hds-duration-normal);
          transition-timing-function: var(--hds-ease-out);
          transition-behavior: allow-discrete;
        }

        .hds-select-input__control::picker(select):popover-open {
          opacity: 1;
          translate: 0 0;

          @starting-style {
            opacity: 0;
            translate: 0 -0.25rem;
          }
        }

        .hds-select-input__control option {
          gap: var(--hds-space-xs);
          border-radius: var(--hds-radius-lg);
          padding: 0.5rem 0.75rem;
          cursor: pointer;
          transition: background-color var(--hds-duration-fast)
            var(--hds-ease-out);

          &:hover,
          &:focus-visible {
            background: var(--hds-color-surface-hover);
          }

          &:focus-visible {
            outline: 2px solid var(--hds-color-focus);
            outline-offset: -2px;
          }

          &:checked {
            font-weight: var(--hds-font-weight-medium);
          }

          &:disabled {
            color: var(--hds-color-text-weak);
            cursor: not-allowed;
            opacity: 0.6;
          }

          &::checkmark {
            order: 1;
            margin-inline-start: auto;
            color: var(--hds-color-focus);
          }
        }
      }
    }

    .hds-select-input__error {
      display: flex;
      align-items: flex-start;
      gap: var(--hds-space-2xs);
      margin: 0;
      color: var(--hds-color-text-danger);
      font-size: var(--hds-font-size-sm);
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

    .hds-select-input__label:empty,
    .hds-select-input__error:empty {
      display: none;
    }

    @media (prefers-reduced-motion: reduce) {
      .hds-select-input__control,
      .hds-select-input__error,
      .hds-select-input__chevron {
        transition-duration: var(--hds-duration-instant);
      }

      /* Its own rule: an unknown pseudo-element would drop a shared list. */
      .hds-select-input__control::picker(select) {
        transition-duration: var(--hds-duration-instant);
      }
    }

    @media (forced-colors: active) {
      .hds-select-input__error::before {
        background: CanvasText;
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
    >${label}</label>
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

    select.disabled = state.disabled;
    select.required = state.required;

    setStringAttribute(select, "name", state.name);
    setStringAttribute(
      select,
      "aria-label",
      state.label ? "" : state.ariaLabel,
    );

    const hasError = Boolean(state.errorMessage);

    select.setCustomValidity(state.errorMessage);

    error.textContent = state.errorMessage;

    if (hasError) {
      select.setAttribute("aria-invalid", "true");
      select.setAttribute("aria-describedby", error.id);
    } else {
      select.removeAttribute("aria-invalid");
      select.removeAttribute("aria-describedby");
    }
  },
};

export default Template;
