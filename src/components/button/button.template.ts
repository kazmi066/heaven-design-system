import type {
  ButtonState,
  ButtonTemplateArgs,
} from "./button.types.js";

export const css = (): string => `
  <style>
    :host {
      display: inline-block;
    }

    :host([hidden]) {
      display: none;
    }

    .hds-button {
      display: inline-grid;
      grid-template-areas: "stack";
      place-items: center;
      border: 1px var(--hds-border-style-solid) var(--hds-color-border);
      border-radius: var(--hds-radius-sm);
      padding: 0.625rem 1rem;
      font-family: var(--hds-font-family);
      cursor: pointer;
      background: var(--hds-color-accent);
      transition-property: background, opacity, color, border-color;
      transition-duration: var(--hds-transition-slow);
      transition-timing-function: var(--hds-ease-in);
      text-decoration: none;

      &:hover {
        filter: brightness(93%);
      }

      &:disabled {
        opacity: 0.55;
        cursor: not-allowed;
        pointer-events: none;
      }

      &[data-variant="default"] {
        background: var(--hds-color-accent);
        color: var(--hds-color-text-on-accent);
      }

      &[data-variant="secondary"] {
        background: var(--hds-color-surface);
        color: var(--hds-color-text);
        border-color: var(--hds-color-border);
      }

      &[data-variant="success"] {
        background: var(--hds-color-success);
        color: var(--hds-color-text-on-success);
      }

      &[data-variant="danger"] {
        background: var(--hds-color-danger);
        color: var(--hds-color-text-on-danger);
      }

      &[data-variant="info"] {
        background: var(--hds-color-info);
        color: var(--hds-color-text-on-info);
      }

      &[data-variant="warning"] {
        background: var(--hds-color-warning);
        color: var(--hds-color-text-on-warning);
      }

      &[data-variant="error"] {
        background: var(--hds-color-danger);
        color: var(--hds-color-text-on-error);
      }

      &[data-size="s"] {
        padding: 0.45rem 0.75rem;
        font-size: var(--hds-font-size-sm);
      }

      &[data-size="m"] {
        padding: 0.625rem 1rem;
        font-size: var(--hds-font-size-base);
      }

      &[data-size="l"] {
        padding: 0.8rem 1.25rem;
        font-size: var(--hds-font-size-md);
      }
    }

    .hds-button__content,
    .hds-button__loading {
      grid-area: stack;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--hds-space-2xs);
    }

    .hds-button__loading {
      visibility: hidden;
    }

    .hds-button[aria-busy="true"] .hds-button__content {
      visibility: hidden;
    }

    .hds-button[aria-busy="true"] .hds-button__loading {
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
        transform: rotate(360deg);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .hds-button {
        transition-duration: var(--hds-duration-instant);
      }

      .hds-button__spinner {
        animation: none;
        border-right-color: currentColor;
        opacity: 0.6;
      }
    }
  </style>
`;

export const html = ({
  variant = "default",
  size = "m",
  type = "button",
  disabled = false,
  loading = false,
  loadingLabel = "Loading…",
}: ButtonTemplateArgs = {}): string => {
  const isUnavailable = disabled || loading;

  return `
    <button
      class="hds-button"
      data-variant="${variant}"
      data-size="${size}"
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
    const button = root.querySelector<HTMLButtonElement>(".hds-button");
    const label = root.querySelector<HTMLElement>("[data-loading-label]");

    if (!button || !label) {
      throw new Error("Button template is missing required elements.");
    }

    button.dataset.variant = state.variant;
    button.dataset.size = state.size;
    button.type = state.type;
    button.disabled = state.disabled || state.loading;

    if (state.loading) {
      button.setAttribute("aria-busy", "true");
    } else {
      button.removeAttribute("aria-busy");
    }

    label.textContent = state.loadingLabel;
  },
};

export default Template;
