const { getBotChannel, checkNumber } = require('../../utils/helpers');
const { transferFunds } = require('../../services/currencyService');
const { updateCooldown } = require('../../utils/cooldownHelpers');

const share = async (client, message, args, userRecord) => {
  try {
    const { channel, guild, mentions, author } = message;
    const botChannel = await getBotChannel(guild);

    if (channel !== botChannel && message.deletable) {
      message.delete();
    }

    const shareAmount = Number(args[0]);

    const isValidNumber = checkNumber(shareAmount);
    const noAmount = shareAmount <= 0;
    if (!isValidNumber || noAmount)
      return botChannel.send(
        `${author}, you gotta tell me how much to share! Stop fooling around.`
      );

    const { currency } = userRecord;
    if (shareAmount > currency)
      return botChannel.send(
        `${author} I can't pull money from thin air... you don't have that much to share.`
      );

    const recipient = mentions.members.first();
    if (!recipient)
      return botChannel.send(
        `${author} you damn fool! Who do you want to share with?`
      );
    if (recipient === author)
      return botChannel.send(`C'mon ${author}... you can't share with yourself...`);

    await updateCooldown(userRecord, command);

    // Everything checks out - update the database records
    await transferFunds(author, recipient, shareAmount);

    return botChannel.send(
      `Yo ${recipient}! Send your thanks to ${author}. They just gave you $${shareAmount}.`
    );
  } catch (error) {
    console.error('share -> error', error);
    const botChannel = await getBotChannel(message.guild);
    botChannel.send(`Damnnnn - there's a bug in the share command.`);
  }
};

const command = {
  name: 'share',
  category: 'currency',
  description: 'gift someone some cash!',
  cooldown: 10000,
  usage: 'number amount AND mention',
  example: 'arnie share 100 @username',
  aliases: ['give', 'donate'],
  run: share
};

module.exports = command;
