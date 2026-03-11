/** @type { import('@storybook/html-vite').StorybookConfig } */
const config = {
  stories: ["../src/**/*.stories.js"],

  addons: ["@storybook/addon-links", "@storybook/addon-a11y"],

  framework: {
    name: "@storybook/html-vite",
    options: {},
  },

  docs: {
    autodocs: true,
  },
};

export default config;
