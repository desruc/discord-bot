interface BotConfig {
  discordToken: string;
  botPrefix: string;
}

const config: BotConfig = {
  discordToken: process.env.DISCORD_TOKEN,
  botPrefix: process.env.BOT_PREFIX || '>'
};

export default config;
