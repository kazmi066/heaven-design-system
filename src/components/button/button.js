const template = document.createElement("template");
import "./button.css";

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
      gap: 0.5rem;
      border: 1px solid transparent;
      border-radius: var(--hds-radius-sm, 4px);
      padding: 0.625rem 1rem;
      font: inherit;
      cursor: pointer;
    }

    .hds-button[data-variant="default"] {
      background: var(--hds-color-accent, #3559c7);
      color: var(--hds-color-text-on-accent, #fff);
    }

    .hds-button[data-variant="secondary"] {
      background: var(--hds-color-surface, #fff);
      color: var(--hds-color-text, #0c1a3d);
      border-color: var(--hds-color-border, #d8dee4);
    }

    .hds-button[data-size="s"] {
      padding: 0.45rem 0.75rem;
      font-size: 0.875rem;
    }

    .hds-button[data-size="m"] {
      padding: 0.625rem 1rem;
      font-size: 1rem;
    }

    .hds-button[data-size="l"] {
      padding: 0.8rem 1.25rem;
      font-size: 1.0625rem;
    }

    .hds-button:disabled {
      opacity: 0.55;
      cursor: not-allowed;
      pointer-events: none;
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
