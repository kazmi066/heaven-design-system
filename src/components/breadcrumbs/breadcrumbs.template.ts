import { find, setStringAttribute } from "../shared/field.js";
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
      margin-inline: 0.25rem 0.375rem;
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
      border-radius: var(--hds-radius-md);
      padding: 0.125rem 0.375rem;
      font: inherit;
      color: var(--hds-color-text-weak);
    }

    ::slotted(a) {
      text-decoration: underline;
      text-decoration-color: transparent;
      text-decoration-thickness: 1px;
      text-underline-offset: 0.2em;
      transition-property: background-color, color, text-decoration-color;
      transition-duration: var(--hds-duration-normal);
      transition-timing-function: var(--hds-ease-out);
    }

    ::slotted(a:hover) {
      background: var(--hds-color-surface-hover);
      color: var(--hds-color-text);
      text-decoration-color: currentColor;
    }

    ::slotted(a:focus-visible) {
      color: var(--hds-color-text);
      text-decoration-color: currentColor;
      outline: 2px solid var(--hds-color-focus);
      outline-offset: 2px;
    }

    ::slotted([aria-current="page"]),
    ::slotted([aria-current="page"]:hover) {
      background: none;
      color: var(--hds-color-text);
      font-weight: var(--hds-font-weight-semibold);
      text-decoration-color: transparent;
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

      ::slotted(a) {
        text-decoration-color: currentColor;
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
    const nav = find<HTMLElement>(root, ".hds-breadcrumbs");
    const list = find<HTMLOListElement>(root, ".hds-breadcrumbs__items");

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

      setStringAttribute(
        node,
        "aria-current",
        index === items.length - 1 ? "page" : "",
      );
    });
  },
};

export default Template;
