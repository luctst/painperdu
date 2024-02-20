import type { Meta, StoryObj } from "@storybook/react";
import { PainPerduListItem } from './PainPerduListItem';

type Story = StoryObj<typeof PainPerduListItem>;

const defaultProps = {
  alias: '/alias-name',
  path: '/route-name',
};

export default {
  title: 'PainPerduListItem',
  component: PainPerduListItem,
  argTypes: {
    cursorUpdated: {
      action: 'onMouseEvent'
    }
  },
} satisfies Meta<typeof PainPerduListItem>;

export const ListItemNotSelected: Story = {
  name: 'List item not selected',
  args: {
    route: {
      ...defaultProps,
      isSelected: false,
    },
  },
};

export const ListItemSelected: Story = {
  name: 'List item selected',
  args: {
    route: {
      ...defaultProps,
      isSelected: true,
    },
  },
};
