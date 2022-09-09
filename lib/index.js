(function () {
  const config = {
    shortCutLaunchName: 'KeyK',
  };

  function logger(message) {
    if (!message) throw new Error('Message is not defined');
    throw new Error(message);
  }

  function checkConfig(routes) {
    if (!routes) return logger('Should enter routes as Array');
    if (!Array.isArray(routes)) return logger('Routes should be array');
    if (!window) return logger('Should be use in an web page');
    if (!document.querySelector('body')) return logger('Should define <body>');
  }

  function debounce(fn, delay) {
    let timeoutID = null;
    return function dbInner() {
      clearTimeout(timeoutID);
      const args = arguments;
      const that = this;
      timeoutID = setTimeout(() => fn.apply(that, args), delay);
    };
  }

  window.main = function (routes) {
    try {
      checkConfig(routes);
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
        const handleDebounce = debounce((inputValue) => {
          const inputValueFormated = inputValue.toLowerCase().trim();
          const arrayMatches = routes.filter((routeData) =>
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
        }, 200);
        inputSearch.addEventListener('keyup', (e) => handleDebounce(e.target.value));
      });
    } catch (error) {
      console.error(error.message);
    }
  };
})();
