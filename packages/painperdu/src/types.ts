export interface PathItem {
	alias: string
	path: string
	isSelected: boolean
}

export type commandsAvailables = 'KeyK' | 'Escape' | 'ArrowDown' | 'ArrowUp';

export type CommandHandler = Record<string, (args?: unknown) => void>;

export interface CustomLiRef {
  getElementHeight: () => number | undefined;
  getElementOffsetTop: () => number | undefined;
}
