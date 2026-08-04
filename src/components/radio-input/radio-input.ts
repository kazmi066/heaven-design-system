import Template, { css } from "./radio-input.template.js";
import type { RadioInputState } from "./radio-input.types.js";

let radioInputInstance = 0;

export class HdsRadioInput extends HTMLElement {
  static observedAttributes = [
    "label",
    "name",
    "value",
    "aria-label",
    "checked",
    "disabled",
    "required",
  ];

  private _input?: HTMLInputElement;
  private _checked?: boolean;

  connectedCallback(): void {
    if (!document.getElementById("hds-radio-input-styles")) {
      document.head.insertAdjacentHTML("beforeend", css());
    }

    if (!this._input) {
      const instanceId = ++radioInputInstance;

      this.innerHTML = Template.render({
        ...this.state,
        controlId: `hds-radio-input-${instanceId}-control`,
        labelId: `hds-radio-input-${instanceId}-label`,
      });

      const input = this.querySelector<HTMLInputElement>("input");

      if (!input) {
        throw new Error("Radio input control is unavailable.");
      }

      this._input = input;
    }

    this.sync();
  }

  attributeChangedCallback(
    name: string,
    _oldValue: string | null,
    newValue: string | null,
  ): void {
    if (name === "checked") {
      this._checked = newValue !== null;

      if (this._input) {
        this._input.defaultChecked = this._checked;
      }
    }

    if (this._input) {
      this.sync();
    }
  }

  get checked(): boolean {
    if (this._input) {
      return this._input.checked;
    }

    return this._checked === undefined
      ? this.hasAttribute("checked")
      : this._checked;
  }

  set checked(value: boolean) {
    this._checked = Boolean(value);

    if (this._input) {
      this._input.checked = this._checked;
    }
  }

  get disabled(): boolean {
    return this.hasAttribute("disabled");
  }

  set disabled(value: boolean) {
    this.toggleAttribute("disabled", value);
  }

  get name(): string {
    return this.getAttribute("name") || "";
  }

  set name(value: string) {
    if (value) {
      this.setAttribute("name", value);
    } else {
      this.removeAttribute("name");
    }
  }

  get value(): string {
    const value = this.getAttribute("value");

    return value === null ? "on" : value;
  }

  set value(value: string) {
    this.setAttribute("value", String(value));
  }

  get validity(): ValidityState {
    return this.input.validity;
  }

  get validationMessage(): string {
    return this.input.validationMessage;
  }

  get willValidate(): boolean {
    return this.input.willValidate;
  }

  checkValidity(): boolean {
    return this.input.checkValidity();
  }

  reportValidity(): boolean {
    return this.input.reportValidity();
  }

  override focus(options?: FocusOptions): void {
    this._input?.focus(options);
  }

  private get input(): HTMLInputElement {
    if (!this._input) {
      throw new Error("Radio input is not connected.");
    }

    return this._input;
  }

  private get state(): RadioInputState {
    return {
      label: this.getAttribute("label") || "",
      name: this.name,
      value: this.value,
      ariaLabel: this.getAttribute("aria-label") || "",
      checked: this.checked,
      disabled: this.disabled,
      required: this.hasAttribute("required"),
    };
  }

  private sync(): void {
    Template.update(this, this.state);
  }
}

if (!customElements.get("hds-radio-input")) {
  customElements.define("hds-radio-input", HdsRadioInput);
}

declare global {
  interface HTMLElementTagNameMap {
    "hds-radio-input": HdsRadioInput;
  }
}
