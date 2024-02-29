import type { RouteObject } from 'react-router-dom';

export type RouteItems = RouteObject & {
  isSelected: boolean
  isChildren: boolean
  children: Array<object>
  path: string
}

export type commandsAvailables = 'KeyK' | 'Escape' | 'ArrowDown' | 'ArrowUp';

export type CommandHandler = Record<string, (args?: unknown) => void>;

export interface CustomLiRef {
  getElementHeight: () => number | undefined;
  getElementOffsetTop: () => number | undefined;
}
