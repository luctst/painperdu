import type { Meta, StoryObj } from "@storybook/react";
import { PainPerdu } from './painPerdu';

export default {
  title: 'PainPerdu',
  render: (args) => <PainPerdu teleport="#popper-root" pathItems={args}/>,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof PainPerdu>;

type Story = StoryObj<typeof PainPerdu>;

export const Default: Story = {
  decorators: [
    (_Story, context) => {
      return (
        <>
          <div className="flex justify-center items-center h-full">
            <h1>Press <kbd>CMD</kbd> + <kbd>k</kbd> to open painperdu</h1>
          </div>
          <_Story { ...context.args }/>
        </>
      );
    },
  ],
}
