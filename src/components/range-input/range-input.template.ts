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
      /* Taller than the track so the slider is easy to hit. */
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

    .hds-range-input__error {
      display: flex;
      align-items: flex-start;
      gap: var(--hds-space-2xs);
      margin: 0;
      color: var(--hds-color-text-danger);
      font-size: var(--hds-font-size-sm);
      font-weight: var(--hds-font-weight-regular);
      line-height: var(--hds-line-height-normal);
      transition-property: opacity, translate;
      transition-duration: var(--hds-duration-slow);
      transition-timing-function: var(--hds-ease-out);

      /* An icon as well as color, so the error does not rely on color. */
      &::before {
        content: "";
        flex: none;
        inline-size: 1em;
        block-size: 1lh;
        background: currentColor;
        mask: url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 20 20%22%3E%3Cpath fill-rule=%22evenodd%22 d=%22M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM9 6a1 1 0 1 1 2 0v4a1 1 0 1 1-2 0V6Zm1 9a1.25 1.25 0 1 0 0-2.5A1.25 1.25 0 0 0 10 15Z%22/%3E%3C/svg%3E') center / 1em no-repeat;
      }

      /* Slides in when a message appears. */
      @starting-style {
        opacity: 0;
        translate: 0 -0.25rem;
      }
    }

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
