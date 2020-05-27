import { Message } from 'discord.js';

const run = (message: Message) => {
  message.reply('noot!');
};

const noot = {
  name: 'noot',
  run
};

export default noot;
