import { ACCORDION_GROUP } from "./accordion.constants.js";
import type { AccordionState } from "./accordion.types.js";

export const css = (): string => `
  <style>
    :host {
      display: block;
      width: 100%;
      min-width: 0;
      interpolate-size: allow-keywords;
    }

    :host([hidden]) {
      display: none;
    }

    .hds-accordion {
      overflow: hidden;
      border: 1px var(--hds-border-style-solid) var(--hds-color-border);
      border-radius: var(--hds-radius-md);
      background: var(--hds-color-surface);
      color: var(--hds-color-text);
      font-family: var(--hds-font-family);
      font-size: var(--hds-font-size-base);
      line-height: var(--hds-line-height-normal);
    }

    .hds-accordion:not(:has(details)) {
      display: none;
    }

    details + details {
      border-top: 1px var(--hds-border-style-solid) var(--hds-color-border);
    }

    summary {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--hds-space-sm);
      padding: 0.75rem 1rem;
      list-style: none;
      font-weight: var(--hds-font-weight-medium);
      cursor: pointer;
      transition-property: background;
      transition-duration: var(--hds-duration-fast);
      transition-timing-function: var(--hds-ease-out);

      &::-webkit-details-marker {
        display: none;
      }

      &::after {
        content: "";
        flex: none;
        width: 0.5rem;
        height: 0.5rem;
        border-right: 1.5px solid var(--hds-color-icon);
        border-bottom: 1.5px solid var(--hds-color-icon);
        transform: translateY(-25%) rotate(45deg);
        transition-property: transform;
        transition-duration: var(--hds-duration-normal);
        transition-timing-function: var(--hds-ease-out);
      }

      &:hover {
        background: var(--hds-color-surface-hover);
      }

      &:focus-visible {
        outline: 2px solid var(--hds-color-accent);
        outline-offset: -2px;
      }
    }

    details[open] > summary::after {
      transform: translateY(25%) rotate(-135deg);
    }

    details::details-content {
      block-size: 0;
      overflow: clip;
      transition-property: block-size, content-visibility;
      transition-duration: var(--hds-duration-normal);
      transition-timing-function: var(--hds-ease-out);
      transition-behavior: allow-discrete;
    }

    details[open]::details-content {
      block-size: auto;
    }

    .hds-accordion__panel {
      padding: 0 1rem 1rem;
      color: var(--hds-color-text-weak);
    }

    @media (prefers-reduced-motion: reduce) {
      summary,
      summary::after,
      details::details-content {
        transition-duration: var(--hds-duration-instant);
      }
    }

    @media (forced-colors: active) {
      summary::after {
        border-color: CanvasText;
      }

      summary:focus-visible {
        outline-color: Highlight;
      }
    }
  </style>
`;

export const html = (): string => `
  <div class="hds-accordion"></div>
`;

const createRow = (index: number): HTMLDetailsElement => {
  const row = document.createElement("details");
  const summary = document.createElement("summary");
  const panel = document.createElement("div");
  const slot = document.createElement("slot");

  panel.className = "hds-accordion__panel";
  slot.name = `item-${index}`;
  panel.append(slot);
  row.append(summary, panel);

  return row;
};

const Template = {
  render(): string {
    return `
      ${css()}
      ${html()}
    `;
  },

  update(
    root: ShadowRoot,
    state: AccordionState,
    items: readonly HTMLElement[],
  ): void {
    const container = root.querySelector<HTMLElement>(".hds-accordion");

    if (!container) {
      throw new Error("Accordion markup is unavailable.");
    }

    const rows = items.map(
      (_, index) =>
        container.children[index] instanceof HTMLDetailsElement
          ? (container.children[index] as HTMLDetailsElement)
          : createRow(index),
    );

    if (
      container.children.length !== rows.length ||
      rows.some((row, index) => container.children[index] !== row)
    ) {
      container.replaceChildren(...rows);
    }

    items.forEach((item, index) => {
      const row = rows[index]!;

      item.slot = `item-${index}`;
      row.querySelector("summary")!.textContent =
        item.getAttribute("heading") || "";

      if (state.exclusive) {
        row.name = ACCORDION_GROUP;
      } else {
        row.removeAttribute("name");
      }
    });

    // Close first, then open: in exclusive mode the last open item wins.
    rows.forEach((row, index) => {
      if (!items[index]!.hasAttribute("open")) row.open = false;
    });
    rows.forEach((row, index) => {
      if (items[index]!.hasAttribute("open")) row.open = true;
    });
  },
};

export default Template;
