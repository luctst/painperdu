/* eslint-env browser */
import debounce from 'lodash.debounce';
import '@/scss/main.scss';
import { Route, FinalConfig, Config, HtmlElementAttribues } from '@/types/index';

const isObject = (obj: object): boolean => obj === Object(obj);
const objectHasProperty = (obj: object, key: string): boolean | never => {
  if (!obj || !key) throw new TypeError('Params error');
  if (!isObject(obj) || typeof key !== 'string')
    throw new TypeError('Params format error');

  return Object.prototype.hasOwnProperty.call(obj, key);
};

function checkRoutes(routes: Array<Route>): Array<Route> | never {
  if (!window) throw new Error('Should be use in an web page');

  if (!routes || !Array.isArray(routes) || !routes.length)
    throw new Error('Routes must be defined and be array and includes objects');

  const routesObjectIsGood: boolean = routes.every((routesData) => {
    if (!isObject(routesData)) return false;
    if (!objectHasProperty(routesData, 'path') || !objectHasProperty(routesData, 'label'))
      return false;
    return true;
  });

  if (!routesObjectIsGood)
    throw new Error(
      'Data passed in routes parameters must be object and includes at least path and label fields'
    );
  return [...routes];
}

function createConfig(ops: FinalConfig): FinalConfig {
  const defaultConfig: FinalConfig = {
    shortCutLaunchName: 'KeyK',
    mainContainerId: 'painperdu',
    mainContainer: document.body,
    originURL: window.location.origin,
    itemSelected: 0,
  };

  if (!ops) return { ...defaultConfig };
  const opsFormated: Config = ['shortCutLaunchName'].reduce((prev, next) => {
    const toReturn = { ...prev };
    if (ops[next]) toReturn[next] = ops[next];
    return toReturn;
  }, {});

  return {
    ...defaultConfig,
    ...opsFormated,
  };
}

function createPainPerduContainer(container: HTMLElement, conf: FinalConfig): void {
  container.classList.add('painperdu--active');
  const section = document.createElement('section');
  const sectionAttributes: Array<HtmlElementAttribues> = [
    {
      name: 'id',
      value: conf.mainContainerId,
    },
    {
      name: 'role',
      value: 'button',
    },
    {
      name: 'aria-expanded',
      value: 'true',
    },
    {
      name: 'tabindex',
      value: '0',
    },
    {
      name: 'aria-haspopup',
      value: 'listbox',
    },
  ];

  sectionAttributes.forEach((attributeData) =>
    section.setAttribute(attributeData.name, attributeData.value)
  );
  section.innerHTML = `
    <div class="painperdu--modal">
      <header class="painperdu--modal--header">
        <form class="painperdu--modal--header--form">
          <label class="painperdu--modal--header--form--label" id="form--label" for="painperdu-input">
            <svg width="20" height="20" viewBox="0 0 20 20"><path d="M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z" stroke="currentColor" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>
          </label>
          <input id="painperdu-input" class="painperdu--modal--header--form--input" aria-autocomplete="both" autocorrect="off" autocapitalize="none" autofocus="true" type="search" placeholder="Search Routes" spellcheck="false" enterkeyhint="search" maxLength="64"/>
        </form>
      </header>
      <main class="painperdu--modal--body">
        <div class="painperdu--modal--body--nosearch is--block">
          <p>Start writing to search routes</p>
        </div>
        <div class="painperdu--modal--body--container is--none">
          <ul class="painperdu--modal--body--container--list"></ul>
        </div>
      </main>
      <footer class="painperdu--modal--footer">
        <ul class="painperdu--modal--footer--commands">
          <li class="painperdu--modal--footer--commands--li">
            <kbd class="painperdu--modal--footer--commands--li--key">
              <svg width="15" height="15" aria-label="Enter key" role="img"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2"><path d="M12 3.53088v3c0 1-1 2-2 2H4M7 11.53088l-3-3 3-3"></path></g></svg>
            </kbd>
            <span>to select</span>
          </li>
          <li class="painperdu--modal--footer--commands--li">
            <kbd class="painperdu--modal--footer--commands--li--key">
              <svg width="15" height="15" aria-label="Arrow down" role="img"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2"><path d="M7.5 3.5v8M10.5 8.5l-3 3-3-3"></path></g></svg>
            </kbd>
            <kbd class="painperdu--modal--footer--commands--li--key">
              <svg width="15" height="15" aria-label="Arrow up" role="img"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2"><path d="M7.5 11.5v-8M10.5 6.5l-3-3-3 3"></path></g></svg>
            </kbd>
            <span>to navigate</span>
          </li>
          <li class="painperdu--modal--footer--commands--li">
            <kbd class="painperdu--modal--footer--commands--li--key">
              <svg width="15" height="15" aria-label="Escape key" role="img"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2"><path d="M13.6167 8.936c-.1065.3583-.6883.962-1.4875.962-.7993 0-1.653-.9165-1.653-2.1258v-.5678c0-1.2548.7896-2.1016 1.653-2.1016.8634 0 1.3601.4778 1.4875 1.0724M9 6c-.1352-.4735-.7506-.9219-1.46-.8972-.7092.0246-1.344.57-1.344 1.2166s.4198.8812 1.3445.9805C8.465 7.3992 8.968 7.9337 9 8.5c.032.5663-.454 1.398-1.4595 1.398C6.6593 9.898 6 9 5.963 8.4851m-1.4748.5368c-.2635.5941-.8099.876-1.5443.876s-1.7073-.6248-1.7073-2.204v-.4603c0-1.0416.721-2.131 1.7073-2.131.9864 0 1.6425 1.031 1.5443 2.2492h-2.956"></path></g></svg>
            </kbd>
            <span>to close</span>
          </li>
        </ul>
        <div class="painperdu--modal--footer--thanks">
          <p>Made with 🤍 by <a href="" target="_blank" rel="noopener noreferrer">@antoine</a> and <a href="https://lucastostee.com" target="_blank" rel="noopener noreferrer">@lucas</a></p>
        </div>
      </footer>
    </div>
  `;

  container.appendChild(section);
  document.getElementById('painperdu-input').focus();
}

function switchClass(shouldShowList: boolean): boolean {
  const noItems: HTMLElement = document.querySelector(
    '.painperdu--modal--body--nosearch'
  );
  const itemsContainer: HTMLElement = document.querySelector(
    '.painperdu--modal--body--container'
  );

  if (shouldShowList) {
    itemsContainer.classList.remove('is--none');
    itemsContainer.classList.add('is--block');

    noItems.classList.remove('is--block');
    noItems.classList.add('is--none');
    return true;
  }

  itemsContainer.classList.remove('is--block');
  itemsContainer.classList.add('is--none');
  noItems.classList.remove('is--none');
  noItems.classList.add('is--block');
  return true;
}

function handleMouseOver(evt: Event, config: FinalConfig): boolean {
  evt.stopPropagation();
  const target = evt.target as HTMLTextAreaElement;
  const ariaSelected = target.getAttribute('aria-selected');
  const itemIndex = parseInt(target.firstElementChild.id.split('--')[3], 10);
  const itemParent = document.querySelector('.painperdu--modal--body--container--list');
  if (ariaSelected === 'true' && itemIndex === config.itemSelected) return true;

  itemParent.children.item(config.itemSelected).setAttribute('aria-selected', 'false');
  target.setAttribute('aria-selected', 'true');
  config.itemSelected = itemIndex;
  return true;
}

function createItems(
  routesMatched: Array<Route>,
  containerToCreateItems: Element,
  cf: FinalConfig
): void {
  return routesMatched.forEach((r, index) => {
    const li: HTMLElement = document.createElement('li');
    const liAttributes: Array<HtmlElementAttribues> = [
      {
        name: 'class',
        value: 'painperdu--modal--body--container--list--item',
      },
      {
        name: 'role',
        value: 'option',
      },
      {
        name: 'aria-selected',
        value: index === 0 ? 'true' : 'false',
      },
    ];

    liAttributes.forEach((attr) => li.setAttribute(attr.name, attr.value));
    li.innerHTML = `
    <a id="is--item--link--${index}" href="${
      cf.originURL + r.path
    }" class="painperdu--modal--body--container--list--item--link">
      <div class="painperdu--modal--body--container--list--item--link--container">
        <div class="painperdu--modal--body--container--list--item--link--container--iconleft">
          <svg width="20" height="20" viewBox="0 0 20 20"><path d="M17 6v12c0 .52-.2 1-1 1H4c-.7 0-1-.33-1-1V2c0-.55.42-1 1-1h8l5 5zM14 8h-3.13c-.51 0-.87-.34-.87-.87V4" stroke="currentColor" fill="none" fill-rule="evenodd" stroke-linejoin="round"></path></svg>
        </div>
        <div class="painperdu--modal--body--container--list--item--link--container--content">
          <span>${r.label}</span>
        </div>
        <div class="painperdu--modal--body--container--list--item--link--container--iconright">
          <svg class="DocSearch-Hit-Select-Icon" width="20" height="20" viewBox="0 0 20 20"><g stroke="currentColor" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"><path d="M18 3v4c0 2-2 4-4 4H2"></path><path d="M8 17l-6-6 6-6"></path></g></svg>
        </div>
      </div>
    </a>`;

    li.addEventListener('mouseenter', (e) => handleMouseOver(e, cf));
    containerToCreateItems.appendChild(li);
  });
}

function onInputChange(
  userInput: string,
  oldInputValue: string,
  routes: Array<Route>,
  conf: FinalConfig
): string {
  if (userInput === oldInputValue) return userInput;
  if (!userInput.length) {
    switchClass(false);
    return userInput;
  }

  const inputValueFormated = userInput.toLowerCase().trim();
  const arrayMatches = routes.filter((routeData) =>
    routeData.label.toLowerCase().trim().includes(inputValueFormated)
  );

  if (!arrayMatches.length) {
    switchClass(false);
    return userInput;
  }

  switchClass(true);
  const ul = document.querySelector('.painperdu--modal--body--container--list');
  ul.innerHTML = '';
  createItems(arrayMatches, ul, conf);

  return userInput;
}

function handleEscapeTouch(keyboardTouch: string, painPerduContainerId: string): boolean {
  if (keyboardTouch === 'escape') {
    if (document.getElementById(painPerduContainerId)) {
      document.getElementById(painPerduContainerId).remove();
      return false;
    }
  }

  return true;
}

function handleScrollBar(itemSelect: number, arrowTouch: string): boolean {
  const containerScrollable = document.querySelector('.painperdu--modal--body');
  const itemSelected = document.getElementById(
    `is--item--link--${itemSelect}`
  ).parentElement;
  const containerScrollableScrollPx =
    containerScrollable.clientHeight + containerScrollable.scrollTop;

  if (arrowTouch === 'down') {
    if (itemSelected.offsetTop >= containerScrollableScrollPx)
      containerScrollable.scroll({
        top: containerScrollable.scrollTop + itemSelected.clientHeight,
      });
    return true;
  }

  if (itemSelected.offsetTop <= containerScrollableScrollPx)
    containerScrollable.scroll({
      top: containerScrollable.scrollTop - itemSelected.clientHeight,
    });
  return true;
}

function handleArrowTouch(keyboardTouch: string, conf: FinalConfig): boolean {
  if (keyboardTouch !== 'arrowup' && keyboardTouch !== 'arrowdown') return true;
  const inputForm: HTMLElement = document.getElementById('painperdu-input');
  if (inputForm !== document.activeElement) return true;

  const itemList: NodeListOf<HTMLElement> = document.querySelectorAll(
    '.painperdu--modal--body--container--list--item'
  );
  if (!itemList.length) return true;

  if (keyboardTouch === 'arrowup') {
    if (conf.itemSelected === 0) return true;
    itemList[conf.itemSelected].setAttribute('aria-selected', 'false');
    itemList[conf.itemSelected - 1].setAttribute('aria-selected', 'true');
    conf.itemSelected -= 1;
    handleScrollBar(conf.itemSelected, 'up');
    return true;
  }

  if (conf.itemSelected === itemList.length - 1) return true;
  itemList[conf.itemSelected].setAttribute('aria-selected', 'false');
  itemList[conf.itemSelected + 1].setAttribute('aria-selected', 'true');
  conf.itemSelected += 1;
  handleScrollBar(conf.itemSelected, 'down');
  return true;
}

function handleEnterTouch(cof: FinalConfig): boolean {
  const form = document.querySelector('.painperdu--modal--header--form');

  function handleSubmitForm(event) {
    event.preventDefault();
    document.getElementById(`is--item--link--${cof.itemSelected}`).click();
    form.removeEventListener('submit', handleSubmitForm);
  }

  if (!form) return false;
  form.addEventListener('submit', handleSubmitForm);
}

function painPerdu(routes: Route[], ops: FinalConfig): void {
  try {
    const rt = checkRoutes(routes);
    const config = createConfig(ops);
    let painperduInputOldValue: string = '';

    window.addEventListener('keydown', (e) => {
      handleArrowTouch(e.code.toLowerCase(), config);
      handleEscapeTouch(e.code.toLowerCase(), config.mainContainerId);

      if (!e.metaKey || e.code !== config.shortCutLaunchName) return false;
      if (document.getElementById(config.mainContainerId)) return false;

      createPainPerduContainer(config.mainContainer, config);
      document.getElementById('painperdu-input').addEventListener(
        'keyup',
        debounce((evt) => {
          painperduInputOldValue = onInputChange(
            evt.target.value,
            painperduInputOldValue,
            rt,
            config
          );
          handleEnterTouch(config);
        }, 400)
      );

      return true;
    });
  } catch (error) {
    console.error(error.message);
  }
}

export default painPerdu;
