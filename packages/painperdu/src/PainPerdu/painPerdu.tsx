import { useEffect, useState } from 'react'
import type { FC } from 'react'
import { createPortal } from 'react-dom';
import { PainPerduSearchBar } from '../components/PainPerduSearchBar'
import { PainPerduFooter } from '../components/PainPerduFooter'
import '../index.css'

interface Props {
  teleport: string
}

export const PainPerdu: FC<Props> = ({ teleport }) => {
  const [isModalActive, setModal] = useState<boolean>(false)

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
										<p className="text-slate-500">Start writing to search routes</p>
									</div>
									<div>
										<ul className="flex list-none	m-0 p-0"></ul>
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