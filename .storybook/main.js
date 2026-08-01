/** @type { import('@storybook/html-vite').StorybookConfig } */
const config = {
  stories: ["../src/**/*.stories.js", "../src/**/*.stories.ts"],

  addons: [
    "@storybook/addon-links",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-themes",
  ],

  framework: {
    name: "@storybook/html-vite",
    options: {},
  },

  docs: {
    autodocs: true,
  },
};

export default config;
