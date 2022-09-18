/* eslint-env browser */
import '@/scss/main.scss';
import { Route, FinalConfig, Config, Nullable } from '@/types/index';

const isObject = (obj: object): boolean => obj === Object(obj);
const objectHasProperty = (obj: object, key: string): boolean | never => {
  if (!obj || !key) 
    throw new TypeError('Params error');
  if (!isObject(obj) || typeof key !== 'string')
    throw new TypeError('Params format error');

  return Object.prototype.hasOwnProperty.call(obj, key);
}
const isInstanceHtmlElement = (object: any): object is HTMLElement => object;

function checkRoutes(routes: Array<Route>): Array<Route> | never {
  if (!window) 
    throw new Error('Should be use in an web page');

  if (
    !routes ||
    !Array.isArray(routes) ||
    !routes.length
  ) 
    throw new Error('Routes must be defined and be array and includes objects');

  const routesObjectIsGood: boolean = routes.every((routesData) => {
    if (!isObject(routesData)) return false;
    if (!objectHasProperty(routesData, 'path') || !objectHasProperty(routesData, 'label')) return false;
    return true;
  });

  if (!routesObjectIsGood)
    throw new Error('Data passed in routes parameters must be object and includes at least path and label fields');
  return [ ...routes ];
}

function debounce(fn: (event: string) => boolean, delay: number): () => void {
  let timeoutID: number | Nullable<null> = null;
  return function dbInner() {
    clearTimeout(timeoutID);
    const that = this;
    timeoutID = setTimeout(function() {fn.apply(that, arguments), delay});
  };
}

function createConfig(mainContainer, ops: FinalConfig): FinalConfig {
  if (!isInstanceHtmlElement(mainContainer))
    throw new Error('mainContainer should be an HTML Element');

  const defaultConfig: FinalConfig = {
    shortCutLaunchName: 'KeyK',
    mainContainer,
    originURL: window.location.origin,
  };

  if (!ops) return { ...defaultConfig};
  const opsFormated: Config = ['shortCutLaunchName'].reduce(
    (prev, next) => {
      const toReturn = { ...prev };
      if (ops[next]) toReturn[next] = ops[next];
      return toReturn;
    },
    {}, 
  );

  return {
    ...defaultConfig,
    ...opsFormated,
  };
};

function main(routes: Route[], container: HTMLElement, ops: FinalConfig): void {
  try {
    const rt = checkRoutes(routes);
    const config = createConfig(container, ops);
    
    window.addEventListener('keydown', (e) => {
      if (!e.metaKey || e.code !== config.shortCutLaunchName) return false;
      const section = document.createElement('section');

      section.setAttribute('class', 'container');
      section.setAttribute('id', 'painperdu');
      section.setAttribute('style', 'height:100vh;width:100vw');

      section.innerHTML = `
          <form class="border border-primary w-50 p-3 painperdu__form"
          style="position:absolute;top:50%;left:50%;transform:translate(-50%, -50%)">
              <div class="form-floating">
                  <input type="email" class="form-control" id="searchRoutes" aria-describedby="emailHelp" placeholder="Search for routes">
                  <label for="searchRoutes">Search for routes</label>
              </div>        
          </form>
      `;
      document.body.appendChild(section);
      const inputSearch = document.getElementById('searchRoutes');
      const handleDebounce: (inputValue: string) => void = debounce((inputValue) => {
        const inputValueFormated = inputValue.toLowerCase().trim();
        const arrayMatches = rt.filter((routeData) =>
          routeData.label.toLowerCase().trim().includes(inputValueFormated)
        );

        if (document.querySelector('.list-group')) {
          document
            .querySelector('.painperdu__form')
            .removeChild(document.querySelector('.list-group'));
        }

        const ul = document.createElement('ul');
        ul.setAttribute('class', 'list-group');
        document.querySelector('.painperdu__form').appendChild(ul);

        if (!arrayMatches.length) {
          const liEmpty = document.createElement('li');
          liEmpty.setAttribute('class', 'list-group-item');
          liEmpty.textContent = 'Oups no routes is matching';
          ul.appendChild(liEmpty);
          return false;
        }

        arrayMatches.forEach((el) => {
          const li = document.createElement('li');
          li.setAttribute('class', 'list-group-item d-flex');

          li.innerHTML = `<a href="${el.path}">${el.label}</a>`;
          ul.appendChild(li);
        });

        return true;
      }, 200);

      inputSearch.addEventListener('keyup', (evt) => {
        const target = evt.target as HTMLInputElement;
        handleDebounce(target.value);
      });
      return true;
    });
  } catch (error) {
    console.error(error.message);
  }
}

export default main;
