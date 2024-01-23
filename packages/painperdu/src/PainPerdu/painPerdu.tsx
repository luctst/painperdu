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
			<div className='flex flex-col justify-center items-center m-5'>
				<div className='p-6 text-5xl font-bold '>
					<h1>Welcome on Pain Perdu</h1>
				</div>
				<div className='flex items-center justify-center'>
					Press <kbd className='p-3 ml-1 mr-1'>CMD</kbd>+<kbd className='p-3 ml-1 mr-1'>K</kbd>for open modal and load new route
				</div>
			</div>
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