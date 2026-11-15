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
      background: var(--hds-color-primary);
      color: var(--hds-color-text-on-accent);
    }

    :host([variant="secondary"]) .hds-badge {
      background: var(--hds-color-surface-active);
      color: var(--hds-color-text);
    }

    :host([variant="success"]) .hds-badge {
      background: var(--hds-color-success);
      color: var(--hds-color-text-on-success);
    }

    :host([variant="danger"]) .hds-badge {
      background: var(--hds-color-danger);
      color: var(--hds-color-text-on-danger);
    }

    :host([variant="warning"]) .hds-badge {
      background: var(--hds-color-warning);
      color: var(--hds-color-text-on-warning);
    }

    :host([variant="info"]) .hds-badge {
      background: var(--hds-color-info);
      color: var(--hds-color-text-on-info);
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
