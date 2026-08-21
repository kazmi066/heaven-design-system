# web-components
- In template files, define separate `css()` and `html(args)` functions that return strings, and have `render(args)` return `${css()} ${html(args)}`. Confidence: 0.75
- Rely on native browser input behavior (keyboard, accessibility) rather than reimplementing it; don't rewrite native logic unless there is a good reason. Confidence: 0.70
- Avoid the `part` attribute on custom elements; remove it. Confidence: 0.70
- Prefer rendering the shadow DOM in the constructor instead of lazily in connectedCallback. Confidence: 0.65
- Avoid `escapeHTML` helpers; direct string interpolation is fine. Confidence: 0.65
- Minimize `??` nullish-coalescing operators in code. Confidence: 0.60
- Design-system components should be generic and minimal, without baked-in domain-specific logic (e.g., don't add number-formatting logic to a badge); let consumers supply the content. Confidence: 0.70
- Express component variants as color changes (e.g., a `negative` color), not as formatting or border-behavior changes. Confidence: 0.65
