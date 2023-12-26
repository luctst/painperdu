import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react'
import '../index.css'

export const PainPerdu = () => {
  const [isModal, setModal] = useState<boolean>(false);

	const handleEsc = (event: KeyboardEvent): void => {
		const isMetaKey: boolean = event.metaKey
		if (event.code === 'KeyK' && isMetaKey) setModal(true)
		if (isModal && event.code === 'Escape') setModal(false)
	};

 useEffect(() => {
	window.addEventListener('keydown', handleEsc);
 })

	return (
		<section>
			<div>
				<h1>Welcome on Pain Perdu</h1>
				<div>
						Press CMD + K to open modal and load new route
				</div>
			</div>
			{ isModal ? (
				<Transition.Root show={isModal} as={Fragment}>
				<Dialog as="div" className="relative z-10" onClose={setModal}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
					</Transition.Child>
					<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
						<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
								enterTo="opacity-100 translate-y-0 sm:scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 translate-y-0 sm:scale-100"
								leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							>
								<Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
									<div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
										<div className="sm:flex sm:items-start">
											<div className="painperdu--modal">
												<header className="painperdu--modal--header">
													<form className="painperdu--modal--header--form">
														<label className="painperdu--modal--header--form--label" id="form--label" htmlFor="painperdu-input">
															<svg width="20" height="20" viewBox="0 0 20 20"><path d="M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z" stroke="currentColor" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round"></path></svg>
														</label>
														<input id="painperdu-input" className="painperdu--modal--header--form--input" aria-autocomplete="both" autoCorrect="off" autoCapitalize="none" autoFocus={true} type="search" placeholder="Search Routes" spellCheck="false" enterKeyHint="search" maxLength={64} />
													</form>
												</header>
												<main className="painperdu--modal--body">
													<div className="painperdu--modal--body--nosearch is--block">
														<p>Start writing to search routes</p>
													</div>
													<div className="painperdu--modal--body--container is--none">
														<ul className="painperdu--modal--body--container--list"></ul>
													</div>
												</main>
												<footer className="painperdu--modal--footer">
													<ul className="painperdu--modal--footer--commands">
														<li className="painperdu--modal--footer--commands--li">
															<kbd className="painperdu--modal--footer--commands--li--key">
																<svg width="15" height="15" aria-label="Enter key" role="img"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2"><path d="M12 3.53088v3c0 1-1 2-2 2H4M7 11.53088l-3-3 3-3"></path></g></svg>
															</kbd>
															<span>to select</span>
														</li>
														<li className="painperdu--modal--footer--commands--li">
															<kbd className="painperdu--modal--footer--commands--li--key">
																<svg width="15" height="15" aria-label="Arrow down" role="img"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2"><path d="M7.5 3.5v8M10.5 8.5l-3 3-3-3"></path></g></svg>
															</kbd>
															<kbd className="painperdu--modal--footer--commands--li--key">
																<svg width="15" height="15" aria-label="Arrow up" role="img"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2"><path d="M7.5 11.5v-8M10.5 6.5l-3-3-3 3"></path></g></svg>
															</kbd>
															<span>to navigate</span>
														</li>
														<li className="painperdu--modal--footer--commands--li">
															<kbd className="painperdu--modal--footer--commands--li--key">
																<svg width="15" height="15" aria-label="Escape key" role="img"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2"><path d="M13.6167 8.936c-.1065.3583-.6883.962-1.4875.962-.7993 0-1.653-.9165-1.653-2.1258v-.5678c0-1.2548.7896-2.1016 1.653-2.1016.8634 0 1.3601.4778 1.4875 1.0724M9 6c-.1352-.4735-.7506-.9219-1.46-.8972-.7092.0246-1.344.57-1.344 1.2166s.4198.8812 1.3445.9805C8.465 7.3992 8.968 7.9337 9 8.5c.032.5663-.454 1.398-1.4595 1.398C6.6593 9.898 6 9 5.963 8.4851m-1.4748.5368c-.2635.5941-.8099.876-1.5443.876s-1.7073-.6248-1.7073-2.204v-.4603c0-1.0416.721-2.131 1.7073-2.131.9864 0 1.6425 1.031 1.5443 2.2492h-2.956"></path></g></svg>
															</kbd>
															<span>to close</span>
														</li>
													</ul>
													<div className="painperdu--modal--footer--thanks">
														<p className='text-3xl font-bold underline'>Made with 🤍 by <a href="" target="_blank" rel="noopener noreferrer">@antoine</a> and <a href="https://lucastostee.com" target="_blank" rel="noopener noreferrer">@lucas</a></p>
													</div>
												</footer>
											</div>
										</div>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition.Root>
			) : (
				<div></div>
			)}
		</section>
	);
};