import { HdsButton } from "./button.js";
import "./button.css";

export default {
  title: "Components/Button",

  parameters: {
    controls: { sort: "alpha" },
  },

  argTypes: {
    label: {
      control: "text",
      description: "Button label",
    },

    style: {
      control: "select",
      options: ["primary", "secondary"],
    },

    disabled: {
      control: "boolean",
    },
  },
};

export const Primary = {
  args: {
    label: "Primary Button",
    style: "primary",
  },

  render: (args) => HdsButton(args),
};

export const Secondary = {
  args: {
    label: "Secondary Button",
    style: "secondary",
  },

  render: (args) => HdsButton(args),
};
