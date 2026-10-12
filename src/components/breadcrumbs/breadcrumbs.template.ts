import { BREADCRUMB_LABEL } from "./breadcrumbs.constants.js";
import type {
  BreadcrumbsState,
  BreadcrumbsTemplateArgs,
} from "./breadcrumbs.types.js";

export const css = (): string => `
  <style>
    :host {
      display: block;
      width: 100%;
      min-width: 0;
    }

    :host([hidden]) {
      display: none;
    }

    .hds-breadcrumbs {
      min-width: 0;
      color: var(--hds-color-text);
      font-family: var(--hds-font-family);
      font-size: var(--hds-font-size-sm);
      font-weight: var(--hds-font-weight-regular);
      line-height: var(--hds-line-height-snug);
    }

    .hds-breadcrumbs:not(:has(.hds-breadcrumbs__item)) {
      display: none;
    }

    .hds-breadcrumbs__items {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      row-gap: var(--hds-space-2xs);
      min-width: 0;
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .hds-breadcrumbs__item {
      display: inline-flex;
      align-items: center;
      min-width: 0;
      max-width: 100%;
    }

    .hds-breadcrumbs__item:not(:last-child)::after {
      content: "";
      flex: none;
      width: 0.375rem;
      height: 0.375rem;
      margin-inline: 0.5rem;
      border-top: 1px solid var(--hds-color-icon);
      border-right: 1px solid var(--hds-color-icon);
      transform: rotate(45deg);
    }

    :host(:dir(rtl)) .hds-breadcrumbs__item:not(:last-child)::after {
      transform: rotate(-135deg);
    }

    ::slotted(*) {
      display: inline-flex;
      align-items: center;
      min-width: 0;
      max-width: 100%;
      min-height: 1.5rem;
      overflow-wrap: break-word;
      border-radius: var(--hds-radius-sm);
      font: inherit;
      color: var(--hds-color-text-weak);
    }

    ::slotted(a) {
      text-decoration: underline;
      text-decoration-thickness: 1px;
      text-underline-offset: 0.2em;
      transition-property: color;
      transition-duration: var(--hds-duration-fast);
      transition-timing-function: var(--hds-ease-out);
    }

    ::slotted(a:hover) {
      color: var(--hds-color-text);
    }

    ::slotted(a:focus) {
      outline: none;
    }

    ::slotted(a:focus-visible) {
      color: var(--hds-color-text);
      outline: 2px solid var(--hds-color-accent);
      outline-offset: 2px;
    }

    ::slotted([aria-current="page"]) {
      color: var(--hds-color-text);
      font-weight: var(--hds-font-weight-medium);
      text-decoration: none;
    }

    ::slotted([aria-current="page"]:hover) {
      color: var(--hds-color-text);
      text-decoration: none;
    }

    @media (prefers-reduced-motion: reduce) {
      ::slotted(a) {
        transition-duration: var(--hds-duration-instant);
      }
    }

    @media (forced-colors: active) {
      .hds-breadcrumbs__item:not(:last-child)::after {
        border-color: CanvasText;
      }

      ::slotted(a:focus-visible) {
        outline-color: Highlight;
      }
    }
  </style>
`;

export const html = ({
  label = BREADCRUMB_LABEL,
}: BreadcrumbsTemplateArgs = {}): string => `
  <nav class="hds-breadcrumbs" aria-label="${label}">
    <ol class="hds-breadcrumbs__items"></ol>
  </nav>
`;

const Template = {
  render(args: BreadcrumbsTemplateArgs = {}): string {
    return `
      ${css()}
      ${html(args)}
    `;
  },

  update(
    root: ShadowRoot,
    state: BreadcrumbsState,
    items: readonly HTMLElement[],
  ): void {
    const nav = root.querySelector<HTMLElement>(".hds-breadcrumbs");
    const list = root.querySelector<HTMLOListElement>(
      ".hds-breadcrumbs__items",
    );

    if (!nav || !list) {
      throw new Error("Breadcrumbs markup is unavailable.");
    }

    nav.setAttribute("aria-label", state.label);

    const crumbs = items.map((_, index) => {
      const crumb = document.createElement("li");
      const slot = document.createElement("slot");

      crumb.className = "hds-breadcrumbs__item";
      slot.name = `item-${index}`;
      crumb.append(slot);

      return crumb;
    });

    list.replaceChildren(...crumbs);

    items.forEach((node, index) => {
      node.slot = `item-${index}`;

      if (index === items.length - 1) {
        node.setAttribute("aria-current", "page");
      } else {
        node.removeAttribute("aria-current");
      }
    });
  },
};

export default Template;
