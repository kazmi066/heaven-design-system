import raw from "../../css/tokens.css?raw";

const tokenRe = /--hds-([a-z0-9-]+)\s*:\s*([^;]+);/gi;
const all = [];
const seen = new Set();
for (let m; (m = tokenRe.exec(raw)) !== null;) {
  if (seen.has(m[1])) continue;

  seen.add(m[1]);
  all.push({
    name: m[1],
    token: `--hds-${m[1]}`,
    value: m[2].trim(),
  });
}

const by = (pred) => all.filter(pred);
const named = (names) =>
  names.map((n) => all.find((t) => t.name === n)).filter(Boolean);

export const label = (t, prefix) => t.name.replace(prefix, "");

export const colors = {
  brand: named(["color-accent", "color-primary", "color-secondary"]),
  semantic: named([
    "color-success",
    "color-danger",
    "color-warning",
    "color-info",
    "color-accent-strong",
    "color-success-strong",
    "color-danger-strong",
    "color-warning-strong",
    "color-info-strong",
    "color-neutral-soft",
    "color-accent-soft",
    "color-success-soft",
    "color-danger-soft",
    "color-warning-soft",
    "color-info-soft",
    "color-focus",
  ]),
  text: by((t) => t.name.startsWith("color-text")),
  surface: by((t) => /^color-(surface|header)/.test(t.name)),
  border: by((t) => t.name.startsWith("color-border")),
  icon: by((t) => t.name.startsWith("color-icon")),
};

export const fontSizes = by((t) => t.name.startsWith("font-size-"));
export const fontWeights = by((t) => t.name.startsWith("font-weight-"));
export const lineHeights = by((t) => t.name.startsWith("line-height-"));
export const letterSpacings = by((t) => t.name.startsWith("letter-spacing-"));
export const fontFamilies = by((t) => t.name.startsWith("font-family"));

const spaceAll = by((t) => t.name.startsWith("space-"));
export const spacing = {
  scale: spaceAll.filter((t) => !t.name.slice("space-".length).includes("-")),
  pairs: spaceAll.filter((t) => t.name.slice("space-".length).includes("-")),
};

export const radii = by((t) => t.name.startsWith("radius-"));

const shadowAll = by((t) => t.name.startsWith("shadow-"));
export const shadows = {
  light: shadowAll.filter((t) => !t.name.startsWith("shadow-dark-")),
  dark: shadowAll.filter((t) => t.name.startsWith("shadow-dark-")),
};

export const durations = by((t) => t.name.startsWith("duration-"));
export const easings = by((t) => t.name.startsWith("ease-"));
export const zIndices = by((t) => t.name.startsWith("z-"));
