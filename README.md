# Painperdu
---
## Description
  The **PainPerdu** package is made to find all yours lost routes.
  You can search any routes which contains the word or expression you will want to find.
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
## Contribution
In the `preview.tsx` file you can add : </br>
  *=> single route*
  ```js
  {
    path: 'hello',
    element: <div />
  },
  ```
  *=> route with children*
  ```js
  {
    path: 'login',
    element: <div/>,
    children: [
      {
        path: ':id'
      },
      {
        path: 'login/:id'
      },
      {
        path: 'login/test/:test-id'
      },
      {
        path: 'login/test/:test-about'
      },
    ],
  },
  ```
  To add a story, you need to create a folder in `/packages/painperdu/src/components`
  You can follow this example :
  ```js
  import type { Meta, StoryObj } from "@storybook/react";
  import PainPerduListItemWrapper from './PainPerduListItemWrapper';
  import type { RouteItems } from '../../types'
  import { router } from '../../../.storybook/preview';

  type Story = StoryObj<typeof PainPerduListItemWrapper>;

  export default {
    title: 'PainPerduListItemWrapper',
    component: PainPerduListItemWrapper,
    args: {
      items: router.routes as RouteItems[],
    },
  } satisfies Meta< typeof PainPerduListItemWrapper>

  export const Default: Story = {};
  ```
## Author(s)
  [Lucas Tostée](https://github.com/luctst) </br>
  [Kévin Joya](kvin3324.github.io/kevinjoya/)
