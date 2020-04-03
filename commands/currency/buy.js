const { purchaseItem } = require('../../services/robotService');
const { getBotChannel, checkNumber } = require('../../utils/helpers');

const buy = async (client, message, args, userRecord) => {
  try {
    const { author, channel } = message;
    const botChannel = await getBotChannel(message.guild);

    if (channel !== botChannel && message.deletable) {
      message.delete();
    }

    const itemNumber = Number(args[0]);
    const quantity = Number(args[1]) || 1;

    if (!checkNumber(itemNumber))
      return botChannel.send(`${author}, you didn't specify an item number.`);

    if (itemNumber > 4 || itemNumber < 1)
      return botChannel.send(`${author}... don't take me for a fool.`);

    const purchased = await purchaseItem(userRecord, itemNumber, quantity);
    if (!purchased)
      return botChannel.send(`${author}, are you sure you can afford that?`);
    return botChannel.send(
      `Thanks for your business ${author}! Good luck out there!`
    );
  } catch (error) {
    console.error('Error purchasing item: ', error);
    const { author } = message;
    const botChannel = await getBotChannel(message.guild);
    botChannel.send(
      `${author}, your purchase has not gone through... Please send your concerns to my master. `
    );
  }
};

module.exports = {
  name: 'buy',
  category: 'currency',
  description: 'buy an item from the shop',
  aliases: ['purchase'],
  usage: '[number]',
  example: 'arnie buy 1',
  run: buy
};
