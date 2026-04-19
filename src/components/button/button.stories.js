import "./button.js";

const STAR_ICON = `
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" slot="start">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>`;

const VARIANTS = ["default", "secondary", "success", "danger", "warning", "info"];
const SIZES = ["s", "m", "l"];

const button = (args) => `
  <hds-button
    variant="${args.variant}"
    size="${args.size}"
    type="${args.type}"
    ${args.disabled ? "disabled" : ""}
  >${args.icon ? STAR_ICON : ""}${args.label ?? "Button"}</hds-button>`;

const showcase = (children) =>
  `<div class="sb-showcase">${children}</div>`;

const meta = {
  title: "Components/Button",
  component: "hds-button",
  argTypes: {
    variant: {
      control: "select",
      options: VARIANTS,
      description: "Visual style of the button.",
      table: { defaultValue: { summary: "default" } },
    },
    size: {
      control: "select",
      options: SIZES,
      description: "Button size.",
      table: { defaultValue: { summary: "m" } },
    },
    type: {
      control: "select",
      options: ["button", "submit", "reset"],
      table: { defaultValue: { summary: "button" } },
    },
    disabled: { control: "boolean" },
    icon: {
      control: "boolean",
      description: "Storybook-only: render a leading icon via slot=\"start\".",
    },
    label: { control: "text" },
  },
  parameters: {
    docs: {
      description: {
        component:
          "`hds-button` is the primary action element. Use **default** for primary actions, **secondary** for neutral actions, and semantic variants sparingly to signal intent.",
      },
    },
  },
};

export default meta;

/* ─────────────────────────────────────────────
 * Playground — live controls
 * ───────────────────────────────────────────── */
export const Playground = {
  args: {
    variant: "default",
    size: "m",
    type: "button",
    disabled: false,
    icon: false,
    label: "Button",
  },
  render: button,
};

/* ─────────────────────────────────────────────
 * Variants
 * ───────────────────────────────────────────── */
export const Variants = {
  parameters: {
    docs: {
      description: {
        story: "All available visual variants rendered side-by-side.",
      },
    },
  },
  render: () =>
    showcase(
      VARIANTS.map(
        (v) => `<hds-button variant="${v}">${v}</hds-button>`,
      ).join(""),
    ),
};

/* ─────────────────────────────────────────────
 * Sizes
 * ───────────────────────────────────────────── */
export const Sizes = {
  parameters: {
    docs: {
      description: {
        story: "Buttons come in three sizes: `s`, `m`, `l`.",
      },
    },
  },
  render: () =>
    showcase(
      SIZES.map(
        (s) => `<hds-button size="${s}">Size ${s}</hds-button>`,
      ).join(""),
    ),
};

/* ─────────────────────────────────────────────
 * States
 * ───────────────────────────────────────────── */
export const States = {
  parameters: {
    docs: {
      description: {
        story: "Default and disabled states across variants.",
      },
    },
  },
  render: () => `
    <div style="display: grid; gap: 0.75rem;">
      ${showcase(
        VARIANTS.map(
          (v) => `<hds-button variant="${v}">${v}</hds-button>`,
        ).join(""),
      )}
      ${showcase(
        VARIANTS.map(
          (v) => `<hds-button variant="${v}" disabled>${v}</hds-button>`,
        ).join(""),
      )}
    </div>`,
};

/* ─────────────────────────────────────────────
 * With icon
 * ───────────────────────────────────────────── */
export const WithIcon = {
  name: "With Icon",
  parameters: {
    docs: {
      description: {
        story:
          "Icons can be projected via the `start` or `end` slots. The button spaces slotted content automatically.",
      },
    },
  },
  render: () =>
    showcase(
      VARIANTS.map(
        (v) => `
        <hds-button variant="${v}">
          ${STAR_ICON}
          Starred
        </hds-button>`,
      ).join(""),
    ),
};
