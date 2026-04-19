import "./button.js";

const render = (args) => `
  <hds-button
    variant="${args.variant}"
    size="${args.size}"
    type="${args.type}"
    ${args.disabled ? "disabled" : ""}
  >
    Button
  </hds-button>
  
  <hds-button
    variant="${args.variant}"
    size="${args.size}"
    type="${args.type}"
    ${args.disabled ? "disabled" : ""}
  >
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" slot="start">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
    Button with Icon
  </hds-button>
`;

export default {
  title: "Components/Button",
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "success", "danger", "info"],
    },
    size: { control: "select", options: ["s", "m", "l"] },
    type: { control: "select", options: ["button", "submit", "reset"] },
    disabled: { control: "boolean" },
  },
};

export const Playground = {
  args: {
    variant: "default",
    size: "m",
    type: "button",
    disabled: false,
  },
  render,
};
