import { radii, label } from "./_tokens.js";

export default {
  title: "Foundations/Radius",
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
      <h1>Radius</h1>
      <p>Corner radius tokens keep UI curvature consistent across components.</p>

      <div class="sb-grid cols-3">
        ${radii
          .map(
            (t) => `
          <div class="sb-card" style="display: flex; flex-direction: column; align-items: center; gap: 0.75rem;">
            <div style="
              width: 96px; height: 96px;
              background: var(--hds-color-accent);
              border-radius: var(${t.token});
            "></div>
            <div style="text-align: center;">
              <p class="sb-card-title" style="margin:0;">${label(t, "radius-")}</p>
              <p class="sb-card-meta">var(${t.token}) · ${t.value}</p>
            </div>
          </div>`,
          )
          .join("")}
      </div>
    </main>
  `,
};
