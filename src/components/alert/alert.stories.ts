import type { Meta, StoryObj } from "@storybook/html";
import "./alert.js";
import "../button/button.js";
import { ALERT_VARIANTS } from "./alert.constants.js";
import type { AlertStoryArgs, AlertVariant } from "./alert.types.js";

const SAMPLES: Record<AlertVariant, { heading: string; message: string }> = {
  info: {
    heading: "Office hours have changed",
    message:
      "Our phone lines are open Monday to Friday, 8am to 6pm, from 1 December.",
  },
  success: {
    heading: "Application submitted",
    message:
      "Your reference number is HDN-4821. We have sent a copy to your email.",
  },
  warning: {
    heading: "Your session will end soon",
    message: "Save your progress or you will need to start again.",
  },
  danger: {
    heading: "We could not process your payment",
    message: "Check your card details and try again.",
  },
};

const alert = ({
  variant = "info",
  heading = "",
  message = "",
}: AlertStoryArgs): string => `
  <hds-alert variant="${variant}">
    ${heading ? `<h2>${heading}</h2>` : ""}
    ${message ? `<p>${message}</p>` : ""}
  </hds-alert>
`;

const stack = (children: string): string =>
  `<div style="display: grid; gap: 1rem; max-inline-size: 40rem;">${children}</div>`;

const meta = {
  title: "Components/Alert",
  component: "hds-alert",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          '`hds-alert` shows an important message in the flow of the page, such as a confirmation, a warning, or an error summary. Put a heading and paragraphs inside it. The color and icon set the tone, and a visually hidden label ("Information", "Success", "Warning", or "Error") gives screen reader users the same cue, so the meaning never rests on color alone. Translate the label with a `slot="label"` child. A static alert needs no role. When you insert one after a user action, add `role="status"`, or `role="alert"` for errors that need attention now, so screen readers announce it.',
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ALERT_VARIANTS,
      description: "Tone of the message.",
      table: { defaultValue: { summary: "info" } },
    },
    heading: {
      control: "text",
      description: "Storybook-only: text of the `<h2>` inside the alert.",
    },
    message: {
      control: "text",
      description: "Storybook-only: text of the paragraph inside the alert.",
    },
  },
} satisfies Meta<AlertStoryArgs>;

export default meta;
type Story = StoryObj<AlertStoryArgs>;

export const Playground: Story = {
  args: { variant: "info", ...SAMPLES.info },
  render: alert,
};

export const Variants: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "**info** for neutral news, **success** to confirm an action, **warning** for something the user should act on, and **danger** for an error.",
      },
    },
  },
  render: () =>
    stack(
      ALERT_VARIANTS.map((variant) =>
        alert({ variant, ...SAMPLES[variant] }),
      ).join(""),
    ),
};

export const MessageOnly: Story = {
  name: "Message Only",
  parameters: {
    docs: {
      description: {
        story: "Leave out the heading for a short, one-line message.",
      },
    },
  },
  render: () =>
    stack(
      ALERT_VARIANTS.map((variant) =>
        alert({ variant, message: SAMPLES[variant].message }),
      ).join(""),
    ),
};

export const WithActions: Story = {
  name: "With Actions",
  parameters: {
    docs: {
      description: {
        story:
          "Any content can follow the message, such as a list or a button.",
      },
    },
  },
  render: () =>
    stack(`
      <hds-alert variant="danger">
        <h2>There is a problem</h2>
        <ul style="margin: 0; padding-inline-start: 1.25rem;">
          <li>Enter your date of birth</li>
          <li>Enter a postcode, like AA1 1AA</li>
        </ul>
      </hds-alert>
      <hds-alert variant="warning">
        <h2>Your session will end in 2 minutes</h2>
        <p>Save your progress or you will need to start again.</p>
        <div><hds-button size="s">Stay signed in</hds-button></div>
      </hds-alert>`),
};

export const Translated: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'A `slot="label"` child replaces the hidden label, here in Welsh.',
      },
    },
  },
  render: () =>
    stack(`
      <hds-alert variant="warning" lang="cy">
        <span slot="label">Rhybudd</span>
        <p>Bydd eich sesiwn yn dod i ben yn fuan.</p>
      </hds-alert>`),
};

export const RightToLeft: Story = {
  name: "Right To Left",
  parameters: {
    docs: {
      description: {
        story:
          "The icon and accent edge sit at the start of the reading direction.",
      },
    },
  },
  render: () =>
    `<div dir="rtl">${stack(alert({ variant: "success", ...SAMPLES.success }))}</div>`,
};
