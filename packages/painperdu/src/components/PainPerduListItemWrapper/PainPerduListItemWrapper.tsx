import type { FC } from 'react'
import React, { useEffect, useMemo, useRef , useState } from 'react'
import { PainPerduListItem } from '../PainPerduListItem/PainPerduListItem'
import type { CommandHandler, CustomLiRef, RouteItems } from '../../types'
import { useCommandManager } from '../../hooks/use-command-manager'

interface PainPerduListItemWrapperProps {
  items: RouteItems[],
  eventDispatched: { eventType: string } | null;
  setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  isEditMode: boolean;
}

const DefaultResults = (): JSX.Element => (
	<div className="flex-col mb-12 pt-8 pl-4 text-center text-[#6c757d]">
		<p>Start writing to search routes</p>
	</div>
)

const PainPerduItemWrapper: FC<PainPerduListItemWrapperProps> = ({ items, eventDispatched, setIsEditMode, isEditMode }): JSX.Element => {
  const [cursor, setCursor] = useState<number>(-1)
  const [cursorOldState, setCursorOldState] = useState<number>(-1)
  const [routes, setRoutes] = useState<RouteItems[]>([])
  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({});
  const mainRef = useRef<HTMLElement>(null)
  const itemsRef = useRef(new Map());

  const handleScrollBar = (isArrowUp: 'up' | 'down'): void => {
    if (cursor <= 0) return

    const liActive = itemsRef?.current.get(cursor)

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

  const onEnter = () => {
    if (cursor < 0) return;
    if (routes[cursor]?.isEditable === false) return;
      if (isEditMode) {
        const isValid = Object.keys(inputValues).every((key) => {
          console.log(key, inputValues);
          if (inputValues[key] === null) return false;
          if (inputValues[key].length === 0) return false;
          return true;
        })

        if (!isValid) return false;
        // return window.location.href = `${window.location.origin}/${routes[cursor].parentPath}${}`;
      }

      setIsEditMode(true);
  };

  const onChangeInputValues = (route: string, value: string) => {
    setInputValues({
      ...inputValues,
      [route]: value,
    })
  }

  const routesParsedFromDynamicPath = useMemo(() => {
    if (routes === undefined) return [];
    if (isEditMode === false) return [];
    if (cursor < 0) return [];

    return routes[cursor]?.path.split('/');
  }, [isEditMode, cursor])

  useEffect(() => {
    if (routesParsedFromDynamicPath?.length !== 0) {
      routesParsedFromDynamicPath?.forEach((route) => {
        if (route.includes(':') === false) return;

        setInputValues({
          [route]: null,
        });
      })
    }
  }, [routesParsedFromDynamicPath])

  useEffect(() => {
    if (isEditMode === false) {
      setInputValues({});
    }
  }, [isEditMode])

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
      Enter: onEnter,
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
    setRoutes(items)
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
                itemsRef?.current.set(index, node)
              }}
              cursorUpdated={() => { cursorUpdated(index) }}
              routesParsed={isEditMode && (cursor === index) ? routesParsedFromDynamicPath : []}
              onChange={onChangeInputValues}
              onClick={onEnter}
            />
            )
          }
        </ul>
       </div>
			</div>
		</main>
  )
}

export default PainPerduItemWrapper
