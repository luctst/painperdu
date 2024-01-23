import { useEffect, useState } from 'react'
import { PainPerduModal }  from '../PainPerduModal/PainPerduModal'
import '../index.css'

export const PainPerdu = () => {
  const [isModal, setModal] = useState<boolean>(false)
	const [isContainerBc, setIsContainerBc] = useState<boolean>(false)

	const handleEsc = (event: KeyboardEvent): void => {
		const isMetaKey: boolean = event.metaKey
		if (isMetaKey && event.code === 'KeyK') {
			setModal(true)
			setIsContainerBc(true)
		}
		if (isModal && event.code === 'Escape') {
			setModal(false)
			setIsContainerBc(false)
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
					isContainerBc={isContainerBc}
					showModal={isModal}
					handleShowModal={displayedModal}
				/>
			}
		</section>
	);
};