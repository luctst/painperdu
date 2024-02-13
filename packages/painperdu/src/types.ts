export type PathItem = {
	alias: string
	path: string
	isSelected: boolean
}

export type commandsAvailables = 'KeyK' | 'Escape' | 'ArrowDown' | 'ArrowUp';

export type CommandHandler = {
  [key in commandsAvailables]?: (args?: unknown) => void;
}
