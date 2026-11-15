import { css } from "./accordion.template.js";

// The sections are native details elements written by the consumer, so the
// browser handles toggling, keyboard support, and exclusive groups (via the
// name attribute). The element only supplies the styles.
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
