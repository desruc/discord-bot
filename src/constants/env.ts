interface EnviromentVariables {
  discordToken: string;
  botPrefix: string;
}

const env: EnviromentVariables = {
  discordToken: process.env.DISCORD_TOKEN,
  botPrefix: process.env.BOT_PREFIX || '>'
};

export default env;
