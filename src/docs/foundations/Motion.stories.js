import { durations, easings, label } from "./_tokens.js";

export default {
  title: "Foundations/Motion",
  parameters: {
    layout: "fullscreen",
    options: { showPanel: false },
    docs: { disable: true },
  },
  tags: ["!autodocs"],
};

const durationRow = (t) => `
  <div class="sb-list-row sb-motion-row" style="grid-template-columns: 120px 220px 1fr;">
    <code>${label(t, "duration-")}</code>
    <code>var(${t.token}) · ${t.value}</code>
    <div class="sb-motion-track">
      <div class="sb-motion-dot" style="transition-duration: var(${t.token}); transition-timing-function: var(--hds-ease-in-out);"></div>
    </div>
  </div>`;

const easingRow = (t) => `
  <div class="sb-list-row sb-motion-row" style="grid-template-columns: 120px 260px 1fr;">
    <code>${label(t, "ease-")}</code>
    <code>var(${t.token})</code>
    <div class="sb-motion-track">
      <div class="sb-motion-dot" style="transition-duration: var(--hds-duration-slower); transition-timing-function: var(${t.token});"></div>
    </div>
  </div>`;

export const Tokens = {
  render: () => `
    <main class="sb-page">
      <h1>Motion</h1>
      <p>Durations and easings used across transitions and animations. Hover a row to replay.</p>

      <style>
        .sb-motion-track {
          position: relative;
          height: 48px;
          background: var(--hds-color-surface-active);
          border-radius: 999px;
          overflow: hidden;
        }
        .sb-motion-track .sb-motion-dot {
          position: absolute;
          top: 12px;
          left: 12px;
          transition-property: transform;
        }
        .sb-motion-row:hover .sb-motion-dot {
          transform: translateX(calc(100% + 420px));
        }
      </style>

      <h2>Durations</h2>
      <div class="sb-list">
        ${durations.map(durationRow).join("")}
      </div>

      <h2>Easings</h2>
      <div class="sb-list">
        ${easings.map(easingRow).join("")}
      </div>
    </main>
  `,
};
