import type { Meta, StoryObj } from "@storybook/react";
import PainPerduListItemWrapper from './PainPerduListItemWrapper';
import * as PainPerduStories from '../PainPerdu/PainPerdu.stories';

type Story = StoryObj<typeof PainPerduListItemWrapper>;

export default {
  title: 'PainPerduListItemWrapper',
  component: PainPerduListItemWrapper,
  args: {
    items: PainPerduStories.default.args.pathItems,
  },
} satisfies Meta< typeof PainPerduListItemWrapper>

export const Default: Story = {};
