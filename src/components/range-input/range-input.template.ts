import {
  attribute,
  errorStyles,
  find,
  setError,
  setStringAttribute,
} from "../shared/field.js";
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
      align-items: center;
      justify-content: space-between;
      gap: var(--hds-space-xs);
    }

    .hds-range-input__label {
      color: var(--hds-color-text);
      font-size: var(--hds-font-size-sm);
      font-weight: var(--hds-font-weight-medium);
      line-height: var(--hds-line-height-normal);
    }

    .hds-range-input__value {
      margin-inline-start: auto;
      border-radius: var(--hds-radius-full);
      padding: 0 0.5rem;
      background: var(--hds-color-neutral-soft);
      color: var(--hds-color-text-on-neutral-soft);
      font-size: var(--hds-font-size-sm);
      font-variant-numeric: tabular-nums;
      font-weight: var(--hds-font-weight-medium);
      line-height: var(--hds-line-height-normal);
    }

    .hds-range-input__control {
      --_fill: var(--hds-color-accent-strong);
      /* Lighter than the control border, still 3:1 against the surface. */
      --_rail: color-mix(
        in oklab,
        var(--hds-color-border-control) 80%,
        var(--hds-color-surface)
      );
      --_track: 0.375rem;
      --_thumb: 1.25rem;
      --hds-range-progress: 50%;
      display: block;
      box-sizing: border-box;
      width: 100%;
      min-width: 12rem;
      height: 1.5rem;
      margin: 0;
      appearance: none;
      -webkit-appearance: none;
      background: transparent;
      cursor: pointer;
      outline: none;

      &[aria-invalid="true"] {
        --_fill: var(--hds-color-danger-strong);
      }

      &:disabled {
        cursor: not-allowed;
        opacity: 0.6;
      }
    }

    .hds-range-input__control::-webkit-slider-runnable-track {
      height: var(--_track);
      border-radius: var(--hds-radius-full);
      background: linear-gradient(
        to right,
        var(--_fill) var(--hds-range-progress),
        var(--_rail) var(--hds-range-progress)
      );
    }

    :host(:dir(rtl)) .hds-range-input__control::-webkit-slider-runnable-track {
      background: linear-gradient(
        to left,
        var(--_fill) var(--hds-range-progress),
        var(--_rail) var(--hds-range-progress)
      );
    }

    .hds-range-input__control::-webkit-slider-thumb {
      appearance: none;
      -webkit-appearance: none;
      margin-top: calc((var(--_track) - var(--_thumb)) / 2);
      box-sizing: border-box;
      width: var(--_thumb);
      height: var(--_thumb);
      border: 1px var(--hds-border-style-solid) var(--hds-color-border-control);
      border-radius: var(--hds-radius-full);
      background: #ffffff;
      box-shadow: var(--hds-shadow-md);
      transition-property: border-color, scale;
      transition-duration: var(--hds-duration-normal);
      transition-timing-function: var(--hds-ease-out);
    }

    .hds-range-input__control:hover:not(:disabled)::-webkit-slider-thumb {
      border-color: var(--hds-color-text);
      scale: 1.1;
    }

    .hds-range-input__control:active:not(:disabled)::-webkit-slider-thumb {
      scale: 1.2;
    }

    .hds-range-input__control:focus-visible::-webkit-slider-thumb {
      border-color: var(--hds-color-focus);
      outline: 2px solid var(--hds-color-focus);
      outline-offset: 2px;
    }

    .hds-range-input__control[aria-invalid="true"]:focus-visible::-webkit-slider-thumb {
      border-color: var(--hds-color-text-danger);
      outline-color: var(--hds-color-text-danger);
    }

    .hds-range-input__control::-moz-range-track {
      height: var(--_track);
      border: 0;
      border-radius: var(--hds-radius-full);
      background: var(--_rail);
    }

    .hds-range-input__control::-moz-range-progress {
      height: var(--_track);
      border-radius: var(--hds-radius-full);
      background: var(--_fill);
    }

    .hds-range-input__control::-moz-range-thumb {
      box-sizing: border-box;
      width: var(--_thumb);
      height: var(--_thumb);
      border: 1px var(--hds-border-style-solid) var(--hds-color-border-control);
      border-radius: var(--hds-radius-full);
      background: #ffffff;
      box-shadow: var(--hds-shadow-md);
      transition-property: border-color, scale;
      transition-duration: var(--hds-duration-normal);
      transition-timing-function: var(--hds-ease-out);
    }

    .hds-range-input__control:hover:not(:disabled)::-moz-range-thumb {
      border-color: var(--hds-color-text);
      scale: 1.1;
    }

    .hds-range-input__control:active:not(:disabled)::-moz-range-thumb {
      scale: 1.2;
    }

    .hds-range-input__control:focus-visible::-moz-range-thumb {
      border-color: var(--hds-color-focus);
      outline: 2px solid var(--hds-color-focus);
      outline-offset: 2px;
    }

    .hds-range-input__control[aria-invalid="true"]:focus-visible::-moz-range-thumb {
      border-color: var(--hds-color-text-danger);
      outline-color: var(--hds-color-text-danger);
    }

${errorStyles("hds-range-input")}

    .hds-range-input__label:empty,
    .hds-range-input__error:empty {
      display: none;
    }

    @media (prefers-reduced-motion: reduce) {
      .hds-range-input__error {
        transition-duration: var(--hds-duration-instant);
      }

      /* Separate rules: a list with an unknown vendor pseudo drops entirely. */
      .hds-range-input__control::-webkit-slider-thumb {
        transition-duration: var(--hds-duration-instant);
      }

      .hds-range-input__control::-moz-range-thumb {
        transition-duration: var(--hds-duration-instant);
      }
    }

    @media (forced-colors: active) {
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

      .hds-range-input__error::before {
        background: CanvasText;
      }
    }
  </style>
`;

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

const Template = {
  render(args: RangeInputTemplateArgs = {}): string {
    return `
      ${css()}
      ${html(args)}
    `;
  },

  update(root: ShadowRoot, state: RangeInputState): void {
    const label = find<HTMLLabelElement>(root, "[data-label]");
    const output = find<HTMLOutputElement>(root, "[data-value]");
    const input = find<HTMLInputElement>(root, ".hds-range-input__control");
    const error = find<HTMLElement>(root, "[data-error]");

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

    setError(input, error, state.errorMessage);
  },
};

export default Template;
