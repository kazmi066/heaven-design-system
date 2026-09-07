import Template from "./range-input.template.js";
import type { RangeInputState } from "./range-input.types.js";

let rangeInputInstance = 0;

export class HdsRangeInput extends HTMLElement {
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
  private readonly _input: HTMLInputElement;
  private _value?: string;

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
      this._value = newValue ?? "";
    }

    if (this.root.hasChildNodes()) {
      this.sync();
    }
  }

  get value(): string {
    return this._input.value;
  }

  set value(value: string) {
    this._value = String(value ?? "");

    this._input.value = this._value;
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
      value: this._value ?? this.getAttribute("value") ?? "",
      min: this.getAttribute("min") || "0",
      max: this.getAttribute("max") || "100",
      step: this.getAttribute("step") || "1",
      ariaLabel: this.getAttribute("aria-label") || "",
      errorMessage: this.errorMessage,
      disabled: this.hasAttribute("disabled"),
    };
  }

  private readonly handleInput = (event: Event): void => {
    if (event.target instanceof HTMLInputElement) {
      this._value = event.target.value;
      this.sync();
    }
  };

  private sync(): void {
    Template.update(this.root, this.state);
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
