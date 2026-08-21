import Template from "./badge.template.js";
import { BADGE_VARIANTS } from "./badge.constants.js";
import type { BadgeState, BadgeVariant } from "./badge.types.js";

const isBadgeVariant = (value: string): value is BadgeVariant =>
  BADGE_VARIANTS.includes(value as BadgeVariant);

export class HdsBadge extends HTMLElement {
  static observedAttributes = ["variant"];

  private readonly root: ShadowRoot;

  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });
    this.root.innerHTML = Template.render(this.state);
  }

  connectedCallback(): void {
    this.sync();
  }

  attributeChangedCallback(): void {
    if (this.root.hasChildNodes()) {
      this.sync();
    }
  }

  private get state(): BadgeState {
    const variant = this.getAttribute("variant") || "default";

    return {
      variant: isBadgeVariant(variant)
        ? variant
        : ("default" satisfies BadgeVariant),
    };
  }

  private sync(): void {
    Template.update(this.root, this.state);
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
