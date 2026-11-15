import Template from "./range-input.template.js";
import type { RangeInputState } from "./range-input.types.js";

let rangeInputInstance = 0;

export class HdsRangeInput extends HTMLElement {
  static formAssociated = true;
  static observedAttributes = [
    "label",
    "name",
    "value",
    "min",
    "max",
    "step",
    "aria-label",
    "error-message",
    "disabled",
  ];

  private readonly root: ShadowRoot;
  private readonly internals = this.attachInternals();
  private readonly _input: HTMLInputElement;

  constructor() {
    super();
    const instanceId = ++rangeInputInstance;

    this.root = this.attachShadow({ mode: "open" });
    this.root.innerHTML = Template.render({
      ...this.state,
      controlId: `hds-range-input-${instanceId}-control`,
      errorId: `hds-range-input-${instanceId}-error`,
    });
    const input = this.root.querySelector<HTMLInputElement>("input");

    if (!input) {
      throw new Error("Range input control is unavailable.");
    }

    this._input = input;
  }

  connectedCallback(): void {
    this._input.addEventListener("input", this.handleInput);
    this.sync();
  }

  disconnectedCallback(): void {
    this._input.removeEventListener("input", this.handleInput);
  }

  attributeChangedCallback(
    name: string,
    _oldValue: string | null,
    newValue: string | null,
  ): void {
    if (name === "value") {
      this._input.value = newValue || "";
    }

    if (this.root.hasChildNodes()) {
      this.sync();
    }
  }

  get value(): string {
    return this._input.value;
  }

  set value(value: string) {
    this._input.value = value;
    this.sync();
  }

  formResetCallback(): void {
    this._input.value = this.getAttribute("value") || "";
    this.sync();
  }

  // Fires for the host's own disabled attribute and for a disabled fieldset.
  formDisabledCallback(): void {
    this.sync();
  }

  formStateRestoreCallback(state: string): void {
    this._input.value = state;
    this.sync();
  }

  get errorMessage(): string {
    return this.getAttribute("error-message") || "";
  }

  set errorMessage(value: string) {
    if (value) {
      this.setAttribute("error-message", value);
    } else {
      this.removeAttribute("error-message");
    }
  }

  get validity(): ValidityState {
    return this._input.validity;
  }

  get validationMessage(): string {
    return this._input.validationMessage;
  }

  get willValidate(): boolean {
    return this._input.willValidate;
  }

  checkValidity(): boolean {
    return this._input.checkValidity();
  }

  reportValidity(): boolean {
    return this._input.reportValidity();
  }

  override focus(options?: FocusOptions): void {
    this._input.focus(options);
  }

  private get state(): RangeInputState {
    return {
      label: this.getAttribute("label") || "",
      name: this.getAttribute("name") || "",
      value: this.getAttribute("value") || "",
      min: this.getAttribute("min") || "0",
      max: this.getAttribute("max") || "100",
      step: this.getAttribute("step") || "1",
      ariaLabel: this.getAttribute("aria-label") || "",
      errorMessage: this.errorMessage,
      disabled: this.matches(":disabled"),
    };
  }

  // Blink and WebKit have no fill pseudo-element, so the readout and the
  // track fill follow the native value from here.
  private readonly handleInput = (): void => {
    this.sync();
  };

  private sync(): void {
    Template.update(this.root, this.state);

    // The control lives in the shadow tree, so the form cannot see it. Hand
    // its value and validity to the form through ElementInternals.
    this.internals.setFormValue(this._input.value);
    this.internals.setValidity(
      this._input.validity,
      this._input.validationMessage,
      this._input,
    );
  }
}

if (!customElements.get("hds-range-input")) {
  customElements.define("hds-range-input", HdsRangeInput);
}

declare global {
  interface HTMLElementTagNameMap {
    "hds-range-input": HdsRangeInput;
  }
}
