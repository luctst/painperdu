import type { FC } from 'react'
import { createRef, useEffect, useRef ,useState } from 'react'
import { PainPerduListItem } from '../PainPerduListItem/PainPerduListItem'
import type { CommandHandler, PathItem } from '../../types'
import { useCommandManager } from '../../hooks/use-command-manager'

interface PainPerduListItemWrapperProps {
  items: PathItem[],
  eventDispatched: { eventType: string } | null
}

const DefaultResults = (): JSX.Element => (
	<div className="pain-perdu-default-results flex-col mb-12 pt-8 pl-4 text-center">
		<p>Start writing to search routes</p>
	</div>
)

export const PainPerduItemWrapper: FC<PainPerduListItemWrapperProps> = ({ items, eventDispatched }): JSX.Element => {
  const mainRef = useRef<HTMLElement | null>(null)
  const itemRef = createRef<HTMLAnchorElement>()
  const [cursor, setCursor] = useState<number>(-1)
  const [cursorOldState, setCursorOldState] = useState<number>(-1)
  const [routes, setRoutes] = useState<PathItem[]>([])

  const handleScrollBar = (arrowPosition: string): void => {
    const containerScrollable = mainRef.current
    if (containerScrollable === null) return

    const itemSelected = itemRef.current?.parentElement
    const containerScrollableScrollPx =
    containerScrollable.clientHeight + containerScrollable.scrollTop

    if (arrowPosition === "down") {
      if ((itemSelected as HTMLElement)?.offsetTop >= containerScrollableScrollPx) {
        containerScrollable?.scroll({
          top: containerScrollable.scrollTop + ((itemSelected as HTMLElement)?.clientHeight - 10),
          behavior: 'smooth'
        })
      }
    }

    if (arrowPosition === "up") {
      containerScrollable?.scroll({
        top: containerScrollable.scrollTop - ((itemSelected as HTMLElement)?.clientHeight - 10),
        behavior: 'smooth'
      })
    }
  }

  const onArrowUp = (): void => {
    if (cursor <= 0) return
    setCursorOldState(cursor)
    setCursor(cursor - 1)
    handleScrollBar('up')
  }

  const onArrowDown = (): void => {
    if (cursor === routes.length) return
    setCursorOldState(cursor)
    setCursor(cursor + 1)
    handleScrollBar('down')
  }

  const cursorUpdated = (itemIndex: number): void => {
    setCursorOldState(cursor)
    setCursor(itemIndex)
	}

  useEffect(() => {
    if (cursor < 0) return
    if (cursor === routes.length) return

    const newRoutes = [ ...routes ]

    if (cursorOldState >= 0) {
      if (newRoutes[cursorOldState] === undefined) return
      (newRoutes as any)[cursorOldState].isSelected = false
    }
    (newRoutes as any)[cursor].isSelected = true

    setRoutes(newRoutes)
	}, [cursor])

  useEffect(() => {
    if (routes.length <= 0) return
    if (eventDispatched === null) return

    const commands: CommandHandler = {
      ArrowDown: onArrowDown,
      ArrowUp: onArrowUp,
    }

    const { shouldCallFn } = useCommandManager(eventDispatched.eventType, commands)

    if (!shouldCallFn) return
    (commands as any)[eventDispatched.eventType].call()
  }, [eventDispatched])

  useEffect(() => { setRoutes([ ...items ]) }, [items])

  if (items.length <= 0) return <DefaultResults />

  return (
    <main ref={mainRef} className="min-h-3 py-0 px-3 mb-3 overflow-y-auto">
      <div className="text-sm	my-0 mx-auto h-3/5">
      <ul className="flex-col mb-12 pt-8 pl-4 overflow-y-auto">
        {
          routes.map((route, index) =>
            <PainPerduListItem
              key={index}
              route={route}
              itemIndex={index}
              itemRef={itemRef}
              cursorUpdated={cursorUpdated}
            />
          )
        }
      </ul>
      </div>
		</main>
  );
}
