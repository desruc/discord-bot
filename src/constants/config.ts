export interface BotConfig {
  name: string;
  totalShards: string;
  discordToken: string;
  prefix: string;
}

const config = {
  discordToken: process.env.DISCORD_TOKEN,
  name: process.env.BOT_NAME || 'KING CROC',
  prefix: process.env.BOT_PREFIX || '.',
  totalShards: process.env.TOTAL_SHARDS || 'auto'
};

export default config;
