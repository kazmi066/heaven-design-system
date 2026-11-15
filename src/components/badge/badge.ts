import Template from "./badge.template.js";

// Variants are styled from the host attribute, so no script runs after render.
export class HdsBadge extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }).innerHTML = Template.render();
  }
}

if (!customElements.get("hds-badge")) {
  customElements.define("hds-badge", HdsBadge);
}

declare global {
  interface HTMLElementTagNameMap {
    "hds-badge": HdsBadge;
  }
}
