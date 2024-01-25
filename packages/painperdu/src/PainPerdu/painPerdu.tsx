import { useEffect, useState } from 'react'
import { PainPerduModal }  from '../PainPerduModal/PainPerduModal'
import '../index.css'

export const PainPerdu = () => {
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
	window.addEventListener('keydown', handleEsc);
 })

	return (
		<section>
			{
				<PainPerduModal
					showModal={isModalActive}
					handleShowModal={shouldActiveModal}
				/>
			}
		</section>
	);
};