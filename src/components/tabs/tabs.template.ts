export const css = (): string => `
  <style id="hds-tabs-styles">
    @property --_fade-start {
      syntax: "<length>";
      inherits: false;
      initial-value: 0px;
    }

    @property --_fade-end {
      syntax: "<length>";
      inherits: false;
      initial-value: 0px;
    }

    hds-tabs {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      align-content: start;
      inline-size: 100%;
      min-inline-size: 0;
      box-sizing: border-box;
      color: var(--hds-color-text);
      font-family: var(--hds-font-family);
      font-size: var(--hds-font-size-base);
      line-height: var(--hds-line-height-normal);
    }

    hds-tabs[hidden] {
      display: none;
    }

    hds-tabs > [role="tablist"] {
      --_fade-size: 2.5rem;
      --_fade-dir: right;
      --_fade-start-pos: 0;
      --_fade-end-pos: 100%;
      grid-area: 1 / 1;
      display: flex;
      gap: var(--hds-space-2xs);
      box-sizing: border-box;
      margin: 0 0 var(--hds-space-md);
      padding: 0;
      border-block-end: 1px var(--hds-border-style-solid)
        var(--hds-color-border-strong);
      overflow-x: auto;
      overscroll-behavior-inline: contain;
      scrollbar-width: none;
      scroll-snap-type: inline proximity;
      scroll-padding-inline: var(--_fade-size);
      mask:
        linear-gradient(black, black) no-clip subtract,
        linear-gradient(to var(--_fade-dir), black, transparent)
          var(--_fade-start-pos) 0 / var(--_fade-start) 100% no-repeat no-clip,
        linear-gradient(to var(--_fade-dir), transparent, black)
          var(--_fade-end-pos) 0 / var(--_fade-end) 100% no-repeat no-clip;
      animation:
        hds-tabs-fade-start linear both,
        hds-tabs-fade-end linear both;
      animation-timeline: scroll(self inline);
      animation-range:
        0 var(--_fade-size),
        calc(100% - var(--_fade-size)) 100%;

      &::-webkit-scrollbar {
        display: none;
      }

      &:dir(rtl) {
        --_fade-dir: left;
        --_fade-start-pos: 100%;
        --_fade-end-pos: 0;
      }
    }

    @keyframes hds-tabs-fade-start {
      to {
        --_fade-start: var(--_fade-size);
      }
    }

    @keyframes hds-tabs-fade-end {
      from {
        --_fade-end: var(--_fade-size);
      }
    }

    hds-tabs > [role="tablist"] > [role="tab"] {
      position: relative;
      flex: none;
      display: inline-flex;
      align-items: center;
      gap: var(--hds-space-xs);
      box-sizing: border-box;
      min-block-size: 2.75rem;
      margin: 0;
      border: 1px var(--hds-border-style-solid) transparent;
      border-radius: var(--hds-radius-lg) var(--hds-radius-lg) 0 0;
      padding: 0.5rem 1rem;
      background: transparent;
      color: var(--hds-color-text-weak);
      font: inherit;
      font-weight: var(--hds-font-weight-medium);
      white-space: nowrap;
      scroll-snap-align: start;
      cursor: pointer;
      transition-property: color, background-color, border-color, scale;
      transition-duration: var(--hds-duration-normal);
      transition-timing-function: var(--hds-ease-out);

      /* Selected indicator: a 3px bar drawn with a border, so it survives
         forced colors. It grows in from the center. */
      &::after {
        content: "";
        position: absolute;
        inset: auto 0 -1px;
        border-block-end: 3px var(--hds-border-style-solid)
          var(--hds-color-text-accent);
        border-radius: var(--hds-radius-full);
        opacity: 0;
        scale: 0 1;
        transition-property: scale, opacity;
        transition-duration: var(--hds-duration-slow);
        transition-timing-function: var(--hds-ease-out);
      }

      &[aria-selected="true"] {
        color: var(--hds-color-text-accent);

        &::after {
          opacity: 1;
          scale: 1;
        }
      }

      &:active {
        scale: 0.97;
      }

      &:focus-visible {
        outline: 2px solid var(--hds-color-focus);
        outline-offset: -4px;
      }

      &:disabled {
        opacity: 0.55;
        cursor: not-allowed;
      }
    }

    @media (hover: hover) {
      hds-tabs
        > [role="tablist"]
        > [role="tab"]:hover:not(:disabled, [aria-selected="true"]) {
        background-color: color-mix(in oklab, currentColor 8%, transparent);
        color: var(--hds-color-text);
      }
    }

    hds-tabs[variant="pills"] > [role="tablist"] {
      gap: var(--hds-space-2xs);
      inline-size: fit-content;
      max-inline-size: 100%;
      padding: 0.25rem;
      border: 1px var(--hds-border-style-solid) var(--hds-color-border);
      border-radius: var(--hds-radius-full);
      background: var(--hds-color-neutral-soft);
      scroll-padding-inline: 0.25rem;
    }

    hds-tabs[variant="pills"] > [role="tablist"] > [role="tab"] {
      border-radius: var(--hds-radius-full);
      padding-inline: 1.125rem;
      color: var(--hds-color-text-on-neutral-soft);
      transition-property:
        color, background-color, border-color, box-shadow, scale;

      &::after {
        content: none;
      }

      &[aria-selected="true"] {
        border-color: var(--hds-color-border-control);
        background: var(--hds-color-surface);
        color: var(--hds-color-text);
        box-shadow: var(--hds-shadow-sm);
      }

      &:focus-visible {
        outline-offset: 2px;
      }
    }

    /* Panels share one grid cell. A hidden="until-found" panel still has a
       box, so the panel itself takes no padding, border, or background. */
    hds-tabs > [role="tabpanel"] {
      grid-area: 2 / 1;
      align-self: start;
      min-inline-size: 0;
      border-radius: var(--hds-radius-lg);

      /* Hidden panels overlap the selected one, so keep them out of the
         way of clicks. */
      &[hidden] {
        pointer-events: none;
      }

      &:focus-visible {
        outline: 2px solid var(--hds-color-focus);
        outline-offset: 4px;
      }

      & > :first-child {
        margin-block-start: 0;
      }

      & > :last-child {
        margin-block-end: 0;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      hds-tabs > [role="tablist"] > [role="tab"],
      hds-tabs > [role="tablist"] > [role="tab"]::after {
        transition-duration: var(--hds-duration-instant);
      }

      hds-tabs > [role="tablist"] > [role="tab"]:active {
        scale: none;
      }
    }

    @media (forced-colors: active) {
      hds-tabs > [role="tablist"] > [role="tab"][aria-selected="true"] {
        border-color: Highlight;
        color: Highlight;
      }

      hds-tabs > [role="tablist"] > [role="tab"]::after {
        border-color: Highlight;
      }

      hds-tabs > [role="tablist"] > [role="tab"]:disabled {
        color: GrayText;
        opacity: 1;
      }
    }
  </style>
`;
