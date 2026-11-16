import { setStringAttribute } from "./field.js";

type Control = HTMLInputElement | HTMLSelectElement;

export abstract class HdsFormControl<T extends Control> extends HTMLElement {
  static formAssociated = true;

  protected readonly root = this.attachShadow({ mode: "open" });
  protected readonly internals = this.attachInternals();
  protected abstract readonly control: T;

  connectedCallback(): void {
    this.control.addEventListener("input", this.handleInput);
    this.sync();
  }

  disconnectedCallback(): void {
    this.control.removeEventListener("input", this.handleInput);
  }

  attributeChangedCallback(
    name: string,
    _oldValue: string | null,
    newValue: string | null,
  ): void {
    if (name === "value") {
      this.control.value = newValue || "";
    }

    this.sync();
  }

  get value(): string {
    return this.control.value;
  }

  set value(value: string) {
    this.control.value = value;
    this.sync();
  }

  formResetCallback(): void {
    this.value = this.getAttribute("value") || "";
  }

  formDisabledCallback(): void {
    this.sync();
  }

  formStateRestoreCallback(state: string): void {
    this.value = state;
  }

  get errorMessage(): string {
    return this.getAttribute("error-message") || "";
  }

  set errorMessage(value: string) {
    setStringAttribute(this, "error-message", value);
  }

  get validity(): ValidityState {
    return this.control.validity;
  }

  get validationMessage(): string {
    return this.control.validationMessage;
  }

  get willValidate(): boolean {
    return this.control.willValidate;
  }

  checkValidity(): boolean {
    return this.control.checkValidity();
  }

  reportValidity(): boolean {
    return this.control.reportValidity();
  }

  override focus(options?: FocusOptions): void {
    this.control.focus(options);
  }

  protected abstract render(): void;

  protected sync(): void {
    this.render();
    this.internals.setFormValue(this.control.value);
    this.internals.setValidity(
      this.control.validity,
      this.control.validationMessage,
      this.control,
    );
  }

  private readonly handleInput = (): void => {
    this.sync();
  };
}
