import Template, { css } from "./checkbox-input.template.js";
import type { CheckboxInputState } from "./checkbox-input.types.js";

let checkboxInputInstance = 0;

export class HdsCheckboxInput extends HTMLElement {
  static observedAttributes = [
    "label",
    "name",
    "value",
    "aria-label",
    "error-message",
    "checked",
    "indeterminate",
    "disabled",
    "required",
  ];

  private _input?: HTMLInputElement;
  private _checked?: boolean;
  private _indeterminate?: boolean;

  connectedCallback(): void {
    if (!document.getElementById("hds-checkbox-input-styles")) {
      document.head.insertAdjacentHTML("beforeend", css());
    }

    if (!this._input) {
      const instanceId = ++checkboxInputInstance;

      this.innerHTML = Template.render({
        ...this.state,
        controlId: `hds-checkbox-input-${instanceId}-control`,
        labelId: `hds-checkbox-input-${instanceId}-label`,
        errorId: `hds-checkbox-input-${instanceId}-error`,
      });

      const input = this.querySelector<HTMLInputElement>("input");

      if (!input) {
        throw new Error("Checkbox input control is unavailable.");
      }

      this._input = input;
      this._input.indeterminate =
        this._indeterminate ?? this.hasAttribute("indeterminate");
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

    if (name === "indeterminate") {
      this._indeterminate = newValue !== null;

      if (this._input) {
        this._input.indeterminate = this._indeterminate;
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

  get indeterminate(): boolean {
    if (this._input) {
      return this._input.indeterminate;
    }

    return this._indeterminate === undefined
      ? this.hasAttribute("indeterminate")
      : this._indeterminate;
  }

  set indeterminate(value: boolean) {
    this._indeterminate = Boolean(value);

    if (this._input) {
      this._input.indeterminate = this._indeterminate;
    }
  }

  get disabled(): boolean {
    return this.hasAttribute("disabled");
  }

  set disabled(value: boolean) {
    this.toggleAttribute("disabled", value);
  }

  get required(): boolean {
    return this.hasAttribute("required");
  }

  set required(value: boolean) {
    this.toggleAttribute("required", value);
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

  setCustomValidity(message: string): void {
    this.errorMessage = String(message);
  }

  override focus(options?: FocusOptions): void {
    this._input?.focus(options);
  }

  private get input(): HTMLInputElement {
    if (!this._input) {
      throw new Error("Checkbox input is not connected.");
    }

    return this._input;
  }

  private get state(): CheckboxInputState {
    return {
      label: this.getAttribute("label") || "",
      name: this.name,
      value: this.value,
      ariaLabel: this.getAttribute("aria-label") || "",
      errorMessage: this.errorMessage,
      checked: this.checked,
      indeterminate: this.indeterminate,
      disabled: this.disabled,
      required: this.required,
    };
  }

  private sync(): void {
    Template.update(this, this.state);
  }
}

if (!customElements.get("hds-checkbox-input")) {
  customElements.define("hds-checkbox-input", HdsCheckboxInput);
}

declare global {
  interface HTMLElementTagNameMap {
    "hds-checkbox-input": HdsCheckboxInput;
  }
}
