export interface AccordionStoryItem {
  heading: string;
  content: string;
  open?: boolean;
}

export interface AccordionStoryArgs {
  exclusive?: boolean;
  items?: AccordionStoryItem[];
}
