require('dotenv').config();
import Bot from './core/bot';

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

bot.init();
