require('dotenv').config();
import Bot from './core/bot';
import initializeDb from './database/db';

const bot = new Bot({});

process.on('unhandledRejection', (e) => {
  console.log('UNHANDLED_REJECTION: ', e);
});

process.on('uncaughtException', (e) => {
  console.log('UNCAUGHT_EXCEPTION: ', e);
  console.log('NODE_WARN: ', {
    stack: 'Uncaught Exception detected. Restarting...'
  });
  process.exit(1);
});

const initialize = async (): Promise<Bot> => {
  await initializeDb(bot);
  return bot.init();
};

initialize();
