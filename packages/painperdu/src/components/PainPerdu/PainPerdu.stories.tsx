import type { Meta, StoryObj } from "@storybook/react";
import { PainPerdu } from './painPerdu';
import type { PathItem } from '../../types'

const generateRoutes = (number: number): PathItem[] => {
  const routes = [];

  routes.push({
    alias: 'c',
    path: '/c',
    isSelected: false,
  });
  for(let i = 0; i < number; i++) {
    routes.push({
      alias: 'hm',
      path: '/home',
      isSelected: false,
    });
  }

  return routes;
}

export default {
  title: 'PainPerdu',
  component: PainPerdu,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    teleport: "#popper-root",
    pathItems: generateRoutes(100),
  },
} satisfies Meta<typeof PainPerdu>;

type Story = StoryObj<typeof PainPerdu>;

export const Default: Story = {
  decorators: [
    (Story, context) => {
      return (
        <>
          <div className="flex justify-center items-center h-full">
            <h1>Press <kbd>CMD</kbd> + <kbd>k</kbd> to open painperdu</h1>
          </div>
          <PainPerdu { ...context.args }/>
        </>
      );
    },
  ],
}
