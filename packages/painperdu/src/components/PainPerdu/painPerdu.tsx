import type { CommandHandler, PathItem } from '@/types'
import type { FC } from 'react'
import { Suspense, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useCommandManager } from '../../hooks/use-command-manager'
import '../../index'
import PainPerduFooter from '../PainPerduFooter/PainPerduFooter'
import PainPerduListItemWrapper from '../PainPerduListItemWrapper/PainPerduListItemWrapper'
import PainPerduSearchBar from '../PainPerduSearchBar/PainPerduSearchBar'
import { PainPerduSkeleton } from '../PainPerduSkeleton/PainPerduSkeleton'

type EventDispatched = {
	eventType: string
}

interface Props {
  pathItems: PathItem[]
  teleport: string
}

export const PainPerdu: FC<Props> = ({ pathItems, teleport }) => {
	const [isModalActive, setModal] = useState<boolean>(false)
	const [itemsList, setItemsList] = useState<PathItem[]>([])
	const [eventToDispatch, setEventToDispatch] = useState<EventDispatched | null>(null)

	const openModal = (isMetaKey: boolean): void => {
		if (isModalActive || !isMetaKey) return
		setModal(true)
	}

	const closeModal = (): void => {
		if (!isModalActive) return
		setModal(false)
	}

	const shouldActiveModal = (isModal: boolean): void => {
		setModal(isModal)
	}

	const displayPathItems = (value: string): void => {
		if (value === '') {
			setItemsList([])
			return
		}
		setItemsList(pathItems.filter((pathItem: PathItem) => pathItem.alias.includes(value)))
	}

	const commandsManager = (event: KeyboardEvent): void => {
	   const commands: CommandHandler = {
				KeyK: () => { openModal(event.metaKey) },
  		  Escape: closeModal,
		 }

	   const { shouldCallFn } = useCommandManager(event.code, commands);

		if (!shouldCallFn) {
		  setEventToDispatch({
				eventType: event.code
			})
			return;
		};

		if (commands) {
		  if (commands[event.code]) {
				  if (typeof commands[event.code] === 'function') {
				      commands[event.code]?.call(null);
						}
				}
		}
	};

	useEffect(() => {
		window.addEventListener('keydown', commandsManager)
		return () => {
			window.removeEventListener('keydown', commandsManager)
		}
	})

 if (!isModalActive) return (null)

 return createPortal(
	<>
		<div
			className={`
				flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50
				outline-none focus:outline-none ${isModalActive ? 'bg-slate-500 opacity-80' : ''}`
			}
			onClick={() => { shouldActiveModal(false) }}
		></div>
		<div className="flex justify-center items-center my-0 mx-auto mt-40 overflow-x-hidden overflow-y-auto relative inset-0 z-50 outline-none focus:outline-none w-7/12">
			<div className="m-w-[560px] border-0 rounded-xl shadow-lg relative flex flex-col bg-white bg-opacity-60 outline-none focus:outline-none w-full">
				<div className="bg-white bg-opacity-60 px-0 pt-1">
					<div>
						<div>
							<Suspense fallback={<PainPerduSkeleton />}>
								<PainPerduSearchBar displayPathItems={displayPathItems} />
								<PainPerduListItemWrapper items={itemsList} eventDispatched={eventToDispatch}/>
								<PainPerduFooter />
							</Suspense>
						</div>
					</div>
				</div>
			</div>
		</div>
	</>,
	document.querySelector(teleport)!
 )
}
