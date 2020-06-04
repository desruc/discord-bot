import { BotConfig } from '../typings';

const config: BotConfig = {
  discordToken: process.env.DISCORD_TOKEN,
  name: process.env.BOT_NAME || 'SKYNET',
  prefix: process.env.BOT_PREFIX || '>',
  modRole: process.env.MOD_ROLE || 'IDDQD'
};

export default config;
