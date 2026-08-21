import Template, { css } from "./textarea-input.template.js";
import type { TextareaInputState } from "./textarea-input.types.js";

let textareaInputInstance = 0;

export class HdsTextareaInput extends HTMLElement {
  static observedAttributes = [
    "label",
    "name",
    "placeholder",
    "value",
    "aria-label",
    "error-message",
    "rows",
    "readonly",
    "disabled",
    "required",
  ];

  private _textarea?: HTMLTextAreaElement;
  private _value?: string;

  connectedCallback(): void {
    if (!document.getElementById("hds-textarea-input-styles")) {
      document.head.insertAdjacentHTML("beforeend", css());
    }

    if (!this._textarea) {
      const instanceId = ++textareaInputInstance;

      this.innerHTML = Template.render({
        ...this.state,
        controlId: `hds-textarea-input-${instanceId}-control`,
        labelId: `hds-textarea-input-${instanceId}-label`,
        errorId: `hds-textarea-input-${instanceId}-error`,
      });

      const textarea = this.querySelector<HTMLTextAreaElement>("textarea");

      if (!textarea) {
        throw new Error("Textarea input control is unavailable.");
      }

      this._textarea = textarea;
      this._textarea.addEventListener("input", this.handleInput);
    }

    this.sync();
  }

  disconnectedCallback(): void {
    this._textarea?.removeEventListener("input", this.handleInput);
  }

  attributeChangedCallback(
    name: string,
    _oldValue: string | null,
    newValue: string | null,
  ): void {
    if (name === "value") {
      this._value = newValue ?? "";
    }

    if (this._textarea) {
      this.sync();
    }
  }

  get value(): string {
    return this._textarea?.value ?? this._value ?? "";
  }

  set value(value: string) {
    this._value = String(value ?? "");

    if (this._textarea) {
      this._textarea.value = this._value;
    }
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
    return this.textarea.validity;
  }

  get validationMessage(): string {
    return this.textarea.validationMessage;
  }

  get willValidate(): boolean {
    return this.textarea.willValidate;
  }

  checkValidity(): boolean {
    return this.textarea.checkValidity();
  }

  reportValidity(): boolean {
    return this.textarea.reportValidity();
  }

  override focus(options?: FocusOptions): void {
    this._textarea?.focus(options);
  }

  private get textarea(): HTMLTextAreaElement {
    if (!this._textarea) {
      throw new Error("Textarea input is not connected.");
    }

    return this._textarea;
  }

  private get state(): TextareaInputState {
    const rows = Number(this.getAttribute("rows"));

    return {
      label: this.getAttribute("label") || "",
      name: this.getAttribute("name") || "",
      placeholder: this.getAttribute("placeholder") || "",
      value: this._value ?? this.getAttribute("value") ?? "",
      ariaLabel: this.getAttribute("aria-label") || "",
      errorMessage: this.errorMessage,
      rows: Number.isNaN(rows) ? 3 : rows,
      readonly: this.hasAttribute("readonly"),
      disabled: this.hasAttribute("disabled"),
      required: this.hasAttribute("required"),
    };
  }

  private readonly handleInput = (event: Event): void => {
    if (event.target instanceof HTMLTextAreaElement) {
      this._value = event.target.value;
    }
  };

  private sync(): void {
    Template.update(this, this.state);
  }
}

if (!customElements.get("hds-textarea-input")) {
  customElements.define("hds-textarea-input", HdsTextareaInput);
}

declare global {
  interface HTMLElementTagNameMap {
    "hds-textarea-input": HdsTextareaInput;
  }
}
