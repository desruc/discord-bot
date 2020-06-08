import { BotConfig } from '../typings';

const config: BotConfig = {
  discordToken: process.env.DISCORD_TOKEN,
  name: process.env.BOT_NAME || 'XANATHAR',
  prefix: process.env.BOT_PREFIX || '.',
  modRole: process.env.MOD_ROLE || 'Dungeon Master',
  totalShards: process.env.TOTAL_SHARDS || 'auto'
};

export default config;
