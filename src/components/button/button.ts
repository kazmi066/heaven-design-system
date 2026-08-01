import Template from "./button.template.js";
import {
  BUTTON_SIZES,
  BUTTON_TYPES,
  BUTTON_VARIANTS,
} from "./button.constants.js";
import type {
  ButtonSize,
  ButtonState,
  ButtonType,
  ButtonVariant,
} from "./button.types.js";

const includes = <T extends string>(values: readonly T[], value: string): value is T =>
  values.includes(value as T);

export class HdsButton extends HTMLElement {
  static observedAttributes = [
    "variant",
    "size",
    "type",
    "disabled",
    "loading",
    "loading-label",
  ];

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

  get loading(): boolean {
    return this.hasAttribute("loading");
  }

  set loading(value: boolean) {
    this.toggleAttribute("loading", value);
  }

  private get state(): ButtonState {
    const variant = this.getAttribute("variant") || "default";
    const size = this.getAttribute("size") || "m";
    const type = this.getAttribute("type") || "button";

    return {
      variant: includes(BUTTON_VARIANTS, variant)
        ? variant
        : ("default" satisfies ButtonVariant),
      size: includes(BUTTON_SIZES, size) ? size : ("m" satisfies ButtonSize),
      type: includes(BUTTON_TYPES, type)
        ? type
        : ("button" satisfies ButtonType),
      disabled: this.hasAttribute("disabled"),
      loading: this.loading,
      loadingLabel: this.getAttribute("loading-label") || "Loading…",
    };
  }

  private sync(): void {
    Template.update(this.root, this.state);
  }
}

if (!customElements.get("hds-button")) {
  customElements.define("hds-button", HdsButton);
}

declare global {
  interface HTMLElementTagNameMap {
    "hds-button": HdsButton;
  }
}
