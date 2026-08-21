import type { Meta, StoryObj } from "@storybook/html";
import "./badge.js";
import { BADGE_VARIANTS } from "./badge.constants.js";
import type { BadgeStoryArgs } from "./badge.types.js";

const badge = ({
  variant = "default",
  label = "New",
}: BadgeStoryArgs): string => `
  <hds-badge variant="${variant}">${label}</hds-badge>
`;

const showcase = (children: string): string =>
  `<div class="sb-showcase">${children}</div>`;

const meta = {
  title: "Components/Badge",
  component: "hds-badge",
  argTypes: {
    variant: {
      control: "select",
      options: BADGE_VARIANTS,
      description: "Visual style of the badge.",
      table: { defaultValue: { summary: "default" } },
    },
    label: {
      control: "text",
      description: "Storybook-only: text rendered inside the badge.",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "`hds-badge` is a small label for counts, statuses, or short metadata. It is static and not interactive. Content is projected via the default slot.",
      },
    },
  },
} satisfies Meta<BadgeStoryArgs>;

export default meta;
type Story = StoryObj<BadgeStoryArgs>;

export const Playground: Story = {
  args: {
    variant: "default",
    label: "New",
  },
  render: badge,
};

export const Variants: Story = {
  parameters: {
    docs: {
      description: {
        story: "All available color variants rendered side-by-side.",
      },
    },
  },
  render: () =>
    showcase(
      BADGE_VARIANTS.map(
        (variant) => `<hds-badge variant="${variant}">${variant}</hds-badge>`,
      ).join(""),
    ),
};
