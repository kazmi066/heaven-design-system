export default {
  title: "Welcome/Introduction",
  parameters: {
    layout: "fullscreen",
    options: { showPanel: false },
    docs: { disable: true },
  },
  tags: ["!autodocs"],
};

export const Introduction = {
  name: "Introduction",
  render: () => `
    <main class="sb-page">
      <section class="sb-hero">
        <p class="sb-eyebrow">Heaven Design System</p>
        <h1>A calm, composable UI kit built with Web Components.</h1>
        <p>
          HDS is a learning-first design system, zero frameworks, zero
          build-step lock-in. Tokens drive the theme, Web Components deliver
          the behavior, and Storybook is the documentation surface.
        </p>
        <ul class="sb-tagline-list">
          <li class="sb-tag">Web Components</li>
          <li class="sb-tag">Design tokens</li>
          <li class="sb-tag">Framework agnostic</li>
          <li class="sb-tag">Accessibility first</li>
          <li class="sb-tag">Storybook 10</li>
        </ul>
      </section>

      <section>
        <h2>Explore</h2>
        <div class="sb-grid cols-2">
          <div class="sb-card">
            <p class="sb-card-title">Foundations</p>
            <p class="sb-card-meta">Colors · Typography · Spacing · Radius · Shadows · Motion</p>
            <p>The design tokens every component is built on.</p>
          </div>
          <div class="sb-card">
            <p class="sb-card-title">Components</p>
            <p class="sb-card-meta">Buttons, inputs, overlays, navigation…</p>
            <p>Accessible, themeable custom elements with clean APIs.</p>
          </div>
          <div class="sb-card">
            <p class="sb-card-title">Patterns</p>
            <p class="sb-card-meta">Coming soon</p>
            <p>Composed recipes: forms, dialogs, empty states, and more.</p>
          </div>
          <div class="sb-card">
            <p class="sb-card-title">Playground</p>
            <p class="sb-card-meta">Every story has a Controls panel</p>
            <p>Tweak props live to preview the behavior and styles.</p>
          </div>
        </div>
      </section>

      <section>
        <h2>Conventions</h2>
        <div class="sb-list">
          <div class="sb-list-row">
            <code>hds-*</code>
            <span>Every custom element & CSS token is prefixed <code>hds-</code>.</span>
          </div>
          <div class="sb-list-row">
            <code>Welcome</code>
            <span>Onboarding, changelog, and high-level docs.</span>
          </div>
          <div class="sb-list-row">
            <code>Foundations</code>
            <span>Design tokens, the single source of truth.</span>
          </div>
          <div class="sb-list-row">
            <code>Components / *</code>
            <span>One folder per component with <code>.js</code> and <code>.stories.js</code>.</span>
          </div>
          <div class="sb-list-row">
            <code>Patterns / *</code>
            <span>Composed UX recipes built from multiple components.</span>
          </div>
        </div>
      </section>

      <section>
        <h2>Getting started</h2>
        <p>Use the sidebar to navigate. Each component exposes a <strong>Playground</strong> story, use the <em>Controls</em> panel to explore props live.</p>
      </section>
    </main>
  `,
};
