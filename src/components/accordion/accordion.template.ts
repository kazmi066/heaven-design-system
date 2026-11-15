export const css = (): string => `
  <style id="hds-accordion-styles">
    hds-accordion {
      display: block;
      width: 100%;
      min-width: 0;
      box-sizing: border-box;
      interpolate-size: allow-keywords;
      overflow: clip;
      border: 1px var(--hds-border-style-solid) var(--hds-color-border-strong);
      border-radius: var(--hds-radius-xl);
      background: var(--hds-color-surface);
      color: var(--hds-color-text);
      box-shadow: var(--hds-shadow-sm);
      font-family: var(--hds-font-family);
      font-size: var(--hds-font-size-base);
      line-height: var(--hds-line-height-normal);
    }

    hds-accordion[hidden],
    hds-accordion:not(:has(> details)) {
      display: none;
    }

    hds-accordion > details + details {
      border-top: 1px var(--hds-border-style-solid) var(--hds-color-border-strong);
    }

    hds-accordion > details > summary {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--hds-space-sm);
      box-sizing: border-box;
      min-block-size: 3rem;
      padding: 0.75rem 1.125rem;
      list-style: none;
      font-weight: var(--hds-font-weight-medium);
      cursor: pointer;
      transition-property: background-color;
      transition-duration: var(--hds-duration-normal);
      transition-timing-function: var(--hds-ease-out);

      &::-webkit-details-marker {
        display: none;
      }

      /* Chevron in a soft circle that turns when the section opens. */
      &::after {
        content: "";
        flex: none;
        inline-size: 1.5rem;
        block-size: 1.5rem;
        border-radius: var(--hds-radius-full);
        background:
          var(--_chevron) center / 0.875rem no-repeat,
          var(--hds-color-neutral-soft);
        transition-property: rotate, background-color;
        transition-duration: var(--hds-duration-slow);
        transition-timing-function: var(--hds-ease-out);
      }

      &:hover {
        background-color: var(--hds-color-surface-hover);
      }

      &:focus-visible {
        border-radius: var(--hds-radius-lg);
        outline: 2px solid var(--hds-color-focus);
        outline-offset: -3px;
      }
    }

    hds-accordion {
      --_chevron: url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%233f3f46%22 stroke-width=%222.5%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22%3E%3Cpath d=%22m6 9 6 6 6-6%22/%3E%3C/svg%3E');
    }

    [data-theme="dark"] hds-accordion {
      --_chevron: url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23e4e4e7%22 stroke-width=%222.5%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22%3E%3Cpath d=%22m6 9 6 6 6-6%22/%3E%3C/svg%3E');
    }

    hds-accordion > details[open] > summary::after {
      rotate: 180deg;
    }

    hds-accordion > details::details-content {
      block-size: 0;
      overflow: clip;
      opacity: 0;
      transition-property: block-size, opacity, content-visibility;
      transition-duration: var(--hds-duration-slow);
      transition-timing-function: var(--hds-ease-out);
      transition-behavior: allow-discrete;
    }

    hds-accordion > details[open]::details-content {
      block-size: auto;
      opacity: 1;
    }

    hds-accordion > details > :not(summary) {
      margin: 0;
      padding: 0 1.125rem 1rem;
      color: var(--hds-color-text-weak);
    }

    @media (prefers-reduced-motion: reduce) {
      hds-accordion > details > summary,
      hds-accordion > details > summary::after,
      hds-accordion > details::details-content {
        transition-duration: var(--hds-duration-instant);
      }
    }

    @media (forced-colors: active) {
      /* Backgrounds are removed here, so draw the chevron with borders. */
      hds-accordion > details > summary::after {
        inline-size: 0.5rem;
        block-size: 0.5rem;
        border: solid CanvasText;
        border-width: 0 2px 2px 0;
        border-radius: 0;
        background: none;
        rotate: 45deg;
      }

      hds-accordion > details[open] > summary::after {
        rotate: -135deg;
      }
    }
  </style>
`;
