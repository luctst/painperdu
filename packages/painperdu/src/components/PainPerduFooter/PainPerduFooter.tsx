import { memo, type FC } from 'react'

interface PainPerduFooterProps {
  isEditMode: boolean;
}

const PainPerduFooter: FC<PainPerduFooterProps> = memo(function PainPerduFooter({ isEditMode }): JSX.Element {
  return (
    <footer className="flex items-center bg-white bg-opacity-60 rounded-md box-border h-11 justify-between shadow-[0_-1px_#e0e3e8_0_-3px_6px_#45629b1f] py-0 px-3 relative w-full z-30">
      <ul className="flex list-none	m-0 p-0 text-[#6c757d]">
        {
          isEditMode ?
          <>
            <li className="flex items-center mr-3">
              <kbd className="flex items-center bg-none shadow-none	border-0 rounded-sm	text-sm	h-4.5 justify-center mr-1.5 pb-px w-5 bg-[#0000001a] bg-gradient-to-tr from-blue-200 to-white">
                <svg width="15" height="15" aria-label="Enter key" role="img"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2"><path d="M12 3.53088v3c0 1-1 2-2 2H4M7 11.53088l-3-3 3-3"></path></g></svg>
              </kbd>
              <span className="text-xs text-[#6c757d]">to navigate</span>
            </li>
            <li className="flex items-center mr-3">
              <kbd className="flex items-center bg-none shadow-none	border-0 rounded-sm	text-sm	h-4.5 justify-center mr-1.5 pb-px w-5 bg-[#0000001a] bg-gradient-to-tr from-blue-200 to-white">
                <svg width="15" height="15" aria-label="Escape key" role="img"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2"><path d="M13.6167 8.936c-.1065.3583-.6883.962-1.4875.962-.7993 0-1.653-.9165-1.653-2.1258v-.5678c0-1.2548.7896-2.1016 1.653-2.1016.8634 0 1.3601.4778 1.4875 1.0724M9 6c-.1352-.4735-.7506-.9219-1.46-.8972-.7092.0246-1.344.57-1.344 1.2166s.4198.8812 1.3445.9805C8.465 7.3992 8.968 7.9337 9 8.5c.032.5663-.454 1.398-1.4595 1.398C6.6593 9.898 6 9 5.963 8.4851m-1.4748.5368c-.2635.5941-.8099.876-1.5443.876s-1.7073-.6248-1.7073-2.204v-.4603c0-1.0416.721-2.131 1.7073-2.131.9864 0 1.6425 1.031 1.5443 2.2492h-2.956"></path></g></svg>
              </kbd>
              <span className="text-xs text-[#6c757d]">to close</span>
            </li>
          </>
          :
          <>
            <li className="flex items-center mr-3">
              <kbd className="flex items-center bg-none shadow-none	border-0 rounded-sm	text-sm	h-4.5 justify-center mr-1.5 pb-px w-5 bg-[#0000001a] bg-gradient-to-tr from-blue-200 to-white">
                <svg width="15" height="15" aria-label="Enter key" role="img"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2"><path d="M12 3.53088v3c0 1-1 2-2 2H4M7 11.53088l-3-3 3-3"></path></g></svg>
              </kbd>
              <span className="text-xs text-[#6c757d]">to select</span>
            </li>
            <li className="flex items-center mr-3">
              <kbd className="flex items-center bg-none shadow-none	border-0 rounded-sm	text-sm	h-4.5 justify-center mr-1.5 pb-px w-5 bg-[#0000001a] bg-gradient-to-tr from-blue-200 to-white">
                <svg width="15" height="15" aria-label="Arrow down" role="img"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2"><path d="M7.5 3.5v8M10.5 8.5l-3 3-3-3"></path></g></svg>
              </kbd>
              <kbd className="flex items-center bg-none shadow-none	border-0 rounded-sm	text-sm	h-4.5 justify-center mr-1.5 pb-px w-5 bg-[#0000001a] bg-gradient-to-tr from-blue-200 to-white">
                <svg width="15" height="15" aria-label="Arrow up" role="img"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2"><path d="M7.5 11.5v-8M10.5 6.5l-3-3-3 3"></path></g></svg>
              </kbd>
              <span className="text-xs text-[#6c757d]">to navigate</span>
            </li>
            <li className="flex items-center mr-3">
              <kbd className="flex items-center bg-none shadow-none	border-0 rounded-sm	text-sm	h-4.5 justify-center mr-1.5 pb-px w-5 bg-[#0000001a] bg-gradient-to-tr from-blue-200 to-white">
                <svg width="15" height="15" aria-label="Escape key" role="img"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2"><path d="M13.6167 8.936c-.1065.3583-.6883.962-1.4875.962-.7993 0-1.653-.9165-1.653-2.1258v-.5678c0-1.2548.7896-2.1016 1.653-2.1016.8634 0 1.3601.4778 1.4875 1.0724M9 6c-.1352-.4735-.7506-.9219-1.46-.8972-.7092.0246-1.344.57-1.344 1.2166s.4198.8812 1.3445.9805C8.465 7.3992 8.968 7.9337 9 8.5c.032.5663-.454 1.398-1.4595 1.398C6.6593 9.898 6 9 5.963 8.4851m-1.4748.5368c-.2635.5941-.8099.876-1.5443.876s-1.7073-.6248-1.7073-2.204v-.4603c0-1.0416.721-2.131 1.7073-2.131.9864 0 1.6425 1.031 1.5443 2.2492h-2.956"></path></g></svg>
              </kbd>
              <span className="text-xs text-[#6c757d]">to close</span>
            </li>
          </>
        }
      </ul>
    </footer>
  )
})

export default PainPerduFooter
