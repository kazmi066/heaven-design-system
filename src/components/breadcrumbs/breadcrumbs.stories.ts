import type { Meta, StoryObj } from "@storybook/html";
import "./breadcrumbs.js";
import { BREADCRUMB_LABEL } from "./breadcrumbs.constants.js";
import type { BreadcrumbsStoryArgs } from "./breadcrumbs.types.js";

const breadcrumbs = ({
  label = BREADCRUMB_LABEL,
  currentAsLink = false,
}: BreadcrumbsStoryArgs): string => `
  <hds-breadcrumbs label="${label}">
    <a href="#home">Home</a>
    <a href="#components">Components</a>
    ${
      currentAsLink
        ? `<a href="#breadcrumbs">Breadcrumbs</a>`
        : `<span>Breadcrumbs</span>`
    }
  </hds-breadcrumbs>
`;

const meta = {
  title: "Components/Breadcrumbs",
  component: "hds-breadcrumbs",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "`hds-breadcrumbs` shows where the current page sits in the site hierarchy. Ancestor pages are links. The last item is the current page, and the component marks it with `aria-current=\"page\"`. Separators are drawn in CSS so they stay out of the accessibility tree. The trail wraps when the width runs out.",
      },
    },
  },
  argTypes: {
    label: {
      control: "text",
      description: "Accessible name of the breadcrumb navigation.",
      table: { defaultValue: { summary: BREADCRUMB_LABEL } },
    },
    currentAsLink: {
      control: "boolean",
      description: "Storybook-only: render the current page as a link.",
    },
  },
} satisfies Meta<BreadcrumbsStoryArgs>;

export default meta;
type Story = StoryObj<BreadcrumbsStoryArgs>;

export const Playground: Story = {
  args: {
    label: BREADCRUMB_LABEL,
    currentAsLink: false,
  },
  render: breadcrumbs,
};

export const Wrapping: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "A long trail in a narrow column. Items wrap onto the next line.",
      },
    },
  },
  render: () => `
    <div style="max-width: 16rem">
      <hds-breadcrumbs>
        <a href="#home">Home</a>
        <a href="#settings">Settings</a>
        <a href="#notifications">Notifications</a>
        <span>Email and push preferences</span>
      </hds-breadcrumbs>
    </div>
  `,
};
