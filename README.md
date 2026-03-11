# Fixing "Failed to fetch dynamically imported module" in Storybook + Vite

This error usually happens when Vite cannot properly load a story file in Storybook v10 with HTML templates.

---

## 1. Check Your Storybook Stories Path

Open `.storybook/main.js` and make sure the stories path is simple:

```js
/** @type { import('@storybook/html-vite').StorybookConfig } */
const config = {
  stories: ["../src/**/*.stories.js"],

  addons: ["@storybook/addon-links", "@storybook/addon-a11y"],

  framework: {
    name: "@storybook/html-vite",
    options: {},
  },
};

export default config;
```

## 2. Ensure File Extensions Are Explicit

Because "type": "module" is in your package.json, Node ESM requires file extensions.

Correct:

import { HdsButton } from './button.html.js'

Incorrect:

```js
import { HdsButton } from "./button.html";
```

## 3. Verify Story File Structure

src/components/button/button.stories.js should be like:

import { HdsButton } from './button.html.js'
import './button.css'

export default {
title: 'Components/Button'
}

export const Primary = {
args: {
label: 'Primary Button',
style: 'primary'
},

render: (args) => HdsButton(args)
}

Important:

- Must have `export default`
- Must have at least one named export
- `render` should return HTML string

## 4. Verify Template File

src/components/button/button.html.js:

```js
export const HdsButton = (args = {}) => /*html*/ `
<button
  class="hds-button"
  ${args.style ? `data-style="${args.style}"` : ""}
>
  ${args.label || "Button"}
</button>
`;
```

## 5. Clear Vite Cache

Stop Storybook and run:

```bash
rm -rf node_modules/.vite
bun install
bun storybook
```

## 6. Debug with a Simple Story

Temporarily simplify a story to confirm loading works:

```js
export const Test = {
  render: () => `<button>Test</button>`,
};
```

If this works, the problem is in your template import.

## 7. Optional: Add Empty Root Module

Create src/index.js:

```js
export {};
```

Some Vite setups require a root module.

## 8. Browser Console

If errors persist, check the browser dev console for:

- `Failed to resolve import ...`

This will show the exact file causing the issue.

✅ Following these steps should resolve the "Failed to fetch dynamically imported module" error.

---

I can also make a **full ready-to-copy `.storybook` + `button` folder structure in JS** that works out of the box with Storybook v10 + Bun + HTML templates, so you can just run it.

Do you want me to do that next?
