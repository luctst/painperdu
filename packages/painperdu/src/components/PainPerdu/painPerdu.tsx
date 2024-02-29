import type { CommandHandler } from '@/types'
import type { RouteObject } from 'react-router-dom';
import type { FC } from 'react'
import { Suspense, useEffect, useState, lazy,useCallback } from 'react'
import { createPortal } from 'react-dom'
import { useCommandManager } from '../../hooks/use-command-manager'
import '../../index'
import { PainPerduSkeleton } from '../PainPerduSkeleton/PainPerduSkeleton'

const PainPerduSearchBar = lazy(() => import('../PainPerduSearchBar/PainPerduSearchBar'));
const PainPerduListItemWrapper = lazy(() => import('../PainPerduListItemWrapper/PainPerduListItemWrapper'));
const PainPerduFooter = lazy(() => import('../PainPerduFooter/PainPerduFooter'));

interface EventDispatched {
  eventType: string;
};

interface Props {
  pathItems: RouteObject[];
  teleport: string;
}

interface PathsMatched  {
  path: string | undefined
  isSelected: boolean
  isChildren?: boolean
}


export const PainPerdu: FC<Props> = ({ pathItems, teleport }) => {
  const [isModalActive, setModalActive] = useState<boolean>(false);
  const [itemsList, setItemsList] = useState<RouteObject[]>([]);
  const [eventToDispatch, setEventToDispatch] =
    useState<EventDispatched | null>(null);

  const openModal = (isMetaKey: boolean): void => {
    if (isModalActive || !isMetaKey) return;
    setModalActive(true);
  };

  const closeModal = (): void => {
    if (!isModalActive) return;
    setModalActive(false);
  };

  const shouldActiveModal = (isModal: boolean): void => {
    setModalActive(isModal);
  };

	const commandsManager = (event: KeyboardEvent): void => {
 		const eventKey = navigator.userAgent.replace(/\s/g, "").toUpperCase().includes('MACOSX') ? event.metaKey : event.ctrlKey
		const commands: CommandHandler = {
			KeyK: () => { openModal(eventKey) },
			Escape: closeModal,
		}
	  const { shouldCallFn } = useCommandManager(event.code, commands)

		if (!shouldCallFn) {
		  setEventToDispatch({
				eventType: event.code
			})
			return
		}

		if (commands) {
		  if (commands[event.code]) {
        if (typeof commands[event.code] === 'function') {
				  commands[event.code]?.call(null)
				}
			}
		}
	}

  const childrenPathsformatted = (value: string) => {
    const pathsMatched: PathsMatched[] = []

    pathItems.forEach(pathItem => {
      if (pathItem.path?.includes(value)) {
        pathsMatched.push({
          path: pathItem.path,
          isSelected: false,
        })

        if (pathItem?.children?.length == undefined) return

        if (pathItem?.children?.length > 0) {
          pathItem.children.forEach(child => {
            pathsMatched.push({
              path: child.path,
              isSelected: false,
              isChildren: true
            })
          })
        }
        return
      }

      if (pathItem.children === undefined) return
      if (pathItem.children.length <= 0) return

      let parentHasBeenCreated = false

      pathItem.children.forEach(child => {
        if (!(child.path?.includes(value))) return
        if (!parentHasBeenCreated) {
          pathsMatched.push({
            path: pathItem.path,
            isSelected: false,
          })
          parentHasBeenCreated = true
        }

        pathsMatched.push({
          path: child.path,
          isSelected: false,
          isChildren: true
        })
      })

      return
    })

    return pathsMatched
  }

  const displayPathItems = useCallback((value: string): void => {
    if (value === "") {
      setItemsList([]);
      return;
    }
    setItemsList(childrenPathsformatted(value))
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", commandsManager);
    return () => {
      window.removeEventListener("keydown", commandsManager);
    };
  });

  if (!isModalActive) return null;

  return createPortal(
    <>
      <div
        className={`
				fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden
				outline-none focus:outline-none ${isModalActive ? "bg-slate-500 opacity-80" : ""}`}
        onClick={() => {
          shouldActiveModal(false);
        }}
      ></div>
      <div className="relative inset-0 z-50 mx-auto my-0 mt-40 flex w-7/12 items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
        <div className="m-w-[560px] relative flex w-full flex-col rounded-xl border-0 bg-white bg-opacity-60 shadow-lg outline-none focus:outline-none">
          <div className="bg-white bg-opacity-60 px-0 pt-1">
            <div>
              <div>
                <Suspense fallback={<PainPerduSkeleton />}>
                  <PainPerduSearchBar displayPathItems={displayPathItems} />
                  <PainPerduListItemWrapper
                    items={itemsList}
                    eventDispatched={eventToDispatch}
                  />
                  <PainPerduFooter />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.querySelector(teleport)!,
  );
};
