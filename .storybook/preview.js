import "../src/css/main.css";
import "./storybook.css";
import theme from "./theme.js";

/** @type { import('@storybook/html-vite').Preview } */
const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },

    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    layout: "centered",

    backgrounds: {
      default: "Surface",
      values: [
        { name: "Surface", value: "#ffffff" },
        { name: "App", value: "#f7f8fa" },
        { name: "Muted", value: "#eef1f5" },
        { name: "Inverse", value: "#0c1a3d" },
      ],
    },

    options: {
      storySort: {
        method: "alphabetical",
        order: [
          "Welcome",
          ["Introduction", "Getting Started", "Changelog"],
          "Foundations",
          [
            "Overview",
            "Colors",
            "Typography",
            "Spacing",
            "Radius",
            "Shadows",
            "Motion",
            "Z-Index",
          ],
          "Components",
          ["Overview"],
          "Patterns",
          "*",
        ],
      },
    },

    docs: {
      theme,
      toc: { headingSelector: "h2, h3" },
      source: { language: "html", type: "dynamic" },
    },

    a11y: { test: "todo" },
  },

  tags: ["autodocs"],
};

export default preview;
export const { parameters, tags } = preview;
