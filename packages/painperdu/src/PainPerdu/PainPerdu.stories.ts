import { PainPerdu } from './painPerdu';

export default {
  title: 'Example/PainPerdu',
  component: PainPerdu,
  parameters: {
    layout: 'fullscreen',
  },
};

  export const CmdK = {
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
    },
  };
