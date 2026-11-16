import Template from "./range-input.template.js";
import { find } from "../shared/field.js";
import { HdsFormControl } from "../shared/form-control.js";
import type { RangeInputState } from "./range-input.types.js";

let rangeInputInstance = 0;

export class HdsRangeInput extends HdsFormControl<HTMLInputElement> {
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

  protected readonly control: HTMLInputElement;

  constructor() {
    super();
    const instanceId = ++rangeInputInstance;

    this.root.innerHTML = Template.render({
      ...this.state,
      controlId: `hds-range-input-${instanceId}-control`,
      errorId: `hds-range-input-${instanceId}-error`,
    });
    this.control = find<HTMLInputElement>(this.root, "input");
  }

  private get state(): RangeInputState {
    return {
      label: this.getAttribute("label") || "",
      name: this.getAttribute("name") || "",
      value: this.getAttribute("value") || "",
      min: this.getAttribute("min") || "0",
      max: this.getAttribute("max") || "100",
      step: this.getAttribute("step") || "1",
      ariaLabel: this.getAttribute("aria-label") || "",
      errorMessage: this.errorMessage,
      disabled: this.matches(":disabled"),
    };
  }

  // Blink and WebKit have no fill pseudo-element, so the readout and the
  // track fill follow the native value on every input.
  protected render(): void {
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
