import Template from "./select-input.template.js";
import { find } from "../shared/field.js";
import { HdsFormControl } from "../shared/form-control.js";
import type { SelectInputState } from "./select-input.types.js";

let selectInputInstance = 0;

export class HdsSelectInput extends HdsFormControl<HTMLSelectElement> {
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

  protected readonly control: HTMLSelectElement;

  constructor() {
    super();
    const instanceId = ++selectInputInstance;

    this.root.innerHTML = Template.render({
      ...this.state,
      controlId: `hds-select-input-${instanceId}-control`,
      errorId: `hds-select-input-${instanceId}-error`,
    });
    this.control = find<HTMLSelectElement>(this.root, "select");
  }

  get options(): HTMLOptionsCollection {
    return this.control.options;
  }

  get selectedIndex(): number {
    return this.control.selectedIndex;
  }

  set selectedIndex(value: number) {
    this.control.selectedIndex = value;
    this.sync();
  }

  private get state(): SelectInputState {
    return {
      label: this.getAttribute("label") || "",
      name: this.getAttribute("name") || "",
      placeholder: this.getAttribute("placeholder") || "",
      ariaLabel: this.getAttribute("aria-label") || "",
      errorMessage: this.errorMessage,
      options: Array.from(this.children).map((child) => ({
        value: child.getAttribute("value") ?? "",
        label: child.textContent ?? "",
        disabled: child.hasAttribute("disabled"),
      })),
      disabled: this.matches(":disabled"),
      required: this.hasAttribute("required"),
    };
  }

  protected render(): void {
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
