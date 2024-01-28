import type { Meta, StoryObj } from "@storybook/react";
import { PainPerdu } from './painPerdu';

export default {
  title: 'PainPerdu',
  component: PainPerdu,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    teleport: "#popper-root",
    pathItems: [
      {
        alias: 'hm',
        path: '/home',
        isSelected: false,
      },
      {
        alias: 'hq',
        path: '/qg',
        isSelected: false,
      },
      {
        alias: 'abt',
        path: '/about',
        isSelected: false,
      },
      {
        alias: 'ct',
        path: '/contact',
        isSelected: false,
      },
    ]
  }
} satisfies Meta<typeof PainPerdu>;

type Story = StoryObj<typeof PainPerdu>;

export const Default: Story = {}
