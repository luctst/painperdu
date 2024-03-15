## Why
"Pain perdu," from the French words "[pain perdu](https://fr.wikipedia.org/wiki/Pain_perdu)," which means "lost bread," is a bread recipe. It is a React component built with Tailwind and TypeScript that allows you to quickly navigate between your React routes.

## Requirements
* NodeJs - **>=18.x**
* Tailwindcss
* npm - **>7.x**

## Install
```
npm i painperdu
```

## Usage
> ❗Before starting to use pain perdu, you must have completed the Tailwind CSS configuration. Check this link to install Tailwind CSS with the correct framework: https://tailwindcss.com/docs/installation/framework-guides. Then, make sure to add this line in order for Tailwind to inject the styles into pain perdu.

```js
module.exports = {
  content: [
    './components/**/*.{html,js}',
    './pages/**/*.{html,js}',
    './node_modules/painperdu/dist/*.{js,cjs,mjs}',
  ],
}
```

*Depending on your configuration, you may have some issues with paths. In this case, check this Tailwind config paths: [Tailwind CSS Configuration Paths](https://tailwindcss.com/docs/content-configuration#using-relative-paths)*

Use "PainPerdu" as the top-level component in your app. Then, press `CMD` + `K` on Mac or `CTRL` + `K` on Windows to trigger the PainPerdu modal.

```jsx
import { PainPerdu } from 'painperdu';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Home</div>
  },
  {
    path: '/user',
    element: <div>User</div>,
    children: [
      {
        path: ':id',
        element: <div>User :id</div>
      },
    ],
  },
  {
    path: '/contact',
    element: <div>Contact</div>
  },
]);

return (
  <PainPerdu teleport="#html-id" routes={router.routes}/> // Press CMD(on mac) or CTRL(on windows) + k to open PainPerdu
  // Other JSX, Components..
);
```

## Props

**teleport**
Type: `string`
HTML id and HTML class to pass in `document.querySelector` when passing into the `createPortal` function.

**routes**
Type: `Array<RouteObject>`
Array of `RouteObject` from `react-router-dom`.


## Contributing
Contributions to painperdu are always welcome!
* 📥 Pull requests and 🌟 Stars are always welcome.
* Read our [contributing](https://github.com/luctst/painperdu/blob/master/.github/CONTRIBUTING.md) guide to get started,

### Install
```
pnpm i
```

### Development scripts
painperdu is organized as a monorepo with pnpm. Useful scripts include:

**pnpm run dev**
> Runs a sandbox template storybook with all painperdu stories.

## Licence
[MIT](https://github.com/luctst/painperdu/blob/master/LICENSE)

## Authors:
* [Tostee Lucas](https://github.com/luctst)
* [Joya Kévin](https://github.com/Kvin3324)
