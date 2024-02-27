import { forwardRef, useImperativeHandle, useRef } from 'react';
import type { CustomLiRef, RouteItems } from '../../types';

interface Props {
  route: RouteItems,
  cursorUpdated: () => void
}

export const PainPerduListItem = forwardRef<CustomLiRef, Props>((props, ref) => {
  const liRef = useRef<HTMLLIElement | null>(null)

  useImperativeHandle(ref, () => {
    return {
      getElementHeight() {
        if (liRef.current === null) return;
        return liRef?.current.clientHeight
      },
      getElementOffsetTop() {
        if (liRef.current === null) return
        return liRef?.current?.offsetTop
      },
    }
  }, [])

  return (
	  <li
      ref={liRef}
      className={`flex items-center ${props.route.isSelected ? 'bg-yellow-200' : 'bg-white bg-opacity-60'}`}
      onMouseOver={() => { props.cursorUpdated() }}
      onMouseLeave={() => { props.cursorUpdated() }}
      >
      <a className="w-full border-solid shadow-none border-y pl-3 decoration-none">
        <div className="flex w-full items-center pr-2 h-14 text-neutral-500">
          <div className="flex items-center h-14 pr-3">
            <svg width="20" height="20" viewBox="0 0 20 20"><path d="M17 6v12c0 .52-.2 1-1 1H4c-.7 0-1-.33-1-1V2c0-.55.42-1 1-1h8l5 5zM14 8h-3.13c-.51 0-.87-.34-.87-.87V4" stroke="currentColor" fill="none" fillRule="evenodd" strokeLinejoin="round"></path></svg>
          </div>
          <div className="flex-auto flex-col justify-center font-medium leading-5 w-4/5">
            <span className='text-xs text-[#6c757d]'>{props.route.path}</span>
          </div>
          <div className="flex items-center w-5.5 h-5.5">
            <svg className="DocSearch-Hit-Select-Icon" width="20" height="20" viewBox="0 0 20 20"><g stroke="currentColor" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round"><path d="M18 3v4c0 2-2 4-4 4H2"></path><path d="M8 17l-6-6 6-6"></path></g></svg>
          </div>
        </div>
      </a>
    </li>
	);
})

PainPerduListItem.displayName = 'PainPerduListItem';
