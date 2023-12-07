import React, { useEffect, useState } from 'react';

export const PainPerdu = () => {
  const [isModal, setModal] = useState<boolean>(false);

	const handleEsc = (event: KeyboardEvent): void => {
		console.log("🚀 ~ file: PainPerdu.tsx:7 ~ handleEsc ~ event:", event)
		const isMetaKey: boolean = event.metaKey
		if (event.code === 'KeyK' && isMetaKey) setModal(true)
	};

 useEffect(() => {
	window.addEventListener('keydown', handleEsc);
 })

	return (
		<section></section>
	);
};
