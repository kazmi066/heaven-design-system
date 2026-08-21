import type { BadgeState, BadgeTemplateArgs } from "./badge.types.js";

export const css = (): string => `
  <style>
    :host {
      display: inline-block;
    }

    :host([hidden]) {
      display: none;
    }

    .hds-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0.1875rem 0.5rem;
      border-radius: var(--hds-radius-full);
      font-family: var(--hds-font-family);
      font-size: var(--hds-font-size-xs);
      font-weight: var(--hds-font-weight-bold);
      line-height: var(--hds-line-height-tight);
      white-space: nowrap;
    }

    .hds-badge[data-variant="default"] {
      background: var(--hds-color-primary);
      color: var(--hds-color-text-on-accent);
    }

    .hds-badge[data-variant="secondary"] {
      background: var(--hds-color-surface-active);
      color: var(--hds-color-text);
    }

    .hds-badge[data-variant="success"] {
      background: var(--hds-color-success);
      color: var(--hds-color-text-on-success);
    }

    .hds-badge[data-variant="danger"] {
      background: var(--hds-color-danger);
      color: var(--hds-color-text-on-danger);
    }

    .hds-badge[data-variant="warning"] {
      background: var(--hds-color-warning);
      color: var(--hds-color-text-on-warning);
    }

    .hds-badge[data-variant="info"] {
      background: var(--hds-color-info);
      color: var(--hds-color-text-on-info);
    }
  </style>
`;

export const html = ({ variant = "default" }: BadgeTemplateArgs = {}): string => `
  <span class="hds-badge" data-variant="${variant}" data-badge>
    <slot></slot>
  </span>
`;

const Template = {
  render(args: BadgeTemplateArgs = {}): string {
    return `
      ${css()}
      ${html(args)}
    `;
  },

  update(root: ShadowRoot, state: BadgeState): void {
    const badge = root.querySelector<HTMLElement>("[data-badge]");

    if (!badge) {
      throw new Error("Badge element is unavailable.");
    }

    badge.dataset.variant = state.variant;
  },
};

export default Template;
