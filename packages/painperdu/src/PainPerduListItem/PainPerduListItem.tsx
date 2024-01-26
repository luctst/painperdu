/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import type { FC } from 'react'
import type { PathItem } from '../types';

interface Props {
  pathItem: PathItem[]
  onItemActiveChanged: (index: number, isActive: boolean) => void
}

  export const PainPerduListItem: FC<Props> = ({ pathItem, onItemActiveChanged }) => {
	return (
    <div className="painperdu--modal--body--container">
      <ul className="flex-col mb-12 pt-8 pl-4">
        {
          pathItem.map((item, index) => {
            return (
              <li
                key={index}
                className={`flex items-center ${item.isSelected ? 'bg-yellow-200' : 'bg-white'}`}
                onMouseOver={() => { onItemActiveChanged(index, true) }}
                onMouseLeave={() => { onItemActiveChanged(index, false) }}
              >
                <a className="w-full border-solid shadow-none border-y pl-3 decoration-none">
                  <div className="flex w-full items-center pr-2 h-14 text-neutral-500">
                    <div className="flex items-center h-14 pr-3">
                      <svg width="20" height="20" viewBox="0 0 20 20"><path d="M17 6v12c0 .52-.2 1-1 1H4c-.7 0-1-.33-1-1V2c0-.55.42-1 1-1h8l5 5zM14 8h-3.13c-.51 0-.87-.34-.87-.87V4" stroke="currentColor" fill="none" fillRule="evenodd" strokeLinejoin="round"></path></svg>
                    </div>
                    <div className="flex-auto flex-col justify-center font-medium leading-5 w-4/5">
                      <span className='text-xs'>{item.alias}</span>
                    </div>
                    <div className="flex items-center w-5.5 h-5.5">
                      <svg className="DocSearch-Hit-Select-Icon" width="20" height="20" viewBox="0 0 20 20"><g stroke="currentColor" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round"><path d="M18 3v4c0 2-2 4-4 4H2"></path><path d="M8 17l-6-6 6-6"></path></g></svg>
                    </div>
                  </div>
                </a>
              </li>
            )
          })
        }
      </ul>
    </div>
	);
};