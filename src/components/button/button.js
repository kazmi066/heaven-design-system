export const HdsButton = (args = {}) => /*html*/ `
<button
  type="button"
  class="hds-button"
  ${args.style ? `data-style="${args.style}"` : ""}
  ${args.size ? `data-size="${args.size}"` : ""}
  ${args.disabled ? "disabled" : ""}
>
  ${args.label || "Button"}
</button>
`;
