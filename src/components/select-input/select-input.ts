import Template from "./select-input.template.js";
import type { SelectInputState } from "./select-input.types.js";

let selectInputInstance = 0;

export class HdsSelectInput extends HTMLElement {
  static observedAttributes = [
    "label",
    "name",
    "placeholder",
    "value",
    "aria-label",
    "error-message",
    "disabled",
    "required",
  ];

  private readonly root: ShadowRoot;
  private readonly _select: HTMLSelectElement;
  private _value?: string;

  constructor() {
    super();
    const instanceId = ++selectInputInstance;

    this.root = this.attachShadow({ mode: "open" });
    this.root.innerHTML = Template.render({
      ...this.state,
      controlId: `hds-select-input-${instanceId}-control`,
      errorId: `hds-select-input-${instanceId}-error`,
    });
    const select = this.root.querySelector<HTMLSelectElement>("select");

    if (!select) {
      throw new Error("Select input control is unavailable.");
    }

    this._select = select;
  }

  connectedCallback(): void {
    this._select.addEventListener("change", this.handleChange);
    this.sync();
  }

  disconnectedCallback(): void {
    this._select.removeEventListener("change", this.handleChange);
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
    return this._select.value;
  }

  set value(value: string) {
    this._value = String(value ?? "");

    this._select.value = this._value;
  }

  get options(): HTMLOptionsCollection {
    return this._select.options;
  }

  get selectedIndex(): number {
    return this._select.selectedIndex;
  }

  set selectedIndex(value: number) {
    this._select.selectedIndex = value;
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
    return this._select.validity;
  }

  get validationMessage(): string {
    return this._select.validationMessage;
  }

  get willValidate(): boolean {
    return this._select.willValidate;
  }

  checkValidity(): boolean {
    return this._select.checkValidity();
  }

  reportValidity(): boolean {
    return this._select.reportValidity();
  }

  override focus(options?: FocusOptions): void {
    this._select.focus(options);
  }

  private get state(): SelectInputState {
    return {
      label: this.getAttribute("label") || "",
      name: this.getAttribute("name") || "",
      placeholder: this.getAttribute("placeholder") || "",
      value: this._value ?? this.getAttribute("value") ?? "",
      ariaLabel: this.getAttribute("aria-label") || "",
      errorMessage: this.errorMessage,
      options: Array.from(this.children).map((child) => ({
        value: child.getAttribute("value") ?? "",
        label: child.textContent ?? "",
        disabled: child.hasAttribute("disabled"),
      })),
      disabled: this.hasAttribute("disabled"),
      required: this.hasAttribute("required"),
    };
  }

  private readonly handleChange = (event: Event): void => {
    if (event.target instanceof HTMLSelectElement) {
      this._value = event.target.value;
    }
  };

  private sync(): void {
    Template.update(this.root, this.state);
  }
}

if (!customElements.get("hds-select-input")) {
  customElements.define("hds-select-input", HdsSelectInput);
}

declare global {
  interface HTMLElementTagNameMap {
    "hds-select-input": HdsSelectInput;
  }
}
