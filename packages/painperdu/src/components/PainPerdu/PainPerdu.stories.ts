import type { Meta, StoryObj } from "@storybook/react";
import { PainPerdu } from './painPerdu';
import type { PathItem } from '../../types'

const generateRoutes = (number: number): Array<Record<string, string | boolean>> => {
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
    pathItems: generateRoutes(100) as PathItem[],
  }
} satisfies Meta<typeof PainPerdu>;

type Story = StoryObj<typeof PainPerdu>;

export const Default: Story = {}
