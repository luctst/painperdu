import { Fragment, useEffect, useState } from 'react';
import type { FC } from 'react'
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
	<div className="painperdu--modal--body--nosearch is--block">
		<p>Start writing to search routes</p>
	</div>
)

export const PainPerdu: FC<Props> = ({ pathItems, teleport }) => {
	const [isModalActive, setModal] = useState<boolean>(false)
	const [itemsList, setItemsList] = useState<PathItem[]>([])

	const closeModal = (): void => {
		setModal(false)
		setItemsList([])
	}

	const handleEsc = (event: KeyboardEvent): void => {
		const keyPressed = event.code
		const isMetaKey: boolean = event.metaKey
		const commands = {
			openModal: 'KeyK',
			closeModal: 'Escape',
		}

		if (((keyPressed !== commands.openModal) && isMetaKey) || ((keyPressed !== commands.closeModal) && isModalActive)) return
		if ((keyPressed === commands.openModal) && isMetaKey) setModal(true)
		if ((keyPressed === commands.closeModal) && isModalActive) setModal(false)
	};

	const shouldActiveModal = (isModal: boolean): void => {
		setModal(isModal)
	}

	const displayPathItems = (event: Event): void => {
		if ((event.target as HTMLInputElement).value === '') {
			setItemsList([])
			return
		}
		setItemsList(pathItems.filter((pathItem: PathItem) => pathItem.alias.includes((event.target as HTMLInputElement).value)))
	}

	const onItemChanged = (index: number, isActive: boolean): void => {
		const newItemList = [...itemsList] as PathItem[]
		(newItemList[index] as PathItem).isSelected = isActive
		setItemsList(newItemList)
	}

	useEffect(() => {
		window.addEventListener('keydown', handleEsc)
		return () => {
			window.removeEventListener('keydown', handleEsc)
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
			<div className="flex justify-center items-center my-0 mx-auto mt-40 overflow-x-hidden overflow-y-auto relative inset-0 z-50 outline-none focus:outline-none w-8/12">
				<div className="border-0 rounded-xl shadow-lg relative flex flex-col bg-white outline-none focus:outline-none w-full">
					<div className="bg-white px-0 pt-1">
						<div>
							<div>
								<PainPerduSearchBar />
								<main className="min-h-3 py-0 px-3 overflow-y-auto">
									<div className="text-sm	my-0 mx-auto py-14 px-0 text-center w-4/5">
										{
											itemsList.length ? <PainPerduListItem pathItem={itemsList}
											onItemActiveChanged={onItemChanged} /> : <DefaultResults />
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