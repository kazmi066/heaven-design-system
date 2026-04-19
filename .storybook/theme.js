import { create } from "storybook/theming/create";

/**
 * Heaven Design System — Storybook brand theme
 * Inspired by Nord DS / Vercel Geist — calm, minimal, dev-grade.
 */
export default create({
  base: "light",

  // Brand
  brandTitle: "Heaven Design System",
  brandUrl: "/",
  brandTarget: "_self",

  // Core palette
  colorPrimary: "#0c1a3d",
  colorSecondary: "#3559c7",

  // UI
  appBg: "#f7f8fa",
  appContentBg: "#ffffff",
  appPreviewBg: "#ffffff",
  appBorderColor: "#e6e8ec",
  appBorderRadius: 8,

  // Text
  textColor: "#0c1a3d",
  textInverseColor: "#ffffff",
  textMutedColor: "#667680",

  // Toolbar
  barTextColor: "#55595d",
  barSelectedColor: "#3559c7",
  barHoverColor: "#3559c7",
  barBg: "#ffffff",

  // Form
  inputBg: "#ffffff",
  inputBorder: "#d8dee4",
  inputTextColor: "#0c1a3d",
  inputBorderRadius: 6,

  // Typography
  fontBase:
    '-apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Roboto, Arial, sans-serif',
  fontCode:
    '"JetBrains Mono", "Fira Code", "Droid Sans Mono", "Courier New", monospace',
});
