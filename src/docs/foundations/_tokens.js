/*
 * Single source of truth for Foundations stories.
 *
 * Parses src/css/tokens.css at build time (Vite `?raw`) and groups every
 * `--hds-*` custom property by name prefix. Foundation stories import the
 * groups from here — when you add, rename, or delete a token in tokens.css,
 * the stories update automatically. No duplication.
 *
 * The underscore prefix (_tokens.js) keeps Storybook from picking this file
 * up as a story.
 */

import raw from "../../css/tokens.css?raw";

/* ─────────────────────────────────────────────
 * Parse all `--hds-<name>: <value>;` declarations.
 * ───────────────────────────────────────────── */
const tokenRe = /--hds-([a-z0-9-]+)\s*:\s*([^;]+);/gi;
const all = [];
const seen = new Set();
for (let m; (m = tokenRe.exec(raw)) !== null; ) {
  if (seen.has(m[1])) continue;

  seen.add(m[1]);
  all.push({
    name: m[1], // e.g. "color-accent"
    token: `--hds-${m[1]}`, // e.g. "--hds-color-accent"
    value: m[2].trim(), // e.g. "#3559c7"
  });
}

const by = (pred) => all.filter(pred);
const named = (names) =>
  names.map((n) => all.find((t) => t.name === n)).filter(Boolean);

/**
 * Strip a known prefix from a token name to produce a short display label.
 *   label("color-accent", "color-") -> "accent"
 */
export const label = (t, prefix) => t.name.replace(prefix, "");

/* ─────────────────────────────────────────────
 * Colors
 * ───────────────────────────────────────────── */
export const colors = {
  brand: named(["color-accent", "color-primary", "color-secondary"]),
  semantic: named([
    "color-success",
    "color-danger",
    "color-warning",
    "color-info",
  ]),
  text: by((t) => t.name.startsWith("color-text")),
  surface: by((t) => /^color-(surface|header)/.test(t.name)),
  border: by((t) => t.name.startsWith("color-border")),
  icon: by((t) => t.name.startsWith("color-icon")),
};

/* ─────────────────────────────────────────────
 * Typography
 * ───────────────────────────────────────────── */
export const fontSizes = by((t) => t.name.startsWith("font-size-"));
export const fontWeights = by((t) => t.name.startsWith("font-weight-"));
export const lineHeights = by((t) => t.name.startsWith("line-height-"));
export const letterSpacings = by((t) => t.name.startsWith("letter-spacing-"));
export const fontFamilies = by((t) => t.name.startsWith("font-family"));

/* ─────────────────────────────────────────────
 * Spacing — single tokens vs one-up pairs
 *   "space-md"    -> scale
 *   "space-sm-md" -> pair
 * ───────────────────────────────────────────── */
const spaceAll = by((t) => t.name.startsWith("space-"));
export const spacing = {
  scale: spaceAll.filter((t) => !t.name.slice("space-".length).includes("-")),
  pairs: spaceAll.filter((t) => t.name.slice("space-".length).includes("-")),
};

/* ─────────────────────────────────────────────
 * Radius, Shadows, Motion, Z-index
 * ───────────────────────────────────────────── */
export const radii = by((t) => t.name.startsWith("radius-"));

const shadowAll = by((t) => t.name.startsWith("shadow-"));
export const shadows = {
  light: shadowAll.filter((t) => !t.name.startsWith("shadow-dark-")),
  dark: shadowAll.filter((t) => t.name.startsWith("shadow-dark-")),
};

export const durations = by((t) => t.name.startsWith("duration-"));
export const easings = by((t) => t.name.startsWith("ease-"));
export const zIndices = by((t) => t.name.startsWith("z-"));
