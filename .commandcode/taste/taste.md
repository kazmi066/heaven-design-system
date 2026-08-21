# Taste (Continuously Learned by [CommandCode][cmd])

[cmd]: https://commandcode.ai/

# typescript
- Use TypeScript with proper typing for all component files. Confidence: 0.70
- Follow a per-component folder pattern: `[name].ts`, `[name].template.ts`, `[name].constants.ts`, `[name].types.ts`, `[name].stories.ts`, with constants inside each component folder. Confidence: 0.75
- Add a `[name].types.ts` file in each component folder holding the component's TypeScript types. Confidence: 0.70

# web-components
See [web-components/taste.md](web-components/taste.md)
# css
- Implement button loading spinners with CSS Grid stacking (`grid-template-areas: "stack"`) toggling `visibility` between a text span and a loader span, avoiding layout shift; do not use absolute positioning or opacity for the loading state. Confidence: 0.75

# theming
- Implement dark mode by overriding semantic `--hds-color-*` tokens under a `[data-theme="dark"]` selector; do not create component-specific dark styles or tokens like `--button-dark-background`. Confidence: 0.70

# accessibility
- Validation error message element should be part of the component, hidden via `display:none` when empty (no reserved space), and connected with unique per-instance IDs, `aria-describedby`, `aria-invalid`, and a live `role="alert"`. Confidence: 0.70
