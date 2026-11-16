import Template from "./text-input.template.js";
import { TEXT_INPUT_TYPES } from "./text-input.constants.js";
import { find } from "../shared/field.js";
import { HdsFormControl } from "../shared/form-control.js";
import type { TextInputState, TextInputType } from "./text-input.types.js";

const isTextInputType = (value: string): value is TextInputType =>
  TEXT_INPUT_TYPES.includes(value as TextInputType);

let textInputInstance = 0;

export class HdsTextInput extends HdsFormControl<HTMLInputElement> {
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

  protected readonly control: HTMLInputElement;
  private readonly toggle: HTMLButtonElement;
  private passwordVisible = false;

  constructor() {
    super();
    const instanceId = ++textInputInstance;

    this.root.innerHTML = Template.render({
      ...this.state,
      controlId: `hds-text-input-${instanceId}-control`,
      errorId: `hds-text-input-${instanceId}-error`,
    });
    this.control = find<HTMLInputElement>(this.root, "input");
    this.toggle = find<HTMLButtonElement>(this.root, "[data-password-toggle]");
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.control.addEventListener("keydown", this.handleKeydown);
    this.toggle.addEventListener("click", this.handleToggle);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.control.removeEventListener("keydown", this.handleKeydown);
    this.toggle.removeEventListener("click", this.handleToggle);
  }

  override attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null,
  ): void {
    if (name === "type" && newValue !== "password") {
      this.passwordVisible = false;
    }

    super.attributeChangedCallback(name, oldValue, newValue);
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
      passwordVisible: this.passwordVisible,
      disabled: this.matches(":disabled"),
      readonly: this.hasAttribute("readonly"),
      required: this.hasAttribute("required"),
    };
  }

  protected render(): void {
    Template.update(this.root, this.state);
  }

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

    this.passwordVisible = !this.passwordVisible;
    this.sync();
  };
}

if (!customElements.get("hds-text-input")) {
  customElements.define("hds-text-input", HdsTextInput);
}

declare global {
  interface HTMLElementTagNameMap {
    "hds-text-input": HdsTextInput;
  }
}
