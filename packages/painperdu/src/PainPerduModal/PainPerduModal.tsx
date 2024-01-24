import type { FC } from 'react'

interface Props {
  showModal: boolean
  handleShowModal: (isShowModal: boolean) => void
}

  export const PainPerduModal: FC<Props> = ({ showModal, handleShowModal }) => {
  return (
    <>
      { showModal ? (
        <>
          <div
            className={`
              flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50
              outline-none focus:outline-none ${showModal ? 'bg-slate-500 opacity-80' : ''}`
            }
            onClick={() => { handleShowModal(false) }}
          ></div>
            <div className="flex justify-center items-center my-0 mx-auto mt-40 overflow-x-hidden overflow-y-auto relative inset-0 z-50 outline-none focus:outline-none w-8/12">
              <div className="border-0 rounded-xl shadow-lg relative flex flex-col bg-white outline-none focus:outline-none w-full">
                <div className="bg-white px-0 pt-1">
                  <div>
                    <div>
                      <header className='pt-3 px-3 pb-0'>
                        <form className="flex items-center bg-white relative rounded-md m-0 py-0 px-3 h-14 w-full ">
                          <label className="flex items-center justify-center m-0 p-0 text-yellow-200" id="form--label" htmlFor="painperdu-input">
                            <svg width="20" height="20" viewBox="0 0 20 20"><path d="M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z" stroke="currentColor" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                          </label>
                          <input id="painperdu-input" className="bg-transparent	border-0 text-black	flex-1 text-xl h-full outline-none pl-2 w-4/5" aria-autocomplete="both" autoCorrect="off" autoCapitalize="none" autoFocus={true} type="search" placeholder="Search Routes" spellCheck="false" enterKeyHint="search" maxLength={64} />
                        </form>
                      </header>
                      <main className="min-h-3 py-0 px-3 overflow-y-auto">
                        <div className="text-sm	my-0 mx-auto py-14 px-0 text-center w-4/5">
                          <p className="text-slate-500">Start writing to search routes</p>
                        </div>
                        <div>
                          <ul className="flex list-none	m-0 p-0"></ul>
                        </div>
                      </main>
                      <footer className="flex items-center bg-white rounded-md box-border h-11 justify-between	py-0 px-3 relative w-full z-30">
                        <ul className="flex list-none	m-0 p-0">
                          <li className="flex items-center mr-3">
                            <kbd className="flex items-center bg-none shadow-none	border-0 rounded-sm	text-sm	h-4.5 justify-center mr-1.5 pb-px w-5">
                              <svg width="15" height="15" aria-label="Enter key" role="img"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2"><path d="M12 3.53088v3c0 1-1 2-2 2H4M7 11.53088l-3-3 3-3"></path></g></svg>
                            </kbd>
                            <span className="text-xs">to select</span>
                          </li>
                          <li className="flex items-center mr-3">
                            <kbd className="flex items-center bg-none shadow-none	border-0 rounded-sm	text-sm	h-4.5 justify-center mr-1.5 pb-px w-5">
                              <svg width="15" height="15" aria-label="Arrow down" role="img"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2"><path d="M7.5 3.5v8M10.5 8.5l-3 3-3-3"></path></g></svg>
                            </kbd>
                            <kbd className="flex items-center bg-none shadow-none	border-0 rounded-sm	text-sm	h-4.5 justify-center mr-1.5 pb-px w-5">
                              <svg width="15" height="15" aria-label="Arrow up" role="img"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2"><path d="M7.5 11.5v-8M10.5 6.5l-3-3-3 3"></path></g></svg>
                            </kbd>
                            <span className="text-xs">to navigate</span>
                          </li>
                          <li className="flex items-center mr-3">
                            <kbd className="flex items-center bg-none shadow-none	border-0 rounded-sm	text-sm	h-4.5 justify-center mr-1.5 pb-px w-5">
                              <svg width="15" height="15" aria-label="Escape key" role="img"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2"><path d="M13.6167 8.936c-.1065.3583-.6883.962-1.4875.962-.7993 0-1.653-.9165-1.653-2.1258v-.5678c0-1.2548.7896-2.1016 1.653-2.1016.8634 0 1.3601.4778 1.4875 1.0724M9 6c-.1352-.4735-.7506-.9219-1.46-.8972-.7092.0246-1.344.57-1.344 1.2166s.4198.8812 1.3445.9805C8.465 7.3992 8.968 7.9337 9 8.5c.032.5663-.454 1.398-1.4595 1.398C6.6593 9.898 6 9 5.963 8.4851m-1.4748.5368c-.2635.5941-.8099.876-1.5443.876s-1.7073-.6248-1.7073-2.204v-.4603c0-1.0416.721-2.131 1.7073-2.131.9864 0 1.6425 1.031 1.5443 2.2492h-2.956"></path></g></svg>
                            </kbd>
                            <span className="text-xs">to close</span>
                          </li>
                        </ul>
                        <div className="painperdu--modal--footer--thanks">
                          <p className='text-xs m-0'>Made with 🤍 by <a href="" target="_blank" rel="noopener noreferrer">@antoine</a> and <a href="https://lucastostee.com" target="_blank" rel="noopener noreferrer">@lucas</a></p>
                        </div>
                      </footer>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          {/* </div> */}
        </>
      ) : null }
    </>
  );
};
