import Template from "./alert.template.js";

export class HdsAlert extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }).innerHTML = Template.render();
  }
}

if (!customElements.get("hds-alert")) {
  customElements.define("hds-alert", HdsAlert);
}

declare global {
  interface HTMLElementTagNameMap {
    "hds-alert": HdsAlert;
  }
}
