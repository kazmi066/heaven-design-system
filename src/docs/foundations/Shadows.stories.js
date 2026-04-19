import { shadows, label } from "./_tokens.js";

export default {
  title: "Foundations/Shadows",
  parameters: {
    layout: "fullscreen",
    options: { showPanel: false },
    docs: { disable: true },
  },
  tags: ["!autodocs"],
};

const card = (t, dark = false) => `
  <div class="sb-card" style="background: ${dark ? "#0c1a3d" : "#f7f8fa"}; padding: 1.5rem;">
    <div class="sb-shadow-card" style="box-shadow: var(${t.token});"></div>
    <p class="sb-card-title" style="margin-top: 1rem; color: ${dark ? "#fff" : "inherit"};">
      ${label(t, dark ? "shadow-dark-" : "shadow-")}
    </p>
    <p class="sb-card-meta" style="color: ${dark ? "#b2babf" : ""};">
      var(${t.token})
    </p>
  </div>`;

const section = (title, items, dark) =>
  items.length
    ? `<h2>${title}</h2>
       <div class="sb-grid cols-2">
         ${items.map((t) => card(t, dark)).join("")}
       </div>`
    : "";

export const Elevation = {
  render: () => `
    <main class="sb-page">
      <h1>Shadows</h1>
      <p>Subtle elevation tokens. Pair <code>dark-*</code> tokens with dark surfaces.</p>

      ${section("Light", shadows.light, false)}
      ${section("Dark", shadows.dark, true)}
    </main>
  `,
};
