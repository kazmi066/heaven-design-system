import { colors, label } from "./_tokens.js";

const swatches = (items, prefix = "color-") => `
  <div class="sb-grid cols-3">
    ${items
      .map(
        (t) => `
      <div class="sb-card">
        <div class="sb-swatch" style="background: var(${t.token});"></div>
        <p class="sb-card-title">${label(t, prefix)}</p>
        <p class="sb-card-meta">var(${t.token})</p>
      </div>`,
      )
      .join("")}
  </div>`;

const section = (title, items) =>
  items.length
    ? `<h2>${title}</h2>${swatches(items)}`
    : "";

export default {
  title: "Foundations/Colors",
  parameters: {
    layout: "fullscreen",
    options: { showPanel: false },
    docs: { disable: true },
  },
  tags: ["!autodocs"],
};

export const Palette = {
  render: () => `
    <main class="sb-page">
      <h1>Colors</h1>
      <p>All color tokens are exposed as CSS custom properties. Use semantic tokens in components — avoid hard-coding hex values. This page reads from <code>src/css/tokens.css</code> directly, so edits there show up here automatically.</p>

      ${section("Brand", colors.brand)}
      ${section("Semantic", colors.semantic)}
      ${section("Text", colors.text)}
      ${section("Surface", colors.surface)}
      ${section("Border", colors.border)}
      ${section("Icon", colors.icon)}
    </main>
  `,
};
