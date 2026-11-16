import { find, setStringAttribute } from "../shared/field.js";
import type { ButtonState, ButtonTemplateArgs } from "./button.types.js";

export const css = (): string => `
  <style>
    :host {
      --_bg: var(--hds-color-accent-strong);
      --_fg: var(--hds-color-text-on-strong);
      --_border: transparent;
      --_min-size: 2.75rem;
      --_padding: 1.5rem;
      --_font-size: var(--hds-font-size-sm);
      display: inline-block;
    }

    :host([hidden]) {
      display: none;
    }

    :host([variant="secondary"]) {
      --_bg: var(--hds-color-surface);
      --_bg-hover: var(--hds-color-surface-hover);
      --_fg: var(--hds-color-text);
      --_border: var(--hds-color-border-control);
    }

    :host([variant="success"]) {
      --_bg: var(--hds-color-success-strong);
    }

    :host(:is([variant="danger"], [variant="error"])) {
      --_bg: var(--hds-color-danger-strong);
    }

    :host([variant="info"]) {
      --_bg: var(--hds-color-info-strong);
    }

    :host([variant="warning"]) {
      --_bg: var(--hds-color-warning-strong);
    }

    :host([size="s"]) {
      --_min-size: 2.25rem;
      --_padding: 1rem;
    }

    :host([size="l"]) {
      --_min-size: 3.25rem;
      --_padding: 2rem;
      --_font-size: var(--hds-font-size-base);
    }

    .hds-button {
      display: inline-grid;
      grid-template-areas: "stack";
      place-items: center;
      box-sizing: border-box;
      min-block-size: var(--_min-size);
      margin: 0;
      border: 1px var(--hds-border-style-solid) var(--_border);
      border-radius: var(--hds-radius-full);
      padding: 0.375rem var(--_padding);
      background: var(--_bg);
      color: var(--_fg);
      box-shadow: var(--hds-shadow-sm);
      font-family: var(--hds-font-family);
      font-size: var(--_font-size);
      font-weight: var(--hds-font-weight-semibold);
      line-height: var(--hds-line-height-tight);
      text-decoration: none;
      cursor: pointer;
      transition-property:
        background-color, border-color, color, box-shadow, translate, scale;
      transition-duration: var(--hds-duration-normal);
      transition-timing-function: var(--hds-ease-out);

      &:hover {
        background: var(
          --_bg-hover,
          color-mix(in oklab, var(--_bg) 86%, black)
        );
      }

      &:active {
        scale: 0.97;
      }

      &:focus-visible {
        outline: 2px solid var(--hds-color-focus);
        outline-offset: 2px;
        box-shadow: 0 0 0 6px
          color-mix(in oklab, var(--hds-color-focus) 25%, transparent);
      }

      &:disabled {
        box-shadow: none;
        opacity: 0.55;
        cursor: not-allowed;
        pointer-events: none;
      }
    }

    @media (hover: hover) and (prefers-reduced-motion: no-preference) {
      .hds-button:hover:not(:active, :focus-visible) {
        translate: 0 -1px;
        box-shadow: var(--hds-shadow-md);
      }
    }

    .hds-button__content,
    .hds-button__loading {
      grid-area: stack;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--hds-space-xs);
    }

    .hds-button__loading {
      visibility: hidden;
    }

    :host([loading]) .hds-button__content {
      visibility: hidden;
    }

    :host([loading]) .hds-button__loading {
      visibility: visible;
    }

    .hds-button__spinner {
      width: 1em;
      height: 1em;
      flex: 0 0 auto;
      border: 2px solid currentColor;
      border-right-color: transparent;
      border-radius: var(--hds-radius-full);
      animation: hds-button-spin 700ms var(--hds-ease-linear) infinite;
    }

    @keyframes hds-button-spin {
      to {
        rotate: 360deg;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .hds-button {
        transition-duration: var(--hds-duration-instant);
      }

      .hds-button:active {
        scale: none;
      }

      .hds-button__spinner {
        animation: none;
        border-right-color: currentColor;
        opacity: 0.6;
      }
    }

    @media (forced-colors: active) {
      .hds-button {
        border-color: ButtonText;
      }

      .hds-button:disabled {
        border-color: GrayText;
        color: GrayText;
        opacity: 1;
      }
    }
  </style>
`;

export const html = ({
  type = "button",
  disabled = false,
  loading = false,
  loadingLabel = "Loading…",
}: ButtonTemplateArgs = {}): string => {
  const isUnavailable = disabled || loading;

  return `
    <button
      class="hds-button"
      type="${type}"
      ${isUnavailable ? "disabled" : ""}
      ${loading ? 'aria-busy="true"' : ""}
    >
      <span class="hds-button__content">
        <slot name="start"></slot>
        <span><slot></slot></span>
        <slot name="end"></slot>
      </span>
      <span class="hds-button__loading" role="status">
        <span
          class="hds-button__spinner"
          aria-hidden="true"
        ></span>
        <span data-loading-label>
          ${loadingLabel}
        </span>
      </span>
    </button>
  `;
};

const Template = {
  render(args: ButtonTemplateArgs = {}): string {
    return `
      ${css()}
      ${html(args)}
    `;
  },

  update(root: ShadowRoot, state: ButtonState): void {
    const button = find<HTMLButtonElement>(root, ".hds-button");
    const label = find<HTMLElement>(root, "[data-loading-label]");

    button.type = state.type;
    button.disabled = state.disabled || state.loading;

    setStringAttribute(button, "aria-busy", state.loading ? "true" : "");

    label.textContent = state.loadingLabel;
  },
};

export default Template;
