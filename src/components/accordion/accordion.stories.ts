import type { Meta, StoryObj } from "@storybook/html";
import "./accordion.js";
import type {
  AccordionStoryArgs,
  AccordionStoryItem,
} from "./accordion.types.js";

const defaultItems: AccordionStoryItem[] = [
  {
    heading: "What is Heaven?",
    content: "Heaven is a design system of small, native-first web components.",
  },
  {
    heading: "Does it need JavaScript?",
    content:
      "Opening, closing, and keyboard support come from the native details element. The script only wires up the markup.",
  },
  {
    heading: "Can I theme it?",
    content:
      "Yes. Components read the semantic tokens, so overriding them re-themes everything, dark mode included.",
  },
];

const accordion = ({
  exclusive = false,
  items = defaultItems,
}: AccordionStoryArgs): string => `
  <hds-accordion ${exclusive ? "exclusive" : ""}>
    ${items
      .map(
        (item) =>
          `<div heading="${item.heading}"${item.open ? " open" : ""}>${
            item.content
          }</div>`,
      )
      .join("")}
  </hds-accordion>
`;

const meta = {
  title: "Components/Accordion",
  component: "hds-accordion",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "`hds-accordion` stacks collapsible sections. Each direct child is one section: its `heading` attribute is the title and its content is the panel. Sections are native `details` elements underneath, so toggling and keyboard support (`Tab`, `Enter`, `Space`) are handled by the browser. Open state is mirrored to an `open` attribute on the child. Add `exclusive` to keep only one section open at a time.",
      },
    },
  },
  argTypes: {
    exclusive: {
      control: "boolean",
      description: "Only one section can be open at a time.",
      table: { defaultValue: { summary: "false" } },
    },
    items: {
      control: "object",
      description:
        "Storybook-only: heading, content, and open state per section.",
    },
  },
} satisfies Meta<AccordionStoryArgs>;

export default meta;
type Story = StoryObj<AccordionStoryArgs>;

export const Playground: Story = {
  args: {
    exclusive: false,
    items: defaultItems,
  },
  render: accordion,
};

export const Exclusive: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "With `exclusive`, opening a section closes the others. This uses the native `name` grouping of `details`.",
      },
    },
  },
  args: {
    exclusive: true,
    items: defaultItems,
  },
  render: accordion,
};

export const OpenByDefault: Story = {
  name: "Open By Default",
  parameters: {
    docs: {
      description: {
        story: "Add `open` to a section to start it expanded.",
      },
    },
  },
  args: {
    exclusive: false,
    items: defaultItems.map((item, index) => ({ ...item, open: index === 0 })),
  },
  render: accordion,
};
