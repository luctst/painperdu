import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { PainPerduListItem } from '../PainPerduListItem/PainPerduListItem';
import type { CommandHandler, PathItem } from '../../types';
import { useCommandManager } from '../../hooks/use-command-manager';

interface PainPerduListItemWrapperProps {
  items: PathItem[],
  eventDispatched: string | null
}

const DefaultResults = (): JSX.Element => (
	<div className="pain-perdu-default-results flex-col mb-12 pt-8 pl-4 text-center">
		<p>Start writing to search routes</p>
	</div>
)

export const PainPerduItemWrapper: FC<PainPerduListItemWrapperProps> = ({ items, eventDispatched }): JSX.Element => {
  const [cursor, setCursor] = useState<number>(-1);
  const [cursorOldState, setCursorOldState] = useState<number>(-1);
  const [routes, setRoutes] = useState<PathItem[]>([]);

  const onArrowUp = (): void => {
    if (cursor <= 0) return;

    setCursorOldState(cursor);
    setCursor(cursor - 1);
  }

  const onArrowDown = (): void => {
    if (cursor === routes.length) return;

    setCursorOldState(cursor);
    setCursor(cursor + 1);
  }

  useEffect(() => {
    if (cursor < 0) return;

    const newRoutes = [ ...routes ];

    if (cursorOldState > 0) {
      newRoutes[cursorOldState].isSelected = false;
    }
    newRoutes[cursor].isSelected = true;

    setRoutes(newRoutes);
	}, [cursor])

  useEffect(() => {
    if (routes.length <= 0) return;
    if (eventDispatched === null) return;

    const commands: CommandHandler = {
      ArrowDown: onArrowDown,
      ArrowUp: onArrowUp,
    };

    const { shouldCallFn } = useCommandManager(eventDispatched, commands);

    if (!shouldCallFn) return;
    commands[eventDispatched].call();
  }, [eventDispatched])

  useEffect(() => setRoutes([ ...items ]), [items]);

  if (items.length <= 0) return <DefaultResults />

  return (
    <main className="min-h-3 py-0 px-3 overflow-y-auto">
			<div className="text-sm	my-0 mx-auto">
  		 <div className="painperdu--modal--body--container">
        <ul className="flex-col mb-12 pt-8 pl-4">
          {
            routes.map((route, index) => <PainPerduListItem key={index} route={route}/>)
          }
        </ul>
       </div>
			</div>
		</main>
  );
}
