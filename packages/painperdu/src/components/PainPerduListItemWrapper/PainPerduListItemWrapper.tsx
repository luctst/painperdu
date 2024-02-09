import type { FC } from 'react'
import { useEffect, useRef , useState } from 'react'
import { PainPerduListItem } from '../PainPerduListItem/PainPerduListItem'
import type { CommandHandler, PathItem, CustomLiRef } from '../../types'
import { useCommandManager } from '../../hooks/use-command-manager'

interface PainPerduListItemWrapperProps {
  items: PathItem[],
  eventDispatched: { eventType: string } | null
}

const DefaultResults = (): JSX.Element => (
	<div className="flex-col mb-12 pt-8 pl-4 text-center text-[#6c757d]">
		<p>Start writing to search routes</p>
	</div>
)

const PainPerduItemWrapper: FC<PainPerduListItemWrapperProps> = ({ items, eventDispatched }): JSX.Element => {
  const [cursor, setCursor] = useState<number>(-1)
  const [cursorOldState, setCursorOldState] = useState<number>(-1)
  const [routes, setRoutes] = useState<PathItem[]>([])
  const mainRef = useRef<HTMLElement>(null)
  const itemsRef = new Map();

  const handleScrollBar = (isArrowUp: 'up' | 'down'): void => {
    if (cursor <= 0) return

    const liActive = itemsRef?.get(cursor)

    if(mainRef?.current?.clientHeight === undefined) return
    const containerScrollableScrollPx = mainRef?.current?.clientHeight + mainRef?.current?.scrollTop

    if (isArrowUp === 'up') {
      if (liActive?.getElementOffsetTop() <= containerScrollableScrollPx) {
        mainRef.current?.scroll({
          top: mainRef.current.scrollTop - liActive.getElementHeight(),
        })
      }

      return
    }

    if (liActive?.getElementOffsetTop() >= containerScrollableScrollPx) {
      mainRef.current?.scroll({
        top: mainRef.current.scrollTop + liActive.getElementHeight(),
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
    if (commands) {
		  if (commands[eventDispatched.eventType]) {
		  if (typeof commands[eventDispatched.eventType] === 'function') {
				commands[eventDispatched.eventType]?.call(null);
						}
				}
		}
  }, [eventDispatched])

  useEffect(() => {
    setCursorOldState(-1);
    setCursor(-1);
    setRoutes([ ...items ])
  }, [items])

  if (items.length <= 0) return <DefaultResults />

  return (
    <main className="min-h-3 max-h-[488px] h-[60vh] py-0 px-3 overflow-y-auto" ref={mainRef}>
			<div className="text-sm	my-0 mx-auto">
  		 <div className="max-h-[500px]">
        <ul className="flex-col mb-12 pt-8 pl-4 text-[#6c757d]">
          {
            routes.map((route, index) =>
              <PainPerduListItem
                key={index}
                route={route}
                ref={(node: CustomLiRef): void => {
                  itemsRef?.set(index, node)
                }}
                cursorUpdated={() => { cursorUpdated(index) }}
              />
            )
          }
        </ul>
       </div>
			{/* </div> */}
		</main>
  )
}

export default PainPerduItemWrapper
