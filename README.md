# Heaven Design System

Heaven is a design system written in plain HTML and CSS, documented in Storybook.

## Components

- Badge
- Button
- Checkbox input
- Radio input
- Text input
- Textarea input

Each component lives in its own folder under `src/components` with a template, constants, types, and stories.

## Foundations

Design tokens are documented under `src/docs/foundations`: colors, typography, spacing, radius, shadows, motion, and z-index.

## Running Storybook

Storybook runs on Bun.

```bash
bun install
bun storybook
```

Open http://localhost:6006 to browse the components.

To build a static version:

```bash
bun run build-storybook
```

The build outputs to `storybook-static/`.

## Deployment

Pushes to `main` build the storybook and deploy it to GitHub Pages. The workflow is in `.github/workflows/deploy-storybook.yml`.
