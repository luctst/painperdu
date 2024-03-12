# Painperdu
---
## Project Name
  PainPerdu
## Description
  The **PainPerdu** package is made to find all yours lost routes.
  You can search any routes which contains the word or expression you will want to find.</br>
  The principle is the same as the game of hide and seek.
## Installation
  ```bash
  npm install painperdu
  ```
**lint**
```
npm run lint
```
**ts type check**
```
npm run typecheck
```
## Usage
  Single route :
  ```js
  // preview.tsx
  {
    path: '/',
    element: <div>Heree</div>
  },
  ```
  Route with children :
  ```js
  // preview.tsx
  {
    path: 'test',
    element: <div/>,
    children: [
      {
        path: ':id'
      },
      {
        path: 'user/:id'
      },
      {
        path: 'user/test/:test-id'
      },
      {
        path: 'user/test/:test-about'
      },
      {
      }
    ],
  },
  ```
## Props
  ```js
  <PainPerdu teleport="#popper-root" pathItems={ args } />
  ```
- **teleport** : The dom element where the modale will be displayed
- **pathItems** : Route's app / Router
## Author(s)
  [Lucas Tostée](https://github.com/luctst) </br>
  [Kévin Joya](kvin3324.github.io/kevinjoya/)
## Version
  v1
 ## Dependencies
  Eslint
  React
  React-dom
  React-router-dom
  Tailwindcss
  Typescript
  Vite
