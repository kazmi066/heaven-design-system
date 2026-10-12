import Template from "./breadcrumbs.template.js";
import { BREADCRUMB_LABEL } from "./breadcrumbs.constants.js";
import type { BreadcrumbsState } from "./breadcrumbs.types.js";

export class HdsBreadcrumbs extends HTMLElement {
  static observedAttributes = ["label"];

  private readonly root: ShadowRoot;
  private readonly itemsObserver = new MutationObserver(() => {
    this.sync();
  });

  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });
    this.root.innerHTML = Template.render(this.state);
  }

  connectedCallback(): void {
    this.itemsObserver.observe(this, { childList: true });
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

  private get state(): BreadcrumbsState {
    return {
      label: this.getAttribute("label") || BREADCRUMB_LABEL,
    };
  }

  private sync(): void {
    const items = [...this.children].filter(
      (item): item is HTMLElement => item instanceof HTMLElement,
    );

    Template.update(this.root, this.state, items);
  }
}

if (!customElements.get("hds-breadcrumbs")) {
  customElements.define("hds-breadcrumbs", HdsBreadcrumbs);
}

declare global {
  interface HTMLElementTagNameMap {
    "hds-breadcrumbs": HdsBreadcrumbs;
  }
}
