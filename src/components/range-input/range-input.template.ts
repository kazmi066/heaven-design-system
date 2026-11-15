import type {
  RangeInputState,
  RangeInputTemplateArgs,
} from "./range-input.types.js";

const progressPercent = (min: string, max: string, value: string): string => {
  const minValue = Number(min);
  const maxValue = Number(max);
  const span = maxValue - minValue;
  const current = value === "" ? (minValue + maxValue) / 2 : Number(value);

  if (
    !Number.isFinite(minValue) ||
    !Number.isFinite(maxValue) ||
    !Number.isFinite(current) ||
    span === 0
  ) {
    return "0%";
  }

  const percent = ((current - minValue) / span) * 100;

  return `${Math.min(100, Math.max(0, percent))}%`;
};

export const css = (): string => `
  <style>
    :host {
      display: block;
    }

    :host([hidden]) {
      display: none;
    }

    .hds-range-input {
      display: grid;
      gap: var(--hds-space-2xs);
      font-family: var(--hds-font-family);
    }

    .hds-range-input__header {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: var(--hds-space-xs);
    }

    .hds-range-input__label {
      color: var(--hds-color-text);
      font-size: var(--hds-font-size-sm);
      font-weight: var(--hds-font-weight-medium);
      line-height: var(--hds-line-height-tight);
    }

    .hds-range-input__value {
      color: var(--hds-color-text-weak);
      font-size: var(--hds-font-size-sm);
      font-variant-numeric: tabular-nums;
      line-height: var(--hds-line-height-tight);
    }

    .hds-range-input__control {
      --hds-range-fill: var(--hds-color-accent);
      --hds-range-progress: 50%;
      display: block;
      box-sizing: border-box;
      width: 100%;
      min-width: 12rem;
      height: 1.25rem;
      margin: 0;
      appearance: none;
      -webkit-appearance: none;
      accent-color: var(--hds-color-accent);
      background: transparent;
      cursor: pointer;
      outline: none;

      &[aria-invalid="true"] {
        --hds-range-fill: var(--hds-color-danger);
      }

      &:disabled {
        cursor: not-allowed;
        opacity: 0.65;
      }
    }

    .hds-range-input__control::-webkit-slider-runnable-track {
      height: 0.25rem;
      border-radius: var(--hds-radius-full);
      background: linear-gradient(
        to right,
        var(--hds-range-fill) 0%,
        var(--hds-range-fill) var(--hds-range-progress),
        var(--hds-color-border-strong) var(--hds-range-progress),
        var(--hds-color-border-strong) 100%
      );
    }

    .hds-range-input__control::-webkit-slider-thumb {
      appearance: none;
      -webkit-appearance: none;
      box-sizing: border-box;
      width: 1rem;
      height: 1rem;
      margin-top: -0.375rem;
      border: 1px var(--hds-border-style-solid) var(--hds-color-border);
      border-radius: var(--hds-radius-full);
      background: var(--hds-color-surface);
      box-shadow: var(--hds-shadow-sm);
      transition-property: border-color, box-shadow;
      transition-duration: var(--hds-duration-normal);
      transition-timing-function: var(--hds-ease-out);
    }

    .hds-range-input__control:hover:not(:disabled)::-webkit-slider-thumb {
      border-color: var(--hds-color-border-hover);
    }

    .hds-range-input__control:focus-visible::-webkit-slider-thumb {
      border-color: var(--hds-color-accent);
      outline: 2px solid var(--hds-color-accent);
      outline-offset: 2px;
    }

    .hds-range-input__control[aria-invalid="true"]:focus-visible::-webkit-slider-thumb {
      border-color: var(--hds-color-danger);
      outline-color: var(--hds-color-danger);
    }

    .hds-range-input__control::-moz-range-track {
      height: 0.25rem;
      border: 0;
      border-radius: var(--hds-radius-full);
      background: var(--hds-color-border-strong);
    }

    .hds-range-input__control::-moz-range-progress {
      height: 0.25rem;
      border-radius: var(--hds-radius-full);
      background: var(--hds-range-fill);
    }

    .hds-range-input__control::-moz-range-thumb {
      box-sizing: border-box;
      width: 1rem;
      height: 1rem;
      border: 1px var(--hds-border-style-solid) var(--hds-color-border);
      border-radius: var(--hds-radius-full);
      background: var(--hds-color-surface);
      box-shadow: var(--hds-shadow-sm);
    }

    .hds-range-input__control:hover:not(:disabled)::-moz-range-thumb {
      border-color: var(--hds-color-border-hover);
    }

    .hds-range-input__control:focus-visible::-moz-range-thumb {
      border-color: var(--hds-color-accent);
      outline: 2px solid var(--hds-color-accent);
      outline-offset: 2px;
    }

    .hds-range-input__control[aria-invalid="true"]:focus-visible::-moz-range-thumb {
      border-color: var(--hds-color-danger);
      outline-color: var(--hds-color-danger);
    }

    .hds-range-input__error {
      margin: 0;
      color: var(--hds-color-danger);
      font-size: var(--hds-font-size-sm);
      line-height: var(--hds-line-height-normal);
    }

    .hds-range-input__label:empty,
    .hds-range-input__error:empty {
      display: none;
    }

    @media (prefers-reduced-motion: reduce) {
      .hds-range-input__control::-webkit-slider-thumb {
        transition-duration: var(--hds-duration-instant);
      }
    }

    @media (forced-colors: active) {
      /* Separate rules: a list with an unknown vendor pseudo drops entirely. */
      .hds-range-input__control::-webkit-slider-thumb {
        background: Canvas;
        border-color: ButtonText;
      }

      .hds-range-input__control::-moz-range-thumb {
        background: Canvas;
        border-color: ButtonText;
      }

      .hds-range-input__control::-moz-range-progress {
        background: Highlight;
      }
    }
  </style>
`;

const attribute = (name: string, value: string): string =>
  value ? `${name}="${value}"` : "";

export const html = ({
  label = "",
  name = "",
  value = "",
  min = "0",
  max = "100",
  step = "1",
  ariaLabel = "",
  errorMessage = "",
  disabled = false,
  controlId = "hds-range-input-control",
  errorId = "hds-range-input-error",
}: RangeInputTemplateArgs = {}): string => `
  <div class="hds-range-input">
    <div class="hds-range-input__header">
      <label
        class="hds-range-input__label"
        for="${controlId}"
        data-label
      >${label}</label>
      <output
        class="hds-range-input__value"
        for="${controlId}"
        data-value
        aria-hidden="true"
      >${value}</output>
    </div>
    <input
      class="hds-range-input__control"
      id="${controlId}"
      type="range"
      style="--hds-range-progress: ${progressPercent(min, max, value)}"
      ${attribute("name", name)}
      ${attribute("value", value)}
      min="${min}"
      max="${max}"
      step="${step}"
      ${attribute("aria-label", ariaLabel)}
      ${disabled ? "disabled" : ""}
    />
    <p
      class="hds-range-input__error"
      id="${errorId}"
      data-error
      role="alert"
    >${errorMessage}</p>
  </div>
`;

const setStringAttribute = (
  element: HTMLElement,
  name: string,
  value: string,
): void => {
  if (value) {
    element.setAttribute(name, value);
  } else {
    element.removeAttribute(name);
  }
};

const Template = {
  render(args: RangeInputTemplateArgs = {}): string {
    return `
      ${css()}
      ${html(args)}
    `;
  },

  update(root: ShadowRoot, state: RangeInputState): void {
    const label = root.querySelector<HTMLLabelElement>("[data-label]");
    const output = root.querySelector<HTMLOutputElement>("[data-value]");
    const input = root.querySelector<HTMLInputElement>(
      ".hds-range-input__control",
    );
    const error = root.querySelector<HTMLElement>("[data-error]");

    if (!label || !output || !input || !error) {
      throw new Error("Range input template is missing required elements.");
    }

    label.textContent = state.label;

    input.min = state.min;
    input.max = state.max;
    input.step = state.step;
    input.disabled = state.disabled;

    setStringAttribute(input, "name", state.name);
    setStringAttribute(input, "aria-label", state.label ? "" : state.ariaLabel);

    output.textContent = input.value;
    input.style.setProperty(
      "--hds-range-progress",
      progressPercent(input.min, input.max, input.value),
    );

    const hasError = Boolean(state.errorMessage);

    input.setCustomValidity(state.errorMessage);

    error.textContent = state.errorMessage;

    if (hasError) {
      input.setAttribute("aria-invalid", "true");
      input.setAttribute("aria-describedby", error.id);
    } else {
      input.removeAttribute("aria-invalid");
      input.removeAttribute("aria-describedby");
    }
  },
};

export default Template;
