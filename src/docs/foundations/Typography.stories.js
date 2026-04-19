import {
  fontSizes,
  fontWeights,
  lineHeights,
  letterSpacings,
  fontFamilies,
  label,
} from "./_tokens.js";

export default {
  title: "Foundations/Typography",
  parameters: {
    layout: "fullscreen",
    options: { showPanel: false },
    docs: { disable: true },
  },
  tags: ["!autodocs"],
};

const sizeRow = (t) => `
  <div class="sb-type-row">
    <span class="sb-type-label">${label(t, "font-size-")}</span>
    <span class="sb-type-label">var(${t.token})</span>
    <span style="font-size: var(${t.token}); line-height: 1.2;">
      The quick brown fox
    </span>
  </div>`;

const weightCard = (t) => `
  <div class="sb-card">
    <p class="sb-card-title" style="font-weight: var(${t.token}); font-size: 1.25rem; margin-bottom: 0.5rem;">
      ${label(t, "font-weight-")}
    </p>
    <p class="sb-card-meta">var(${t.token}) · ${t.value}</p>
  </div>`;

const lineHeightCard = (t) => `
  <div class="sb-card">
    <p class="sb-card-title">${label(t, "line-height-")}</p>
    <p class="sb-card-meta">var(${t.token}) · ${t.value}</p>
    <p style="line-height: var(${t.token}); margin: 0.5rem 0 0;">
      Stacked lines of sample copy to demonstrate the chosen line-height token in a realistic paragraph context.
    </p>
  </div>`;

const letterSpacingCard = (t) => `
  <div class="sb-card">
    <p class="sb-card-title" style="letter-spacing: var(${t.token});">
      ${label(t, "letter-spacing-")}
    </p>
    <p class="sb-card-meta">var(${t.token}) · ${t.value}</p>
  </div>`;

const familyCard = (t) => `
  <div class="sb-card">
    <p class="sb-card-meta">var(${t.token})</p>
    <p style="font-family: var(${t.token}); font-size: 1.25rem; margin: 0.25rem 0 0;">
      The quick brown fox jumps over the lazy dog
    </p>
  </div>`;

export const Scale = {
  render: () => `
    <main class="sb-page">
      <h1>Typography</h1>
      <p>Every token below is read directly from <code>src/css/tokens.css</code>.</p>

      <h2>Scale</h2>
      <div class="sb-list" style="padding: 0.5rem 1rem;">
        ${fontSizes.map(sizeRow).join("")}
      </div>

      <h2>Weights</h2>
      <div class="sb-grid cols-2">
        ${fontWeights.map(weightCard).join("")}
      </div>

      <h2>Line heights</h2>
      <div class="sb-grid cols-2">
        ${lineHeights.map(lineHeightCard).join("")}
      </div>

      ${
        letterSpacings.length
          ? `
      <h2>Letter spacing</h2>
      <div class="sb-grid cols-3">
        ${letterSpacings.map(letterSpacingCard).join("")}
      </div>`
          : ""
      }

      <h2>Families</h2>
      <div class="sb-grid cols-2">
        ${fontFamilies.map(familyCard).join("")}
      </div>
    </main>
  `,
};
