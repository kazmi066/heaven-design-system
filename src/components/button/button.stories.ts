import type { Meta, StoryObj } from "@storybook/html";
import "./button.js";
import {
  BUTTON_SIZES,
  BUTTON_TYPES,
  BUTTON_VARIANTS,
} from "./button.constants.js";
import type { ButtonStoryArgs } from "./button.types.js";

const STAR_ICON = `
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" slot="start">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>`;

const button = ({
  variant = "default",
  size = "m",
  type = "button",
  disabled = false,
  loading = false,
  loadingLabel = "Loading…",
  icon = false,
  label = "Button",
}: ButtonStoryArgs): string => `
  <hds-button
    variant="${variant}"
    size="${size}"
    type="${type}"
    ${disabled ? "disabled" : ""}
    ${loading ? "loading" : ""}
    ${loadingLabel ? `loading-label="${loadingLabel}"` : ""}
  >${icon ? STAR_ICON : ""}${label}</hds-button>`;

const showcase = (children: string): string =>
  `<div class="sb-showcase">${children}</div>`;

const meta = {
  title: "Components/Button",
  component: "hds-button",
  argTypes: {
    variant: {
      control: "select",
      options: BUTTON_VARIANTS,
      description: "Visual style of the button.",
      table: { defaultValue: { summary: "default" } },
    },
    size: {
      control: "select",
      options: BUTTON_SIZES,
      description: "Button size.",
      table: { defaultValue: { summary: "m" } },
    },
    type: {
      control: "select",
      options: BUTTON_TYPES,
      table: { defaultValue: { summary: "button" } },
    },
    disabled: { control: "boolean" },
    loading: {
      control: "boolean",
      description:
        "Marks the action as busy, shows a spinner, and prevents repeat clicks.",
    },
    loadingLabel: {
      control: "text",
      description: "Status text shown while the button is loading.",
      table: { defaultValue: { summary: "Loading…" } },
    },
    icon: {
      control: "boolean",
      description: 'Storybook-only: render a leading icon via slot="start".',
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
} satisfies Meta<ButtonStoryArgs>;

export default meta;
type Story = StoryObj<ButtonStoryArgs>;

export const Playground: Story = {
  args: {
    variant: "default",
    size: "m",
    type: "button",
    disabled: false,
    loading: false,
    loadingLabel: "Loading…",
    icon: false,
    label: "Button",
  },
  render: button,
};

export const Variants: Story = {
  parameters: {
    docs: {
      description: {
        story: "All available visual variants rendered side-by-side.",
      },
    },
  },
  render: () =>
    showcase(
      BUTTON_VARIANTS.map(
        (variant) => `<hds-button variant="${variant}">${variant}</hds-button>`,
      ).join(""),
    ),
};

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: "Buttons come in three sizes: `s`, `m`, `l`.",
      },
    },
  },
  render: () =>
    showcase(
      BUTTON_SIZES.map(
        (size) => `<hds-button size="${size}">Size ${size}</hds-button>`,
      ).join(""),
    ),
};

export const States: Story = {
  parameters: {
    docs: {
      description: {
        story: "Default, disabled, and loading states across variants.",
      },
    },
  },
  render: () => `
    <div style="display: grid; gap: 0.75rem;">
      ${showcase(
        BUTTON_VARIANTS.map(
          (variant) => `<hds-button variant="${variant}">${variant}</hds-button>`,
        ).join(""),
      )}
      ${showcase(
        BUTTON_VARIANTS.map(
          (variant) =>
            `<hds-button variant="${variant}" disabled>${variant}</hds-button>`,
        ).join(""),
      )}
      ${showcase(
        BUTTON_VARIANTS.map(
          (variant) =>
            `<hds-button variant="${variant}" loading loading-label="Saving…">${variant}</hds-button>`,
        ).join(""),
      )}
    </div>`,
};

export const Loading: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Set `loading` while an async action is pending, then remove it when the action settles. `loading-label` can describe the specific operation.",
      },
    },
  },
  render: () =>
    showcase(`
      <hds-button loading>Continue</hds-button>
      <hds-button variant="secondary" loading loading-label="Uploading…">
        Upload file
      </hds-button>
      <hds-button variant="success" loading loading-label="Saving…">
        Save changes
      </hds-button>
    `),
};

export const WithIcon: Story = {
  name: "With Icon",
  parameters: {
    docs: {
      description: {
        story:
          'Icons can be projected via the `start` or `end` slots. The button spaces slotted content automatically.',
      },
    },
  },
  render: () =>
    showcase(
      BUTTON_VARIANTS.map(
        (variant) => `
        <hds-button variant="${variant}">
          ${STAR_ICON}
          Starred
        </hds-button>`,
      ).join(""),
    ),
};
