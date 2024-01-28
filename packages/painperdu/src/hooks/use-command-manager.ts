import type { CommandHandler } from '../types';

interface Results {
  shouldCallFn: boolean;
};

export const useCommandManager = (eventCode: string, commandHandler: CommandHandler ): Results => {
	if (commandHandler[eventCode] === undefined) {
	   return {
			shouldCallFn: false,
		};
	};

	return {
	   shouldCallFn: true,
	};
}
