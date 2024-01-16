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
        },
        {
          alias: 'hq',
          path: '/qg',
        },
        {
          alias: 'abt',
          path: '/about',
        },
        {
          alias: 'ct',
          path: '/contact',
        },
      ]
    },
  };
