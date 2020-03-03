const { checkForSwears, getUserDatabaseRecord } = require("../functions");
const {
  initializeLevelRoles,
  incrementExperience
} = require("../services/levelingService");
const censor = require("../commands/moderation/censor");

module.exports = async (client, message) => {
  const prefix = process.env.BOT_PREFIX;
  // If the author is a bot, return
  if (message.author.bot) return;
  // If the message was not sent in the server, return
  if (!message.guild) return;

  // Leveling system
  await initializeLevelRoles(message);

  const userRecord = await getUserDatabaseRecord(message.author.id);

  incrementExperience(message, userRecord);

  // If the message doesn't start with the prefix, return
  if (message.content.toLowerCase().indexOf(prefix) !== 0) return;

  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  let command = client.commands.get(cmd);
  if (!command) command = client.commands.get(client.aliases.get(cmd));

  if ((!command || cmd !== "say") && checkForSwears(message.content))
    return censor(client, message, args);

  if (command) command.run(client, message, args, userRecord);
};
