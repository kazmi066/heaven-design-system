import { addons } from "storybook/manager-api";
import theme from "./theme.js";

addons.setConfig({
  theme,
  sidebar: {
    showRoots: true,
  },
  toolbar: {
    title: { hidden: false },
    zoom: { hidden: false },
    eject: { hidden: true },
    copy: { hidden: false },
    fullscreen: { hidden: false },
  },
});
