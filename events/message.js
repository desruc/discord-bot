const {
  getTalkedRecently,
  checkCooldown,
  getCooldownMessage
} = require('../utils/cooldownHelpers');

const { getUserDatabaseRecord } = require('../utils/databaseHelpers');

const { incrementExperience } = require('../services/levelingService');

module.exports = async (client, message) => {
  const prefix = process.env.BOT_PREFIX;

  // If the author is a bot, return
  if (message.author.bot) return;
  // If the message was not sent in the server, return
  if (!message.guild) return;

  // Grab the users database entry for comamnds and experience
  const userRecord = await getUserDatabaseRecord(message.author.id);
  incrementExperience(message, userRecord);

  // No prefix - end process
  if (message.content.toLowerCase().indexOf(prefix) !== 0) return;

  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();

  // No command - end process
  if (cmd.length === 0) return;

  // Get the command by name or alias
  let command = client.commands.get(cmd);
  if (!command) command = client.commands.get(client.aliases.get(cmd));

  if (command) {
    // Immediate two and a half second cooldown to stop spam before database actions
    const talkedRecently = getTalkedRecently();
    if (talkedRecently.has(message.author.id))
      return message.reply(
        "I'm still working on your last request. Wait a second then try again."
      );
    talkedRecently.add(message.author.id);
    setTimeout(() => talkedRecently.delete(message.author.id), 2500);

    // Check if the command is on cooldown in the database before execution
    const { onCooldown, timeRemaining } = await checkCooldown(userRecord, command);
    if (onCooldown) return message.reply(getCooldownMessage(command, timeRemaining));

    // Execute the command
    command.run(client, message, args, userRecord);
  }
};
