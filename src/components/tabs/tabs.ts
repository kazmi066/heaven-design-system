import { css } from "./tabs.template.js";
import { TABS_CHANGE_EVENT } from "./tabs.constants.js";
import type { TabsChangeDetail } from "./tabs.types.js";

const FOCUSABLE = [
  "a[href]",
  "button",
  "input",
  "select",
  "textarea",
  "summary",
  "[contenteditable]",
  '[tabindex]:not([tabindex="-1"])',
].join(", ");

// focusgroup gives the tablist arrow keys, Home, End, and a single Tab stop.
// Where it is missing, the element falls back to a roving tabindex.
const hasFocusgroup = Object.hasOwn(HTMLElement.prototype, "focusGroup");

let instances = 0;

export class HdsTabs extends HTMLElement {
  private readonly uid = `hds-tabs-${++instances}`;
  private readonly observer = new MutationObserver(() => this.sync());
  private revealed = false;

  connectedCallback(): void {
    if (!document.getElementById("hds-tabs-styles")) {
      document.head.insertAdjacentHTML("beforeend", css());
    }

    this.addEventListener("click", this.handleSelect);
    this.addEventListener("focusin", this.handleSelect);
    this.addEventListener("keydown", this.handleKeydown);
    this.addEventListener("beforematch", this.handleBeforematch);
    // Children may be parsed or replaced after the element connects.
    this.observer.observe(this, { childList: true, subtree: true });
    this.sync();
  }

  disconnectedCallback(): void {
    this.removeEventListener("click", this.handleSelect);
    this.removeEventListener("focusin", this.handleSelect);
    this.removeEventListener("keydown", this.handleKeydown);
    this.removeEventListener("beforematch", this.handleBeforematch);
    this.observer.disconnect();
  }

  get selectedIndex(): number {
    return this.tabs.indexOf(this.current as HTMLButtonElement);
  }

  set selectedIndex(index: number) {
    this.select(this.tabs[index]);
  }

  private get tablist(): HTMLElement | null {
    return this.querySelector(':scope > [role="tablist"]');
  }

  private get tabs(): HTMLButtonElement[] {
    return Array.from(
      this.tablist?.querySelectorAll<HTMLButtonElement>(":scope > button") ??
        [],
    );
  }

  private get panels(): HTMLElement[] {
    return Array.from(
      this.querySelectorAll<HTMLElement>(':scope > [role="tabpanel"]'),
    );
  }

  private get current(): HTMLButtonElement | undefined {
    const { tabs } = this;

    return (
      tabs.find((tab) => tab.ariaSelected === "true" && !tab.disabled) ??
      tabs.find((tab) => !tab.disabled)
    );
  }

  private sync(): void {
    const { tablist, tabs, panels } = this;

    if (!tablist) {
      return;
    }

    if (hasFocusgroup && !tablist.hasAttribute("focusgroup")) {
      tablist.setAttribute("focusgroup", "tablist nomemory");
    }

    tabs.forEach((tab, index) => {
      tab.type = "button";
      tab.role = "tab";
      tab.id ||= `${this.uid}-tab-${index + 1}`;
      panels[index]?.setAttribute("aria-labelledby", tab.id);
    });

    const { current } = this;
    this.render(current);

    if (current && !this.revealed) {
      this.revealed = true;
      this.reveal(current);
    }
  }

  // Scrolls only the tablist, never the page, so the selected tab sits clear
  // of the edge fades. Deltas are physical, so this works in RTL too.
  private reveal(tab: HTMLButtonElement): void {
    const { tablist } = this;

    if (!tablist) {
      return;
    }

    const list = tablist.getBoundingClientRect();
    const box = tab.getBoundingClientRect();
    const padding =
      parseFloat(getComputedStyle(tablist).scrollPaddingInlineStart) || 0;
    const start = list.left + padding;
    const end = list.right - padding;

    if (box.left < start) {
      tablist.scrollBy({ left: box.left - start });
    } else if (box.right > end) {
      tablist.scrollBy({ left: box.right - end });
    }
  }

  private render(selected: HTMLButtonElement | undefined): void {
    const { panels } = this;

    this.tabs.forEach((tab, index) => {
      const isSelected = tab === selected;
      const panel = panels[index];

      tab.ariaSelected = String(isSelected);

      if (hasFocusgroup) {
        tab.toggleAttribute("focusgroupstart", isSelected);
      } else {
        tab.tabIndex = isSelected ? 0 : -1;
      }

      if (!panel) {
        return;
      }

      if (isSelected) {
        panel.removeAttribute("hidden");
      } else if (panel.getAttribute("hidden") !== "until-found") {
        panel.setAttribute("hidden", "until-found");
      }

      // A panel with nothing focusable inside takes a Tab stop itself, so
      // keyboard users can reach and scroll its content.
      if (isSelected && !panel.querySelector(FOCUSABLE)) {
        panel.tabIndex = 0;
      } else {
        panel.removeAttribute("tabindex");
      }
    });
  }

  private select(tab: HTMLButtonElement | undefined): void {
    if (!tab || tab.disabled || tab === this.current) {
      return;
    }

    this.render(tab);
    this.reveal(tab);

    const index = this.tabs.indexOf(tab);

    this.dispatchEvent(
      new CustomEvent<TabsChangeDetail>(TABS_CHANGE_EVENT, {
        bubbles: true,
        detail: { index, tab, panel: this.panels[index] ?? null },
      }),
    );
  }

  private ownTab(target: EventTarget | null): HTMLButtonElement | undefined {
    return this.tabs.find((tab) => tab === target);
  }

  // Selection follows focus, and a click covers browsers that do not focus
  // buttons on click.
  private readonly handleSelect = (event: Event): void => {
    const target = event.target instanceof Element ? event.target : null;
    this.select(this.ownTab(target?.closest("button") ?? null));
  };

  private readonly handleKeydown = (event: KeyboardEvent): void => {
    const tab = this.ownTab(event.target);

    if (hasFocusgroup || !tab) {
      return;
    }

    const enabled = this.tabs.filter((item) => !item.disabled);
    const index = enabled.indexOf(tab);
    const step = this.tablist?.matches(":dir(rtl)") ? -1 : 1;
    const targets: Record<string, number> = {
      ArrowRight: index + step,
      ArrowLeft: index - step,
      Home: 0,
      End: enabled.length - 1,
    };
    const next = targets[event.key];

    if (next === undefined) {
      return;
    }

    event.preventDefault();
    enabled.at(next % enabled.length)?.focus();
  };

  private readonly handleBeforematch = (event: Event): void => {
    const index = this.panels.indexOf(event.target as HTMLElement);

    if (index !== -1) {
      this.select(this.tabs[index]);
    }
  };
}

if (!customElements.get("hds-tabs")) {
  customElements.define("hds-tabs", HdsTabs);
}

declare global {
  interface HTMLElementTagNameMap {
    "hds-tabs": HdsTabs;
  }

  interface HTMLElementEventMap {
    "hds-tabs-change": CustomEvent<TabsChangeDetail>;
  }
}
