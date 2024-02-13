import type { CommandHandler } from '../types';

interface Results {
  shouldCallFn: boolean;
};

export const useCommandManager = (eventCode: string, commandHandler: CommandHandler ): Results => {
	const obj = {
		Escape: () => {},
		KeyK : () => {}
	}

	if (commandHandler[eventCode as keyof typeof obj] === undefined) {
	   return {
			shouldCallFn: false,
		};
	};

	return {
	   shouldCallFn: true,
	};
}
