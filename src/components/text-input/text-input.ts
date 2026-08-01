import Template from "./text-input.template.js";
import { TEXT_INPUT_TYPES } from "./text-input.constants.js";
import type { TextInputState, TextInputType } from "./text-input.types.js";

const isTextInputType = (value: string): value is TextInputType =>
  TEXT_INPUT_TYPES.includes(value as TextInputType);

let textInputInstance = 0;

export class HdsTextInput extends HTMLElement {
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
  private readonly _input: HTMLInputElement;
  private _value?: string;

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

    if (!input) {
      throw new Error("Text input control is unavailable.");
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
      value: this._value ?? this.getAttribute("value") ?? "",
      ariaLabel: this.getAttribute("aria-label") || "",
      errorMessage: this.errorMessage,
      disabled: this.hasAttribute("disabled"),
      readonly: this.hasAttribute("readonly"),
      required: this.hasAttribute("required"),
    };
  }

  private readonly handleInput = (event: Event): void => {
    if (event.target instanceof HTMLInputElement) {
      this._value = event.target.value;
    }
  };

  private sync(): void {
    Template.update(this.root, this.state);
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
