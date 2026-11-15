# AGENTS.md

## Web platform guidance

This project uses [Modern Web Guidance](https://developer.chrome.com/docs/modern-web-guidance). The skill lives in `.agents/skills/modern-web-guidance` (symlinked into `.claude/skills`). Search it before writing or changing any HTML, CSS, or client-side JavaScript:

```sh
npx -y modern-web-guidance@latest search "<query>"
npx -y modern-web-guidance@latest retrieve "<id>"
```

Update the skill with `npx -y modern-web-guidance@latest update`.

**Browser support:** This project's Baseline target is Baseline 2025. Newer features are fine as progressive enhancement when the component still works without them.

## Components

- Reach for native HTML and CSS first. Add JavaScript only for what the platform cannot do: reflecting attributes onto a wrapped native control, wiring ARIA ids, or state CSS cannot see.
- Style variants, sizes, and states from the host attribute (`:host([variant="danger"])`), not by copying the attribute onto an inner element with script.
- Let the native control own its value. Do not mirror it in a field with `input` or `change` listeners.

## Design direction

The goal is a design system that public-sector sites can adopt without accessibility complaints and that still looks good. Build and restyle every component against this section.

### Look

- Simple, minimal, and rounded, in the spirit of [HyperUI](https://www.hyperui.dev/). Take the feel, not the markup.
- Buttons, badges, and chips are pills (`--hds-radius-full`). Fields, cards, and panels use `--hds-radius-lg` or `--hds-radius-xl`.
- Solid fills for primary actions, soft tints for status, hairline borders, and `--hds-shadow-sm` at rest. No gradients or heavy shadows.
- Labels are `--hds-font-weight-semibold` on actions and `--hds-font-weight-medium` elsewhere.

### Motion

- Every interactive element transitions between states. Use `--hds-duration-normal` with `--hds-ease-out`.
- Hover, press, and focus each change a different property so combined states stay readable. The button darkens and lifts on hover, shrinks on press, and outlines on focus.
- Animate `translate`, `scale`, `rotate`, `opacity`, and colors. Do not animate layout properties.
- Gate movement behind `prefers-reduced-motion: no-preference` and hover effects behind `hover: hover`.

### Accessibility, the non-negotiables

- WCAG 2.2 AA at minimum. Text contrast is 4.5:1, and control boundaries and focus rings are 3:1.
- Use the `-strong` tokens for solid fills and the `-soft` tokens with their `text-on-*-soft` pair for tints. The plain semantic colors (`--hds-color-success` and friends) fail contrast under white text, so do not put text on them.
- Every focusable element shows `outline: 2px solid var(--hds-color-focus)` with an offset on `:focus-visible`. Never remove an outline without that replacement.
- Default-size controls are at least 44px tall. The smallest size is at least 24px.
- Field borders use `--hds-color-border-control`. Errors use `--hds-color-text-danger` plus an icon, never color alone.
- Mark required fields in the label with CSS (`content: " *" / ""`) and keep the `required` attribute on the control.
- Keep a real border, even a transparent one, so the shape survives `forced-colors`. Check each component in forced colors, dark theme, RTL, and at 200% zoom.
- Use native elements and their semantics before ARIA. Add ARIA only for what HTML cannot express.

### CSS

- CSS first. Reach for script only when HTML and CSS cannot do it.
- The project uses plain CSS with design tokens, not Tailwind. Name classes with BEM (`hds-button`, `hds-button__spinner`).
- Set variant, size, and state on the host as private custom properties (`--_bg`, `--_fg`) and read them in one base rule, as the button does.
- Size with logical properties (`min-block-size`, `padding-inline`) so components work in RTL and vertical writing modes.

### Revamp status

All ten components follow this direction. Use `hds-button` and the other components inside stories and demos instead of raw elements, so the look stays consistent.

## Formatting

Prettier formats every file. A pre-commit hook runs it on staged files; run `bun run format` to format everything.
