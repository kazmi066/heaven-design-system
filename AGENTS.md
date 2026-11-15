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

## Formatting

Prettier formats every file. A pre-commit hook runs it on staged files; run `bun run format` to format everything.
