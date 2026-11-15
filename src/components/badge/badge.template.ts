export const css = (): string => `
  <style>
    :host {
      --_bg: var(--hds-color-primary);
      --_fg: var(--hds-color-surface);
      display: inline-block;
    }

    :host([hidden]) {
      display: none;
    }

    :host([variant="secondary"]) {
      --_bg: var(--hds-color-neutral-soft);
      --_fg: var(--hds-color-text-on-neutral-soft);
    }

    :host([variant="success"]) {
      --_bg: var(--hds-color-success-soft);
      --_fg: var(--hds-color-text-on-success-soft);
    }

    :host([variant="danger"]) {
      --_bg: var(--hds-color-danger-soft);
      --_fg: var(--hds-color-text-on-danger-soft);
    }

    :host([variant="warning"]) {
      --_bg: var(--hds-color-warning-soft);
      --_fg: var(--hds-color-text-on-warning-soft);
    }

    :host([variant="info"]) {
      --_bg: var(--hds-color-info-soft);
      --_fg: var(--hds-color-text-on-info-soft);
    }

    .hds-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--hds-space-2xs);
      /* A faint edge in the text color. It also keeps the pill visible in
         forced colors, where backgrounds are removed. */
      border: 1px var(--hds-border-style-solid)
        color-mix(in oklab, currentColor 20%, transparent);
      border-radius: var(--hds-radius-full);
      padding: 0.125rem 0.625rem;
      background: var(--_bg);
      color: var(--_fg);
      font-family: var(--hds-font-family);
      font-size: var(--hds-font-size-xs);
      font-weight: var(--hds-font-weight-medium);
      line-height: var(--hds-line-height-normal);
      white-space: nowrap;
      transition-property: background-color, border-color, color;
      transition-duration: var(--hds-duration-normal);
      transition-timing-function: var(--hds-ease-out);
    }

    @media (prefers-reduced-motion: reduce) {
      .hds-badge {
        transition-duration: var(--hds-duration-instant);
      }
    }
  </style>
`;

export const html = (): string => `
  <span class="hds-badge">
    <slot></slot>
  </span>
`;

const Template = {
  render(): string {
    return `
      ${css()}
      ${html()}
    `;
  },
};

export default Template;
