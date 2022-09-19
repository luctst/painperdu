export interface FinalConfig {
  shortCutLaunchName: string;
  mainContainer: HTMLElement;
  mainContainerId: string;
  originURL: string;
  itemSelected: number;
}

export interface Config {
  shortCutLaunchName?: string;
}

export interface HtmlElementAttribues {
  name: string;
  value: string;
}

export interface Route {
  path: string;
  label: string;
  alias?: string[];
}

export type Nullable<T> = T | null;
