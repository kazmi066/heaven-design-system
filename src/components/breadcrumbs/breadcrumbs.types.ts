export interface BreadcrumbsState {
  label: string;
}

export type BreadcrumbsTemplateArgs = Partial<BreadcrumbsState>;

export interface BreadcrumbsStoryArgs extends BreadcrumbsTemplateArgs {
  currentAsLink?: boolean;
}
