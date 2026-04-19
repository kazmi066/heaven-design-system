import { zIndices, label } from "./_tokens.js";

export default {
  title: "Foundations/Z-Index",
  parameters: {
    layout: "fullscreen",
    options: { showPanel: false },
    docs: { disable: true },
  },
  tags: ["!autodocs"],
};

export const Scale = {
  render: () => `
    <main class="sb-page">
      <h1>Z-Index</h1>
      <p>Predefined stacking layers. Use these tokens instead of arbitrary z-index values so overlay order stays predictable.</p>

      <div class="sb-list">
        ${zIndices
          .map(
            (t) => `
          <div class="sb-list-row" style="grid-template-columns: 120px 220px 1fr;">
            <code>z-${label(t, "z-")}</code>
            <code>var(${t.token})</code>
            <span class="sb-type-label">${t.value}</span>
          </div>`,
          )
          .join("")}
      </div>
    </main>
  `,
};
