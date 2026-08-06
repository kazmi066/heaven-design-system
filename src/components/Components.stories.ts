import type { Meta, StoryObj } from "@storybook/html";

const meta = {
  title: "Components/Overview",
  parameters: {
    layout: "fullscreen",
    options: { showPanel: false },
    docs: { disable: true },
  },
  tags: ["!autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Overview: Story = {
  render: () => `
    <main class="sb-page">
      <h1>Components</h1>
      <p>
        Every HDS component is a Web Component prefixed with <code>hds-</code>.
        Components consume design tokens from <strong>Foundations</strong>,
        never hard-coded values, so theming happens in one place.
      </p>

      <h2>Story conventions</h2>
      <div class="sb-list">
        <div class="sb-list-row">
          <code>Playground</code>
          <span>Interactive controls for every prop. Always the first story.</span>
        </div>
        <div class="sb-list-row">
          <code>Variants</code>
          <span>Every visual variant rendered side-by-side.</span>
        </div>
        <div class="sb-list-row">
          <code>Sizes</code>
          <span>Each size applied to the same variant for comparison.</span>
        </div>
        <div class="sb-list-row">
          <code>States</code>
          <span>Default, hover, focus, disabled, loading, where applicable.</span>
        </div>
        <div class="sb-list-row">
          <code>With Icon / Composition</code>
          <span>Slot-based composition examples.</span>
        </div>
      </div>
    </main>
  `,
};
