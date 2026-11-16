import Template from "./button.template.js";
import { BUTTON_TYPES } from "./button.constants.js";
import type { ButtonState, ButtonType } from "./button.types.js";

const includes = <T extends string>(
  values: readonly T[],
  value: string,
): value is T => values.includes(value as T);

export class HdsButton extends HTMLElement {
  static formAssociated = true;
  static observedAttributes = ["type", "disabled", "loading", "loading-label"];

  private readonly root: ShadowRoot;
  private readonly internals = this.attachInternals();

  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });
    this.root.innerHTML = Template.render(this.state);
  }

  connectedCallback(): void {
    this.root.addEventListener("click", this.handleClick);
    this.sync();
  }

  disconnectedCallback(): void {
    this.root.removeEventListener("click", this.handleClick);
  }

  formDisabledCallback(): void {
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
    const type = this.getAttribute("type") || "button";

    return {
      type: includes(BUTTON_TYPES, type)
        ? type
        : ("button" satisfies ButtonType),
      disabled: this.matches(":disabled"),
      loading: this.loading,
      loadingLabel: this.getAttribute("loading-label") || "Loading…",
    };
  }

  // The inner button sits in the shadow tree and has no form owner, so the
  // host submits or resets its form.
  private readonly handleClick = (): void => {
    const { form } = this.internals;
    const { type, disabled, loading } = this.state;

    if (!form || disabled || loading) {
      return;
    }

    if (type === "submit") {
      form.requestSubmit();
    } else if (type === "reset") {
      form.reset();
    }
  };

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
