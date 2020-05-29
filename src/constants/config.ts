interface BotConfig {
  discordToken: string;
  botPrefix: string;
  modRole: string;
}

const config: BotConfig = {
  discordToken: process.env.DISCORD_TOKEN,
  botPrefix: process.env.BOT_PREFIX || '>',
  modRole: process.env.MOD_ROLE || 'IDDQD'
};

export default config;
