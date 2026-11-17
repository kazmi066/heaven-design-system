const icon = (path: string): string =>
  `url("data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill-rule="evenodd" d="${path}"/></svg>`,
  )}")`;

const ICONS = {
  info: "M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z",
  success:
    "M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z",
  warning:
    "M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495ZM10 5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 5Zm0 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z",
  danger:
    "M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM9 6a1 1 0 1 1 2 0v4a1 1 0 1 1-2 0V6Zm1 9a1.25 1.25 0 1 0 0-2.5A1.25 1.25 0 0 0 10 15Z",
};

export const css = (): string => `
  <style>
    :host {
      --_bg: var(--hds-color-info-soft);
      --_fg: var(--hds-color-text-on-info-soft);
      --_edge: var(--hds-color-border-info);
      --_icon: ${icon(ICONS.info)};
      display: block;
    }

    :host([hidden]) {
      display: none;
    }

    :host([variant="success"]) {
      --_bg: var(--hds-color-success-soft);
      --_fg: var(--hds-color-text-on-success-soft);
      --_edge: var(--hds-color-border-success);
      --_icon: ${icon(ICONS.success)};
    }

    :host([variant="warning"]) {
      --_bg: var(--hds-color-warning-soft);
      --_fg: var(--hds-color-text-on-warning-soft);
      --_edge: var(--hds-color-border-warning);
      --_icon: ${icon(ICONS.warning)};
    }

    :host([variant="danger"]) {
      --_bg: var(--hds-color-danger-soft);
      --_fg: var(--hds-color-text-on-danger-soft);
      --_edge: var(--hds-color-border-danger);
      --_icon: ${icon(ICONS.danger)};
    }

    .hds-alert {
      position: relative;
      display: grid;
      grid-template-columns: auto minmax(0, 1fr);
      gap: var(--hds-space-sm);
      box-sizing: border-box;
      inline-size: 100%;
      border: 1px var(--hds-border-style-solid) var(--_edge);
      border-inline-start: 4px var(--hds-border-style-solid) currentColor;
      border-radius: var(--hds-radius-xl);
      padding: var(--hds-space-md);
      background: var(--_bg);
      color: var(--_fg);
      font-family: var(--hds-font-family);
      font-size: var(--hds-font-size-sm);
      line-height: var(--hds-line-height-normal);
    }

    .hds-alert__icon {
      inline-size: 1.25rem;
      block-size: 1lh;
      background: currentColor;
      mask: var(--_icon) center / 1.25rem no-repeat;
    }

    .hds-alert__content {
      display: flex;
      flex-direction: column;
      gap: var(--hds-space-2xs);
      min-inline-size: 0;
    }

    .hds-alert__content ::slotted(*) {
      margin: 0;
    }

    .hds-alert__content ::slotted(:is(h2, h3, h4, h5, h6)) {
      font-size: var(--hds-font-size-base);
      font-weight: var(--hds-font-weight-semibold);
      line-height: var(--hds-line-height-snug);
    }

    .hds-alert__label {
      position: absolute;
      inline-size: 1px;
      block-size: 1px;
      overflow: hidden;
      clip-path: inset(50%);
      white-space: nowrap;
    }

    .hds-alert__label [data-variant] {
      display: none;
    }

    :host(:not([variant="success"], [variant="warning"], [variant="danger"]))
      [data-variant="info"],
    :host([variant="success"]) [data-variant="success"],
    :host([variant="warning"]) [data-variant="warning"],
    :host([variant="danger"]) [data-variant="danger"] {
      display: inline;
    }

    @media (forced-colors: active) {
      .hds-alert {
        border-color: CanvasText;
      }

      .hds-alert__icon {
        forced-color-adjust: none;
        background: CanvasText;
      }
    }
  </style>
`;

export const html = (): string => `
  <div class="hds-alert">
    <span class="hds-alert__icon" aria-hidden="true"></span>
    <div class="hds-alert__content">
      <span class="hds-alert__label">
        <slot name="label">
          <span data-variant="info">Information</span>
          <span data-variant="success">Success</span>
          <span data-variant="warning">Warning</span>
          <span data-variant="danger">Error</span>
        </slot>
      </span>
      <slot></slot>
    </div>
  </div>
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
