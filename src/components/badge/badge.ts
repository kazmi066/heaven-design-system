import Template from "./badge.template.js";

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
