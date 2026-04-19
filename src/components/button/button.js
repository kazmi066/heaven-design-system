const template = document.createElement("template");

template.innerHTML = `
  <style>
    :host {
      display: inline-block;
    }

    :host([hidden]) {
      display: none;
    }

    .hds-button {
      display: inline-flex;
      align-items: center;
      gap: var(--hds-space-2xs);
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
  </style>
  <button class="hds-button" part="button">
    <slot name="start"></slot>
    <span part="label"><slot></slot></span>
    <slot name="end"></slot>
  </button>
`;

export class HdsButton extends HTMLElement {
  static observedAttributes = ["variant", "size", "type", "disabled"];

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this._button = this.shadowRoot.querySelector("button");
  }

  connectedCallback() {
    this._sync();
  }

  attributeChangedCallback() {
    this._sync();
  }

  _sync() {
    const variant = this.getAttribute("variant") || "default";
    const size = this.getAttribute("size") || "m";
    const type = this.getAttribute("type") || "button";
    const disabled = this.hasAttribute("disabled");

    this._button.setAttribute("data-variant", variant);
    this._button.setAttribute("data-size", size);
    this._button.type = ["button", "submit", "reset"].includes(type)
      ? type
      : "button";
    this._button.disabled = disabled;
  }
}

if (!customElements.get("hds-button")) {
  customElements.define("hds-button", HdsButton);
}
