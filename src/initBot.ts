import Bot from './core/bot';

const bot = new Bot({});

const initialize = async (): Promise<Bot> => {
  return bot.init();
};

initialize();
