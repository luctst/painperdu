import type { Meta, StoryObj } from "@storybook/react";
import PainPerduSearchBar from './PainPerduSearchBar';

export default {
  title: 'PainPerduSearchBar',
  component: PainPerduSearchBar,
  argTypes: {
    displayPathItems: {
      action: 'onChanged',
    },
  },
} satisfies Meta<typeof PainPerduSearchBar>

  type Story = StoryObj<typeof PainPerduSearchBar>;

export const Default: Story = {};
