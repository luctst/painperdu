import type { Meta, StoryObj } from "@storybook/react";
import { PainPerduShad } from './PainPerduShad';

type Story = StoryObj<typeof PainPerduShad>;

export default {
  title: 'PainPerduShad',
  component: PainPerduShad,
} satisfies Meta<typeof PainPerduShad>;

export const Default: Story = {};
