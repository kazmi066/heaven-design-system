export interface AccordionState {
  exclusive: boolean;
}

export type AccordionTemplateArgs = Partial<AccordionState>;

export interface AccordionStoryItem {
  heading: string;
  content: string;
  open?: boolean;
}

export interface AccordionStoryArgs extends AccordionTemplateArgs {
  items?: AccordionStoryItem[];
}
