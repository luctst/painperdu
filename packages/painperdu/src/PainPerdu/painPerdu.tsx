import { useEffect, useState } from 'react'
import { PainPerduModal }  from '../PainPerduModal/PainPerduModal'
import '../index.css'

export const PainPerdu = () => {
  const [isModal, setModal] = useState<boolean>(false)

	const handleEsc = (event: KeyboardEvent): void => {
		const isMetaKey: boolean = event.metaKey
		if (isMetaKey && event.code === 'KeyK') {
			setModal(true)
		}
		if (isModal && event.code === 'Escape') {
			setModal(false)
		}
	};

	const displayedModal = (isModal: boolean): void => {
		setModal(isModal)
	}

 useEffect(() => {
	window.addEventListener('keydown', handleEsc);
 })

	return (
		<section>
			{
				<PainPerduModal
					showModal={isModal}
					handleShowModal={displayedModal}
				/>
			}
		</section>
	);
};