import type { Meta, StoryObj } from "@storybook/react";
import PainPerduListItemWrapper from './PainPerduListItemWrapper';
import { router } from '../../../.storybook/preview';

type Story = StoryObj<typeof PainPerduListItemWrapper>;

export default {
  title: 'PainPerduListItemWrapper',
  component: PainPerduListItemWrapper,
  args: {
    items: router.routes,
  },
} satisfies Meta< typeof PainPerduListItemWrapper>

export const Default: Story = {};
