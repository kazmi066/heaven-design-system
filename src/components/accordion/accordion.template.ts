export const css = (): string => `
  <style id="hds-accordion-styles">
    hds-accordion {
      display: block;
      width: 100%;
      min-width: 0;
      box-sizing: border-box;
      interpolate-size: allow-keywords;
      overflow: hidden;
      border: 1px var(--hds-border-style-solid) var(--hds-color-border);
      border-radius: var(--hds-radius-md);
      background: var(--hds-color-surface);
      color: var(--hds-color-text);
      font-family: var(--hds-font-family);
      font-size: var(--hds-font-size-base);
      line-height: var(--hds-line-height-normal);
    }

    hds-accordion[hidden],
    hds-accordion:not(:has(> details)) {
      display: none;
    }

    hds-accordion > details + details {
      border-top: 1px var(--hds-border-style-solid) var(--hds-color-border);
    }

    hds-accordion > details > summary {
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

    hds-accordion > details[open] > summary::after {
      transform: translateY(25%) rotate(-135deg);
    }

    hds-accordion > details::details-content {
      block-size: 0;
      overflow: clip;
      transition-property: block-size, content-visibility;
      transition-duration: var(--hds-duration-normal);
      transition-timing-function: var(--hds-ease-out);
      transition-behavior: allow-discrete;
    }

    hds-accordion > details[open]::details-content {
      block-size: auto;
    }

    hds-accordion > details > :not(summary) {
      margin: 0;
      padding: 0 1rem 1rem;
      color: var(--hds-color-text-weak);
    }

    @media (prefers-reduced-motion: reduce) {
      summary,
      summary::after,
      hds-accordion > details::details-content {
        transition-duration: var(--hds-duration-instant);
      }
    }

    @media (forced-colors: active) {
      hds-accordion > details > summary::after {
        border-color: CanvasText;
      }

      hds-accordion > details > summary:focus-visible {
        outline-color: Highlight;
      }
    }
  </style>
`;
