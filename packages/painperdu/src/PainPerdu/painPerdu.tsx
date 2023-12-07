import { useEffect, useState } from 'react';

export const PainPerdu = () => {
  const [isModal, setModal] = useState<boolean>(false);

	const handleEsc = (event: KeyboardEvent): void => {
		const isMetaKey: boolean = event.metaKey
		if (event.code === 'KeyK' && isMetaKey) setModal(true)
	};

 useEffect(() => {
	window.addEventListener('keydown', handleEsc);
 })

	return (
		<section>
			{ isModal ? 'test' : '' }
		</section>
	);
};