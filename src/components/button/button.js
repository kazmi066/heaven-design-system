import Template from "./template.js";
import { ButtonTypes } from "../../constants/button.constants.js";

export class HdsButton extends HTMLElement {
  static observedAttributes = [
    "variant",
    "size",
    "type",
    "disabled",
    "loading",
    "loading-label",
  ];

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    if (!this.shadowRoot.hasChildNodes()) {
      this.shadowRoot.innerHTML = Template.render(this._state);
    }

    this._sync();
  }

  attributeChangedCallback() {
    if (this.shadowRoot.hasChildNodes()) {
      this._sync();
    }
  }

  get loading() {
    return this.hasAttribute("loading");
  }

  set loading(value) {
    this.toggleAttribute("loading", Boolean(value));
  }

  get _state() {
    const type = this.getAttribute("type") || "button";

    return {
      variant: this.getAttribute("variant") || "default",
      size: this.getAttribute("size") || "m",
      type: ButtonTypes.includes(type) ? type : "button",
      disabled: this.hasAttribute("disabled"),
      loading: this.loading,
      loadingLabel: this.getAttribute("loading-label") || "Loading…",
    };
  }

  _sync() {
    Template.update(this.shadowRoot, this._state);
  }
}

if (!customElements.get("hds-button")) {
  customElements.define("hds-button", HdsButton);
}
