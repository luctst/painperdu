import {
  type FC,
  useCallback,
  memo,
  type ChangeEventHandler,
  useRef,
} from "react";

interface Props {
  displayPathItems: (value: string) => void;
}

const PainPerduSearchBar: FC<Props> = memo(function PainPerduSearchBar({
  displayPathItems,
}): JSX.Element {
  const intervalTimeout = useRef<NodeJS.Timeout | undefined>(undefined);

  const debounce = useCallback((value: string) => {
    clearTimeout(intervalTimeout.current);

    intervalTimeout.current = setTimeout(() => {
      displayPathItems(value);
    }, 1000);
  }, []);

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => { debounce(e.target.value) };

  return (
    <header className="px-3 pb-0 pt-3">
      <form className="relative m-0 flex h-14 w-full items-center rounded-md bg-white bg-opacity-60 px-3 py-0 shadow-[inset_0_0_0_2px_#fcec57]">
        <label
          className="m-0 flex items-center justify-center p-0 text-yellow-200"
          id="form--label"
          htmlFor="painperdu-input"
        >
          <svg width="20" height="20" viewBox="0 0 20 20">
            <path
              d="M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z"
              stroke="currentColor"
              fill="none"
              fillRule="evenodd"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </label>
        <input
          id="painperdu-input"
          className="h-full	w-4/5 flex-1	border-0 bg-transparent pl-2 text-xl text-black outline-none"
          autoComplete="off"
          aria-autocomplete="both"
          autoCorrect="off"
          autoCapitalize="none"
          autoFocus={true}
          type="search"
          placeholder="Search Routes"
          spellCheck="false"
          enterKeyHint="search"
          maxLength={64}
          onChange={onChange}
        />
      </form>
    </header>
  );
});

export default PainPerduSearchBar;
