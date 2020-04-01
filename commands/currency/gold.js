const { getBotChannel, getMember, getUserDatabaseRecord } = require('../../helpers');

const showGold = async (client, message, args, userRecord) => {
  try {
    const { author, channel } = message;
    const botChannel = await getBotChannel(message.guild);

    if (channel !== botChannel && message.deletable) {
      message.delete();
    }

    const user = getMember(message, args[0]);

    let record = userRecord;
    const isAuthor = user.id === author.id;
    if (!isAuthor) record = await getUserDatabaseRecord(user.id);

    const { currency } = record;
    return botChannel.send(
      isAuthor ? `${author}, you have $${currency}!` : `${user} has $${currency}...`
    );
  } catch (error) {
    const { author } = message;
    const botChannel = await getBotChannel(message.guild);
    botChannel.send(`Sorry ${author}, there was a problem at the bank...`);
  }
};

module.exports = {
  name: 'gold',
  category: 'currency',
  description: 'check your own (or another users) gold stash',
  usage: '[user | id | mention]',
  aliases: ['coins', 'dosh', 'money', 'currency'],
  run: showGold
};
