type Control = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

export const attribute = (name: string, value: string): string =>
  value ? `${name}="${value}"` : "";

export const setStringAttribute = (
  element: Element,
  name: string,
  value: string,
): void => {
  if (value) {
    element.setAttribute(name, value);
  } else {
    element.removeAttribute(name);
  }
};

export const find = <T extends Element>(
  root: ParentNode,
  selector: string,
): T => {
  const element = root.querySelector<T>(selector);

  if (!element) {
    throw new Error(`Template is missing ${selector}.`);
  }

  return element;
};

export const setError = (
  control: Control,
  error: HTMLElement,
  message: string,
): void => {
  control.setCustomValidity(message);
  error.textContent = message;
  setStringAttribute(control, "aria-invalid", message ? "true" : "");
  setStringAttribute(control, "aria-describedby", message ? error.id : "");
};

export const errorStyles = (block: string): string => `
    .${block}__error {
      display: flex;
      align-items: flex-start;
      gap: var(--hds-space-2xs);
      margin: 0;
      color: var(--hds-color-text-danger);
      font-size: var(--hds-font-size-sm);
      font-weight: var(--hds-font-weight-regular);
      line-height: var(--hds-line-height-normal);
      transition-property: opacity, translate;
      transition-duration: var(--hds-duration-slow);
      transition-timing-function: var(--hds-ease-out);

      &::before {
        content: "";
        flex: none;
        inline-size: 1em;
        block-size: 1lh;
        background: currentColor;
        mask: url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 20 20%22%3E%3Cpath fill-rule=%22evenodd%22 d=%22M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM9 6a1 1 0 1 1 2 0v4a1 1 0 1 1-2 0V6Zm1 9a1.25 1.25 0 1 0 0-2.5A1.25 1.25 0 0 0 10 15Z%22/%3E%3C/svg%3E') center / 1em no-repeat;
      }

      @starting-style {
        opacity: 0;
        translate: 0 -0.25rem;
      }
    }
`;
