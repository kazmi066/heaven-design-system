import Template from "./accordion.template.js";
import type { AccordionState } from "./accordion.types.js";

export class HdsAccordion extends HTMLElement {
  static observedAttributes = ["exclusive"];

  private readonly root: ShadowRoot;
  private readonly itemsObserver = new MutationObserver(() => {
    this.sync();
  });

  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });
    this.root.innerHTML = Template.render();
    this.root.addEventListener("toggle", this.handleToggle, true);
  }

  connectedCallback(): void {
    this.itemsObserver.observe(this, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["heading", "open"],
    });
    this.sync();
  }

  disconnectedCallback(): void {
    this.itemsObserver.disconnect();
  }

  attributeChangedCallback(): void {
    if (this.isConnected && this.root.hasChildNodes()) {
      this.sync();
    }
  }

  private get state(): AccordionState {
    return {
      exclusive: this.hasAttribute("exclusive"),
    };
  }

  private get items(): HTMLElement[] {
    return [...this.children].filter(
      (item): item is HTMLElement => item instanceof HTMLElement,
    );
  }

  private readonly handleToggle = (event: Event): void => {
    const rows = [...this.root.querySelectorAll(".hds-accordion > details")];
    const index = rows.indexOf(event.target as Element);

    if (index >= 0) {
      this.items[index]?.toggleAttribute(
        "open",
        (event.target as HTMLDetailsElement).open,
      );
      // The change came from the shadow DOM, so don't push it back.
      this.itemsObserver.takeRecords();
    }
  };

  private sync(): void {
    Template.update(this.root, this.state, this.items);
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
