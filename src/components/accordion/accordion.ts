import { css } from "./accordion.template.js";

export class HdsAccordion extends HTMLElement {
  connectedCallback(): void {
    if (!document.getElementById("hds-accordion-styles")) {
      document.head.insertAdjacentHTML("beforeend", css());
    }
  }
}

if (!customElements.get("hds-accordion")) {
  customElements.define("hds-accordion", HdsAccordion);
}

declare global {
  interface HTMLElementTagNameMap {
    "hds-accordion": HdsAccordion;
  }
}
