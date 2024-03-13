# Painperdu
---
## Description
  The **PainPerdu** package is made to find all yours lost routes.
  You can search any routes which contains the word or expression you will want to find.</br>
  The principle is the same as the game of hide and seek but it's to find routes and not humans.
## Requirements
  **node >=18.x** </br>
  **pnpm** and not **npm** </br>
  **react** >= 18.x </br>
  **react-dom** >= 18.x </br>
  **react-router-dom** >= 6.x' </br>
## Installation
  ```bash
  pnpm install painperdu
  ```
**ts type check**
```
pnpm run typecheck
```
## Usage
You need to call :
```js
import PainPerdu from 'painperdu'
```
```js
  <PainPerdu teleport="#popper-root" pathItems={ path as Array<RouteItems> } />
```
**RouteItems** :
```js
  type RouteItems = RouteObject & {
    isSelected: boolean
    path: string | undefined
    isChildren?: boolean
    isEditable?: boolean;
    parentPath?: string;
  }
```
## Props
- **teleport** : The dom element where the modal will be displayed
- **pathItems** : Route's app / Router
## Author(s)
  [Lucas Tostée](https://github.com/luctst) </br>
  [Kévin Joya](kvin3324.github.io/kevinjoya/)
