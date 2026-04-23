import "./heading.js";

const LEVELS = ["h1", "h2", "h3", "h4", "h5", "h6"];
const VARIANTS = ["default", "subtle", "accent", "success", "danger", "warning"];

const heading = (args) => `
  <hds-heading
    level="${args.level}"
    variant="${args.variant}"
  >${args.text || `Heading ${args.level.toUpperCase()}`}</hds-heading>`;

const showcase = (children) =>
  `<div class="sb-showcase">${children}</div>`;

const meta = {
  title: "Components/Heading",
  component: "hds-heading",
  argTypes: {
    level: {
      control: "select",
      options: LEVELS,
      description: "Semantic heading level (h1-h6).",
      table: { defaultValue: { summary: "h1" } },
    },
    variant: {
      control: "select",
      options: VARIANTS,
      description: "Visual style variant of the heading.",
      table: { defaultValue: { summary: "default" } },
    },
    text: {
      control: "text",
      description: "Heading text content.",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "`hds-heading` provides semantic heading elements with consistent typography. Use the appropriate `level` for document structure and screen readers. Variants provide visual styling options while maintaining semantic meaning.",
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
    level: "h1",
    variant: "default",
    text: "Sample Heading",
  },
  render: heading,
};

/* ─────────────────────────────────────────────
 * Levels
 * ───────────────────────────────────────────── */
export const Levels = {
  parameters: {
    docs: {
      description: {
        story: "All heading levels (h1-h6) rendered with default styling. Use the appropriate semantic level for content hierarchy.",
      },
    },
  },
  render: () =>
    showcase(
      LEVELS.map(
        (level) => `<hds-heading level="${level}">Heading ${level.toUpperCase()}</hds-heading>`,
      ).join(""),
    ),
};

/* ─────────────────────────────────────────────
 * Variants
 * ───────────────────────────────────────────── */
export const Variants = {
  parameters: {
    docs: {
      description: {
        story: "Available visual variants for headings. Use sparingly to maintain visual hierarchy.",
      },
    },
  },
  render: () =>
    showcase(
      VARIANTS.map(
        (variant) => `<hds-heading level="h2" variant="${variant}">${variant.charAt(0).toUpperCase() + variant.slice(1)} Heading</hds-heading>`,
      ).join(""),
    ),
};

/* ─────────────────────────────────────────────
 * Semantic Hierarchy
 * ───────────────────────────────────────────── */
export const SemanticHierarchy = {
  name: "Semantic Hierarchy",
  parameters: {
    docs: {
      description: {
        story: "Example of proper semantic heading hierarchy in a document structure.",
      },
    },
  },
  render: () => `
    <div style="max-width: 800px; margin: 0 auto; padding: 2rem;">
      <hds-heading level="h1">Main Page Title</hds-heading>

      <p style="margin: 1rem 0 2rem; color: var(--hds-color-text-weak);">
        This is an introductory paragraph that provides context for the content below.
      </p>

      <hds-heading level="h2">Section One</hds-heading>
      <p style="margin: 1rem 0 1.5rem;">Content for the first section goes here.</p>

      <hds-heading level="h3">Subsection A</hds-heading>
      <p style="margin: 1rem 0 1.5rem;">Details about subsection A.</p>

      <hds-heading level="h3">Subsection B</hds-heading>
      <p style="margin: 1rem 0 1.5rem;">Details about subsection B.</p>

      <hds-heading level="h2">Section Two</hds-heading>
      <p style="margin: 1rem 0 1.5rem;">Content for the second section.</p>

      <hds-heading level="h3">Another Subsection</hds-heading>
      <p style="margin: 1rem 0 1.5rem;">More detailed content here.</p>
    </div>`,
};

/* ─────────────────────────────────────────────
 * With Variants in Context
 * ───────────────────────────────────────────── */
export const WithVariantsInContext = {
  name: "With Variants in Context",
  parameters: {
    docs: {
      description: {
        story: "Demonstration of how heading variants can be used to create visual emphasis while maintaining semantic structure.",
      },
    },
  },
  render: () => `
    <div style="max-width: 800px; margin: 0 auto; padding: 2rem;">
      <hds-heading level="h1">Dashboard Overview</hds-heading>

      <hds-heading level="h2">Key Metrics</hds-heading>
      <p style="margin: 1rem 0 1.5rem;">Important performance indicators.</p>

      <hds-heading level="h3" variant="success">✓ Growth Targets Met</hds-heading>
      <p style="margin: 1rem 0 1.5rem;">All quarterly growth objectives have been achieved.</p>

      <hds-heading level="h3" variant="warning">⚠ Attention Required</hds-heading>
      <p style="margin: 1rem 0 1.5rem;">Some metrics need immediate attention.</p>

      <hds-heading level="h3" variant="danger">✗ Critical Issues</hds-heading>
      <p style="margin: 1rem 0 1.5rem;">System alerts that require immediate action.</p>

      <hds-heading level="h2" variant="subtle">Additional Details</hds-heading>
      <p style="margin: 1rem 0 1.5rem;">Supplementary information and context.</p>
    </div>`,
};