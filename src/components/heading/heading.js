const template = document.createElement("template");

template.innerHTML = `
  <style>
    :host {
      display: block;
    }

    :host([hidden]) {
      display: none;
    }

    .hds-heading {
      margin: 0;
      font-family: var(--hds-font-family);
      font-weight: var(--hds-font-weight-semibold);
      line-height: var(--hds-line-height-tight);
      color: var(--hds-color-text);

      /* Heading level styles */
      &[data-level="h1"] {
        font-size: var(--hds-font-size-4xl);
        font-weight: var(--hds-font-weight-bold);
        line-height: var(--hds-line-height-none);
        letter-spacing: var(--hds-letter-spacing-tight);
      }

      &[data-level="h2"] {
        font-size: var(--hds-font-size-3xl);
        font-weight: var(--hds-font-weight-bold);
        line-height: var(--hds-line-height-tight);
        letter-spacing: var(--hds-letter-spacing-tight);
      }

      &[data-level="h3"] {
        font-size: var(--hds-font-size-2xl);
        font-weight: var(--hds-font-weight-semibold);
        line-height: var(--hds-line-height-tight);
      }

      &[data-level="h4"] {
        font-size: var(--hds-font-size-xl);
        font-weight: var(--hds-font-weight-semibold);
        line-height: var(--hds-line-height-snug);
      }

      &[data-level="h5"] {
        font-size: var(--hds-font-size-lg);
        font-weight: var(--hds-font-weight-medium);
        line-height: var(--hds-line-height-snug);
      }

      &[data-level="h6"] {
        font-size: var(--hds-font-size-md);
        font-weight: var(--hds-font-weight-medium);
        line-height: var(--hds-line-height-normal);
      }

      /* Heading variants */
      &[data-variant="default"] {
        color: var(--hds-color-text);
      }

      &[data-variant="subtle"] {
        color: var(--hds-color-text-weak);
        font-weight: var(--hds-font-weight-regular);
      }

      &[data-variant="accent"] {
        color: var(--hds-color-accent);
      }

      &[data-variant="success"] {
        color: var(--hds-color-success);
      }

      &[data-variant="danger"] {
        color: var(--hds-color-danger);
      }

      &[data-variant="warning"] {
        color: var(--hds-color-warning);
      }
    }
  </style>
  <h1 class="hds-heading" part="heading">
    <slot></slot>
  </h1>
`;

export class HdsHeading extends HTMLElement {
  static observedAttributes = ["level", "variant"];

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this._heading = this.shadowRoot.querySelector("h1");
  }

  connectedCallback() {
    this._sync();
  }

  attributeChangedCallback() {
    this._sync();
  }

  _sync() {
    const level = this.getAttribute("level") || "h1";
    const variant = this.getAttribute("variant") || "default";

    // Update the actual heading element tag
    const newHeading = document.createElement(level);
    newHeading.className = "hds-heading";
    newHeading.setAttribute("part", "heading");
    newHeading.innerHTML = "<slot></slot>";

    // Replace the existing heading
    this._heading.replaceWith(newHeading);
    this._heading = newHeading;

    // Set data attributes for styling
    this._heading.setAttribute("data-level", level);
    this._heading.setAttribute("data-variant", variant);
  }
}

if (!customElements.get("hds-heading")) {
  customElements.define("hds-heading", HdsHeading);
}