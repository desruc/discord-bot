import { Client } from 'discord.js';
import schedule from 'node-schedule';

import morningTrivia from './trivia';

export default (client: Client) => {
  // Morning trivia
  schedule.scheduleJob('1 19 * * *', function () {
    client.guilds.cache.forEach((guild) => morningTrivia(client, guild));
  });
};
