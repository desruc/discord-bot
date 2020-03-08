const { purchaseItem } = require("../../services/robotService");
const { getBotChannel } = require("../../helpers");

const buy = async (client, message, args, userRecord) => {
  try {
    const { author } = message;
    const botChannel = await getBotChannel(message.guild);

    if (message.deletable) {
      message.delete();
    }

    const itemNumber = Number(args[0]);

    if (isNaN(itemNumber) || !isFinite(itemNumber))
      return botChannel.send(
        `${author}, you specify a number. Check the docs if you need help!`
      );

    if (itemNumber > 4 || itemNumber < 1)
      return botChannel.send(`${author}... don't take me for a fool.`);

    const purchased = await purchaseItem(userRecord, itemNumber);
    if (!purchased)
      return botChannel.send(`${author}, are you sure you can afford that?`);
    return botChannel.send(`Thanks for your business! Good luck out there!`);
  } catch (error) {
    console.error("Error purchasing item: ", error);
    const botChannel = await getBotChannel(message.guild);
    botChannel.send(
      `${author}, your purchase has not gone through... Please send your concerns to my master. `
    );
  }
};

module.exports = {
  name: "buy",
  category: "robots",
  description: "buy an item from the shop",
  aliases: ["purchase"],
  usage: "[number]",
  example: "arnie buy 1",
  run: buy
};
