import { BotConfig } from '../typings';

const config: BotConfig = {
  discordToken: process.env.DISCORD_TOKEN,
  name: process.env.BOT_NAME || 'XANATHAR',
  prefix: process.env.BOT_PREFIX || '.',
  modRole: process.env.MOD_ROLE || 'Dungeon Master',
  totalShards: process.env.TOTAL_SHARDS || 'auto',
  modChannel: process.env.MODE_CHANNEL || 'modz',
  roleSet: process.env.ROLE_SET || 'basic',
  enableRoles: true
};

export default config;
