import { create } from "storybook/theming/create";

export default create({
  base: "light",

  brandTitle: "Heaven Design System",
  brandUrl: "/",
  brandTarget: "_self",

  colorPrimary: "#0c1a3d",
  colorSecondary: "#3559c7",

  appBg: "#f7f8fa",
  appContentBg: "#ffffff",
  appPreviewBg: "#ffffff",
  appBorderColor: "#e6e8ec",
  appBorderRadius: 8,

  textColor: "#0c1a3d",
  textInverseColor: "#ffffff",
  textMutedColor: "#667680",

  barTextColor: "#55595d",
  barSelectedColor: "#3559c7",
  barHoverColor: "#3559c7",
  barBg: "#ffffff",

  inputBg: "#ffffff",
  inputBorder: "#d8dee4",
  inputTextColor: "#0c1a3d",
  inputBorderRadius: 6,

  fontBase:
    '-apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Roboto, Arial, sans-serif',
  fontCode:
    '"JetBrains Mono", "Fira Code", "Droid Sans Mono", "Courier New", monospace',
});
