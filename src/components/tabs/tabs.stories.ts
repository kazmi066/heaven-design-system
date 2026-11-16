import type { Meta, StoryObj } from "@storybook/html";
import "./tabs.js";
import "../badge/badge.js";
import "../button/button.js";
import { TABS_VARIANTS } from "./tabs.constants.js";
import type { TabsStoryArgs, TabsStoryItem } from "./tabs.types.js";

const defaultItems: TabsStoryItem[] = [
  {
    label: "Eligibility",
    content:
      "<p>You can apply if you are 18 or over and have lived at your current address for at least 12 months.</p>",
  },
  {
    label: "Documents",
    content:
      "<p>Have your proof of identity and a recent utility bill ready before you start.</p>",
  },
  {
    label: "How to apply",
    content: `
      <p>The application takes about 15 minutes. You can save your progress and come back later.</p>
      <hds-button>Start application</hds-button>`,
  },
];

const tabs = ({
  variant = "underline",
  label = "Application guidance",
  selected = 0,
  items = defaultItems,
}: TabsStoryArgs): string => `
  <hds-tabs variant="${variant}">
    <div role="tablist" aria-label="${label}">
      ${items
        .map(
          (item, index) =>
            `<button type="button" aria-selected="${index === selected}"${item.disabled ? " disabled" : ""}>${item.label}</button>`,
        )
        .join("")}
    </div>
    ${items
      .map(
        (item, index) => `
    <div role="tabpanel"${index === selected ? "" : ' hidden="until-found"'}>
      ${item.content}
    </div>`,
      )
      .join("")}
  </hds-tabs>
`;

const meta = {
  title: "Components/Tabs",
  component: "hds-tabs",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          '`hds-tabs` switches between panels of related content in one place. Write a `role="tablist"` of buttons, then one `role="tabpanel"` per tab in the same order. Render the initial state in the HTML: `aria-selected="true"` on the selected tab and `hidden="until-found"` on every other panel, so nothing flashes before the script runs. The element wires the ids and `aria-labelledby`, moves selection with the arrow keys, `Home`, and `End` (through `focusgroup` where the browser has it), and selects the right tab when find-in-page matches text in a hidden panel. It fires `hds-tabs-change` with the new `index`, `tab`, and `panel`, and `selectedIndex` reads or sets the selection. Use tabs for sections of one page, never for site navigation: use links and `aria-current="page"` for that.',
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: TABS_VARIANTS,
      description: "Visual style of the tablist.",
      table: { defaultValue: { summary: "underline" } },
    },
    label: {
      control: "text",
      description:
        "Storybook-only: the tablist's `aria-label`. Every tablist needs an accessible name.",
    },
    selected: {
      control: { type: "number", min: 0 },
      description: "Storybook-only: index of the initially selected tab.",
      table: { defaultValue: { summary: "0" } },
    },
    items: {
      control: "object",
      description:
        "Storybook-only: label, panel HTML, and disabled state per tab.",
    },
  },
} satisfies Meta<TabsStoryArgs>;

export default meta;
type Story = StoryObj<TabsStoryArgs>;

export const Playground: Story = {
  args: {
    variant: "underline",
    label: "Application guidance",
    selected: 0,
    items: defaultItems,
  },
  render: tabs,
};

export const Variants: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "**underline** suits content sections. **pills** suits switching views of the same data, such as a time range.",
      },
    },
  },
  render: () => `
    <div style="display: grid; gap: 2.5rem;">
      ${TABS_VARIANTS.map((variant) => tabs({ variant, label: `${variant} tabs` })).join("")}
    </div>`,
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "A disabled tab stays visible but is skipped by the arrow keys. Prefer hiding a tab the user can never use.",
      },
    },
  },
  args: {
    items: defaultItems.map((item, index) => ({
      ...item,
      disabled: index === 1,
    })),
  },
  render: tabs,
};

export const WithBadges: Story = {
  name: "With Badges",
  parameters: {
    docs: {
      description: {
        story:
          "Tabs can hold other inline content, such as a count. The badge text is part of the tab's accessible name, so keep it short.",
      },
    },
  },
  render: () => `
    <hds-tabs>
      <div role="tablist" aria-label="Case files">
        <button type="button" aria-selected="true">Open <hds-badge variant="info">12</hds-badge></button>
        <button type="button">Waiting <hds-badge variant="warning">3</hds-badge></button>
        <button type="button">Closed</button>
      </div>
      <div role="tabpanel"><p>12 cases are open and assigned to your team.</p></div>
      <div role="tabpanel" hidden="until-found"><p>3 cases are waiting on a reply from the applicant.</p></div>
      <div role="tabpanel" hidden="until-found"><p>Closed cases are kept for 6 years.</p></div>
    </hds-tabs>`,
};

export const Overflow: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Tabs stay on one row. When they do not fit, the tablist scrolls and fades the edge with more tabs beyond it, and the selected tab scrolls into view.",
      },
    },
  },
  render: () => `
    <div style="max-inline-size: 22rem;">
      ${tabs({
        label: "Months",
        selected: 4,
        items: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
        ].map((month) => ({
          label: month,
          content: `<p>Reports filed in ${month}.</p>`,
        })),
      })}
    </div>`,
};

export const RightToLeft: Story = {
  name: "Right To Left",
  parameters: {
    docs: {
      description: {
        story:
          "In a right-to-left context the arrow keys and the edge fades follow the reading direction.",
      },
    },
  },
  render: () => `<div dir="rtl">${tabs({ label: "RTL tabs" })}</div>`,
};
