import type { ChangeEvent, FC } from 'react'

interface Props {
  displayPathItems: (event: ChangeEvent<HTMLInputElement>) => void
}

const PainPerduSearchBar: FC<Props> = ({ displayPathItems }) => {
 return (
  <header className='pt-3 px-3 pb-0'>
    <form className="flex items-center bg-white bg-opacity-60 relative rounded-md m-0 py-0 px-3 h-14 w-full shadow-[inset_0_0_0_2px_#fcec57]">
      <label className="flex items-center justify-center m-0 p-0 text-yellow-200" id="form--label" htmlFor="painperdu-input">
        <svg width="20" height="20" viewBox="0 0 20 20"><path d="M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z" stroke="currentColor" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round"></path></svg>
      </label>
      <input id="painperdu-input" className="bg-transparent	border-0 text-black	flex-1 text-xl h-full outline-none pl-2 w-4/5" autoComplete='off' aria-autocomplete="both" autoCorrect="off" autoCapitalize="none" autoFocus={true} type="search" placeholder="Search Routes" spellCheck="false" enterKeyHint="search" maxLength={64} onChange={(e) => {displayPathItems(e)}} />
    </form>
  </header>
 )
}

export default PainPerduSearchBar
