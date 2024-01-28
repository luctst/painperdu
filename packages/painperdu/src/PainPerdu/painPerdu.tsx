import { useEffect, useState } from 'react';
import type { ChangeEvent, FC, KeyboardEventHandler } from 'react'
import { createPortal } from 'react-dom';
import { PainPerduListItem } from '../PainPerduListItem/PainPerduListItem'
import type { PathItem } from '../types';
import { PainPerduSearchBar } from '../components/PainPerduSearchBar'
import { PainPerduFooter } from '../components/PainPerduFooter'
import '../index.css'

interface Props {
  pathItems: PathItem[]
  teleport: string
}

const DefaultResults = () => (
	<div className="pain-perdu-default-results flex-col mb-12 pt-8 pl-4 text-center">
		<p>Start writing to search routes</p>
	</div>
)

export const PainPerdu: FC<Props> = ({ pathItems, teleport }) => {
	const [isModalActive, setModal] = useState<boolean>(false)
	const [itemsList, setItemsList] = useState<PathItem[]>([])
	const [cursor, setCursor] = useState<number | null>(null)
	const [isActiveItem, setIsActiveItem] = useState<boolean>(false)
	const [currentItem, setCurrentItem] = useState({})

	const onArrowsPressed = (isArrowDown: boolean, event: Event): void => {
		if (!isModalActive || itemsList.length <= 0 || event?.target.value === '') return
		if (itemsList.length === 0) setCursor(null)
		if (cursor === null) return
		if (isArrowDown && (cursor !== null && cursor >= itemsList.length - 1)) {
			setCursor(+1)
			return
		}
		setCursor(-1)
	}

	const cursorUpdated = (index: number, isSelectedItem: boolean): void => {
		setIsActiveItem(isSelectedItem)
		setCursor(index)
		console.log("🚀 ~  BEFORE isSelectedItem:", index, isSelectedItem)
		console.log("🚀 ~  AFTER isSelectedItem:", index, isSelectedItem)

	}

	const openModal = (isMetaKey: boolean): void => {
		if (isModalActive || !isMetaKey) return
		setModal(true)
	}

	const closeModal = (): void => {
		if (!isModalActive) return
		setModal(false)
	}

	const commandsManager = (event: KeyboardEvent): void => {
		const keyPressed = event.code
		const isMetaKey: boolean = event.metaKey
		const commands = {
			KeyK: () => { openModal(isMetaKey) },
			Escape: () => { closeModal() },
			ArrowDown: () => {onArrowsPressed(true, event) },
			ArrowUp: () => { onArrowsPressed(false, event) },
		}

		if (!commands[keyPressed]) return
		commands[keyPressed]()
	};

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


	useEffect(() => {
		window.addEventListener('keydown', commandsManager)
		return () => {
			window.removeEventListener('keydown', commandsManager)
		}
	})

	useEffect(() => {
		if (cursor !== null) {
			// problème actuel : quand on hover un item, ça isSelected tous les items à true
			// problème à solved : comment réinitialiser le isSelected précédent à false

			const newItemList = [...itemsList] as PathItem[]
			console.log(newItemList[cursor])
			setCurrentItem(newItemList[cursor])
			console.log(newItemList[cursor])
			console.log("🚀 ~ useEffect ~ currentItem:", currentItem)

			if (currentItem.alias === newItemList[cursor].alias) {
				console.log('c good');
				(newItemList[cursor] as PathItem).isSelected = true
				setItemsList(newItemList)
				return
			}

			(newItemList[cursor] as PathItem).isSelected = false
			setItemsList(newItemList)
			setCurrentItem(newItemList[cursor])
		}
	}, [cursor])

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
								<main className="min-h-3 py-0 px-3 overflow-y-auto">
									<div className="text-sm	my-0 mx-auto">
										{
											itemsList.length > 0 ?
												<PainPerduListItem
													pathItem={itemsList}
													cursorUpdated={cursorUpdated}
												/> :
												<DefaultResults />
										}
									</div>
								</main>
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