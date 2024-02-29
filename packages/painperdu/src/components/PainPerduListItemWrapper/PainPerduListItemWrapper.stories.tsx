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
