import Template from "./text-input.template.js";
import { TEXT_INPUT_TYPES } from "./text-input.constants.js";
import type { TextInputState, TextInputType } from "./text-input.types.js";

const isTextInputType = (value: string): value is TextInputType =>
  TEXT_INPUT_TYPES.includes(value as TextInputType);

let textInputInstance = 0;

export class HdsTextInput extends HTMLElement {
  static formAssociated = true;
  static observedAttributes = [
    "label",
    "type",
    "name",
    "placeholder",
    "autocomplete",
    "value",
    "aria-label",
    "error-message",
    "disabled",
    "readonly",
    "required",
  ];

  private readonly root: ShadowRoot;
  private readonly internals = this.attachInternals();
  private readonly _input: HTMLInputElement;
  private readonly _toggle: HTMLButtonElement;
  private _passwordVisible = false;

  constructor() {
    super();
    const instanceId = ++textInputInstance;

    this.root = this.attachShadow({ mode: "open" });
    this.root.innerHTML = Template.render({
      ...this.state,
      controlId: `hds-text-input-${instanceId}-control`,
      errorId: `hds-text-input-${instanceId}-error`,
    });
    const input = this.root.querySelector<HTMLInputElement>("input");
    const toggle = this.root.querySelector<HTMLButtonElement>(
      "[data-password-toggle]",
    );

    if (!input || !toggle) {
      throw new Error("Text input control is unavailable.");
    }

    this._input = input;
    this._toggle = toggle;
  }

  connectedCallback(): void {
    this._input.addEventListener("input", this.handleInput);
    this._input.addEventListener("keydown", this.handleKeydown);
    this._toggle.addEventListener("click", this.handleToggle);
    this.sync();
  }

  disconnectedCallback(): void {
    this._input.removeEventListener("input", this.handleInput);
    this._input.removeEventListener("keydown", this.handleKeydown);
    this._toggle.removeEventListener("click", this.handleToggle);
  }

  attributeChangedCallback(
    name: string,
    _oldValue: string | null,
    newValue: string | null,
  ): void {
    if (name === "value") {
      this._input.value = newValue || "";
    }

    if (name === "type" && newValue !== "password") {
      this._passwordVisible = false;
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

  private get state(): TextInputState {
    const type = this.getAttribute("type") || "text";

    return {
      label: this.getAttribute("label") || "",
      type: isTextInputType(type) ? type : "text",
      name: this.getAttribute("name") || "",
      placeholder: this.getAttribute("placeholder") || "",
      autocomplete: this.getAttribute("autocomplete") || "",
      ariaLabel: this.getAttribute("aria-label") || "",
      errorMessage: this.errorMessage,
      passwordVisible: this._passwordVisible,
      disabled: this.matches(":disabled"),
      readonly: this.hasAttribute("readonly"),
      required: this.hasAttribute("required"),
    };
  }

  private readonly handleInput = (): void => {
    this.sync();
  };

  // A shadow input has no form owner, so Enter does not submit on its own.
  private readonly handleKeydown = (event: KeyboardEvent): void => {
    if (event.key === "Enter" && !event.isComposing) {
      this.internals.form?.requestSubmit();
    }
  };

  private readonly handleToggle = (): void => {
    if (this.getAttribute("type") !== "password") {
      return;
    }

    this._passwordVisible = !this._passwordVisible;
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

if (!customElements.get("hds-text-input")) {
  customElements.define("hds-text-input", HdsTextInput);
}

declare global {
  interface HTMLElementTagNameMap {
    "hds-text-input": HdsTextInput;
  }
}
