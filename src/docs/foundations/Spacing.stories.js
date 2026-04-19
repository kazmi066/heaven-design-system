import { spacing, label } from "./_tokens.js";

export default {
  title: "Foundations/Spacing",
  parameters: {
    layout: "fullscreen",
    options: { showPanel: false },
    docs: { disable: true },
  },
  tags: ["!autodocs"],
};

const row = (t) => `
  <div class="sb-list-row" style="grid-template-columns: 100px 220px 1fr; align-items: center;">
    <code>${label(t, "space-")}</code>
    <code>var(${t.token})</code>
    <div class="sb-box-inner" style="width: var(${t.token}); height: 24px;"></div>
  </div>`;

export const Scale = {
  render: () => `
    <main class="sb-page">
      <h1>Spacing</h1>
      <p>Spacing tokens follow a fluid scale. Use one-up <em>pair</em> tokens when you want space to shrink on small viewports and grow on larger ones. Values are read live from <code>tokens.css</code>.</p>

      <h2>Scale</h2>
      <div class="sb-list">
        ${spacing.scale.map(row).join("")}
      </div>

      ${
        spacing.pairs.length
          ? `
      <h2>One-up pairs</h2>
      <div class="sb-list">
        ${spacing.pairs.map(row).join("")}
      </div>`
          : ""
      }
    </main>
  `,
};
