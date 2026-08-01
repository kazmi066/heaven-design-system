import "../src/css/main.css";
import "./storybook.css";
import { withThemeByDataAttribute } from "@storybook/addon-themes";
import theme from "./theme.js";

/** @type { import('@storybook/html-vite').Preview } */
const preview = {
  decorators: [
    withThemeByDataAttribute({
      themes: {
        light: "light",
        dark: "dark",
      },
      defaultTheme: "light",
      attributeName: "data-theme",
    }),
  ],

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
export const { decorators, parameters, tags } = preview;
