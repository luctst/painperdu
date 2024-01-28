import { useEffect, useState } from 'react';
import type { ChangeEvent, FC } from 'react'
import { createPortal } from 'react-dom';
import type { CommandHandler, PathItem } from '@/types';
import { PainPerduSearchBar } from '../PainPerduSearchBar/PainPerduSearchBar';
import { PainPerduFooter } from '../PainPerduFooter/PainPerduFooter';
import '../../index'
import { PainPerduItemWrapper } from '../PainPerduListItemWrapper/PainPerduListItemWrapper';
import { useCommandManager } from '../../hooks/use-command-manager';

interface Props {
  pathItems: PathItem[]
  teleport: string
}

export const PainPerdu: FC<Props> = ({ pathItems, teleport }) => {
	const [isModalActive, setModal] = useState<boolean>(false)
	const [itemsList, setItemsList] = useState<PathItem[]>([])
	const [eventToDispatch, setEventToDispatch] = useState<null | string>(null);

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

	const displayPathItems = (event: ChangeEvent<HTMLInputElement>): void => {
		if ((event.target as HTMLInputElement).value === '') {
			setItemsList([])
			return
		}
		setItemsList(pathItems.filter((pathItem: PathItem) => pathItem.alias.includes((event.target as HTMLInputElement).value)))
	}

	const commandsManager = (event: KeyboardEvent): void => {
	   const commands: CommandHandler = {
				KeyK: () => { openModal(event.metaKey) },
  		  Escape: closeModal,
		 }

	   const { shouldCallFn } = useCommandManager(event.code, commands);

		if (!shouldCallFn) {
		  setEventToDispatch(event.code);
			return;
		};

		commands[event.code].call(null);
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
				<div className="border-0 rounded-xl shadow-lg relative flex flex-col bg-white outline-none focus:outline-none w-full">
					<div className="bg-white px-0 pt-1">
						<div>
							<div>
								<PainPerduSearchBar displayPathItems={displayPathItems} />
								<PainPerduItemWrapper items={itemsList} eventDispatched={eventToDispatch}/>
								<PainPerduFooter />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>,
		document.querySelector(teleport) as HTMLElement
 )
};
