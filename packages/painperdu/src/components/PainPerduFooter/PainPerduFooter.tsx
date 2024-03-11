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
            <li className='flex items-center mr-3'>
              <kbd className='flex items-center bg-none shadow-none	border-0 rounded-sm	text-sm	h-4.5 justify-center mr-1.5 pb-px w-5 bg-[#0000001a] bg-gradient-to-tr from-blue-200 to-white'>
                <svg width="15" height="15" viewBox="0 0 21 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.579545 1.21023V0.272727H7.125V1.21023H4.38068V9H3.32386V1.21023H0.579545ZM9.65518 9.15341C9.24041 9.15341 8.86399 9.07528 8.52592 8.91903C8.18786 8.75994 7.91939 8.53125 7.72053 8.23295C7.52166 7.93182 7.42223 7.56818 7.42223 7.14205C7.42223 6.76705 7.49609 6.46307 7.64382 6.23011C7.79155 5.99432 7.98899 5.80966 8.23615 5.67614C8.48331 5.54261 8.75604 5.44318 9.05433 5.37784C9.35547 5.30966 9.65803 5.25568 9.962 5.21591C10.3597 5.16477 10.6822 5.12642 10.9293 5.10085C11.1793 5.07244 11.3612 5.02557 11.4748 4.96023C11.5913 4.89489 11.6495 4.78125 11.6495 4.61932V4.58523C11.6495 4.16477 11.5344 3.83807 11.3043 3.60511C11.0771 3.37216 10.7319 3.25568 10.2688 3.25568C9.78871 3.25568 9.41229 3.3608 9.13956 3.57102C8.86683 3.78125 8.67507 4.00568 8.56428 4.24432L7.60973 3.90341C7.78018 3.50568 8.00746 3.19602 8.29155 2.97443C8.57848 2.75 8.89098 2.59375 9.22905 2.50568C9.56996 2.41477 9.90518 2.36932 10.2347 2.36932C10.445 2.36932 10.6864 2.39489 10.9592 2.44602C11.2347 2.49432 11.5004 2.59517 11.756 2.74858C12.0146 2.90199 12.229 3.13352 12.3995 3.44318C12.57 3.75284 12.6552 4.16761 12.6552 4.6875V9H11.6495V8.11364H11.5984C11.5302 8.25568 11.4165 8.40767 11.2575 8.5696C11.0984 8.73153 10.8867 8.86932 10.6225 8.98295C10.3583 9.09659 10.0359 9.15341 9.65518 9.15341ZM9.80859 8.25C10.2063 8.25 10.5415 8.17188 10.8143 8.01562C11.0898 7.85938 11.2972 7.65767 11.4364 7.41051C11.5785 7.16335 11.6495 6.90341 11.6495 6.63068V5.71023C11.6069 5.76136 11.5131 5.80824 11.3683 5.85085C11.2262 5.89062 11.0614 5.92614 10.8739 5.95739C10.6893 5.9858 10.5089 6.01136 10.3327 6.03409C10.1594 6.05398 10.0188 6.07102 9.91087 6.08523C9.6495 6.11932 9.40518 6.17472 9.17791 6.25142C8.95348 6.32528 8.77166 6.4375 8.63246 6.58807C8.49609 6.7358 8.42791 6.9375 8.42791 7.19318C8.42791 7.54261 8.55717 7.80682 8.8157 7.9858C9.07706 8.16193 9.40803 8.25 9.80859 8.25ZM14.6271 9V0.272727H15.6328V3.49432H15.718C15.7919 3.38068 15.8942 3.2358 16.0249 3.05966C16.1584 2.88068 16.3487 2.72159 16.5959 2.58239C16.8459 2.44034 17.1839 2.36932 17.6101 2.36932C18.1612 2.36932 18.647 2.5071 19.0675 2.78267C19.4879 3.05824 19.8161 3.44886 20.0518 3.95455C20.2876 4.46023 20.4055 5.05682 20.4055 5.74432C20.4055 6.4375 20.2876 7.03835 20.0518 7.54688C19.8161 8.05256 19.4893 8.4446 19.0717 8.72301C18.6541 8.99858 18.1726 9.13636 17.6271 9.13636C17.2067 9.13636 16.87 9.06676 16.6172 8.92756C16.3643 8.78551 16.1697 8.625 16.0334 8.44602C15.897 8.2642 15.7919 8.11364 15.718 7.99432H15.5987V9H14.6271ZM15.6158 5.72727C15.6158 6.22159 15.6882 6.65767 15.8331 7.03551C15.978 7.41051 16.1896 7.70455 16.468 7.91761C16.7464 8.12784 17.0874 8.23295 17.4908 8.23295C17.9112 8.23295 18.2621 8.12216 18.5433 7.90057C18.8274 7.67614 19.0405 7.375 19.1825 6.99716C19.3274 6.61648 19.3999 6.19318 19.3999 5.72727C19.3999 5.26705 19.3288 4.85227 19.1868 4.48295C19.0476 4.1108 18.8359 3.81676 18.5518 3.60085C18.2706 3.3821 17.9169 3.27273 17.4908 3.27273C17.0817 3.27273 16.7379 3.37642 16.4595 3.58381C16.1811 3.78835 15.9709 4.07528 15.8288 4.4446C15.6868 4.81108 15.6158 5.23864 15.6158 5.72727Z" fill="black"/>
                </svg>
              </kbd>
              <span className='text-xs text-[#6c75d]'>To Switch inputs</span>
            </li>
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
