export default {
  title: "Foundations/Overview",
  parameters: {
    layout: "fullscreen",
    options: { showPanel: false },
    docs: { disable: true },
  },
  tags: ["!autodocs"],
};

export const Overview = {
  render: () => `
    <main class="sb-page">
      <h1>Foundations</h1>
      <p>
        Foundations are the design tokens that every HDS component consumes.
        They live in <code>src/css/tokens.css</code> and are exposed as CSS
        custom properties prefixed with <code>--hds-</code>.
      </p>

      <div class="sb-grid cols-2">
        <div class="sb-card">
          <p class="sb-card-title">Colors</p>
          <p class="sb-card-meta">--hds-color-*</p>
          <p>Brand, text, surface, border, and semantic colors.</p>
        </div>
        <div class="sb-card">
          <p class="sb-card-title">Typography</p>
          <p class="sb-card-meta">--hds-font-*</p>
          <p>Fluid type scale, weights, line-heights, families.</p>
        </div>
        <div class="sb-card">
          <p class="sb-card-title">Spacing</p>
          <p class="sb-card-meta">--hds-space-*</p>
          <p>Fluid spacing scale with one-up pairs.</p>
        </div>
        <div class="sb-card">
          <p class="sb-card-title">Radius</p>
          <p class="sb-card-meta">--hds-radius-*</p>
          <p>Corner radius scale.</p>
        </div>
        <div class="sb-card">
          <p class="sb-card-title">Shadows</p>
          <p class="sb-card-meta">--hds-shadow-*</p>
          <p>Elevation tokens for light & dark surfaces.</p>
        </div>
        <div class="sb-card">
          <p class="sb-card-title">Motion</p>
          <p class="sb-card-meta">--hds-duration-*, --hds-ease-*</p>
          <p>Duration and easing for consistent animation.</p>
        </div>
      </div>
    </main>
  `,
};
