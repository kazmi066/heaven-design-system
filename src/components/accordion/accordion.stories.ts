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
      "No. Opening, closing, keyboard support, and one-at-a-time groups all come from the native details element. The script only loads the styles.",
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
  <hds-accordion>
    ${items
      .map(
        (item) => `
    <details${exclusive ? ' name="faq"' : ""}${item.open ? " open" : ""}>
      <summary>${item.heading}</summary>
      <p>${item.content}</p>
    </details>`,
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
          "`hds-accordion` styles a stack of native `details` elements. Write each section as `<details><summary>Title</summary><p>Panel</p></details>` and wrap panel content in an element so it picks up the padding. The browser handles toggling, keyboard support (`Tab`, `Enter`, `Space`), find-in-page, and the `open` attribute. To keep one section open at a time, give the sections the same `name`. The open and close animation uses `interpolate-size` and `::details-content`; browsers without them toggle instantly.",
      },
    },
  },
  argTypes: {
    exclusive: {
      control: "boolean",
      description:
        "Storybook-only: gives every section the same `name` so only one can be open at a time.",
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
          "Sections that share a `name` close each other. This is the native `details` grouping, with no script involved.",
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
        story: "Add `open` to a `details` element to start it expanded.",
      },
    },
  },
  args: {
    exclusive: false,
    items: defaultItems.map((item, index) => ({ ...item, open: index === 0 })),
  },
  render: accordion,
};
