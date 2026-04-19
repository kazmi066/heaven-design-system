import "./button.js";

const render = (args) => `
  <hds-button
    variant="${args.variant}"
    size="${args.size}"
    type="${args.type}"
    ${args.disabled ? "disabled" : ""}
  >
    ${args.label}
  </hds-button>
`;

export default {
  title: "Components/Button",
  argTypes: {
    label: { control: "text" },
    variant: { control: "select", options: ["default", "secondary"] },
    size: { control: "select", options: ["s", "m", "l"] },
    type: { control: "select", options: ["button", "submit", "reset"] },
    disabled: { control: "boolean" },
  },
};

export const Playground = {
  args: {
    label: "Button",
    variant: "default",
    size: "m",
    type: "button",
    disabled: false,
  },
  render,
};
