import type { ButtonState, ButtonTemplateArgs } from "./button.types.js";

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
      font-size: var(--hds-font-size-base);
      cursor: pointer;
      background: var(--hds-color-accent);
      color: var(--hds-color-text-on-accent);
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
    }

    :host([variant="secondary"]) .hds-button {
      background: var(--hds-color-surface);
      color: var(--hds-color-text);
    }

    :host([variant="success"]) .hds-button {
      background: var(--hds-color-success);
      color: var(--hds-color-text-on-success);
    }

    :host([variant="danger"]) .hds-button {
      background: var(--hds-color-danger);
      color: var(--hds-color-text-on-danger);
    }

    :host([variant="info"]) .hds-button {
      background: var(--hds-color-info);
      color: var(--hds-color-text-on-info);
    }

    :host([variant="warning"]) .hds-button {
      background: var(--hds-color-warning);
      color: var(--hds-color-text-on-warning);
    }

    :host([variant="error"]) .hds-button {
      background: var(--hds-color-danger);
      color: var(--hds-color-text-on-error);
    }

    :host([size="s"]) .hds-button {
      padding: 0.45rem 0.75rem;
      font-size: var(--hds-font-size-sm);
    }

    :host([size="l"]) .hds-button {
      padding: 0.8rem 1.25rem;
      font-size: var(--hds-font-size-md);
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
    const button = root.querySelector<HTMLButtonElement>(".hds-button");
    const label = root.querySelector<HTMLElement>("[data-loading-label]");

    if (!button || !label) {
      throw new Error("Button template is missing required elements.");
    }

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
