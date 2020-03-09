const { getBotChannel, checkNumber } = require("../../helpers");

const gamble = async (client, message, args, userRecord) => {
  try {
    const { author, channel } = message;
    const { currency } = userRecord;
    const botChannel = await getBotChannel(message.guild);

    if (channel !== botChannel && message.deletable) {
      message.delete();
    }

    const bet = Number(args[0]);
    const isValid = checkNumber(bet);
    if (!isValid)
      return botChannel.send(
        `${author}, why are you like this? Enter a valid bet.`
      );

    const hasMoney = currency > bet;
    if (!hasMoney)
      return botChannel.send(
        `Nice try ${author}! Come back when you have enough cash...`
      );

    const putItOn = args[1];
    const number = checkNumber(Number(putItOn));
    if (number) {
      if (number < 37 && number > 0) {
        // Bets on
      } else
        return botChannel.send(
          `${author}, have you ever played roulette? You must choose a number below 37 and above 0 or specify even or odd`
        );
    } else {
      const validString = putItOn === "odd" || putItOn === "even";
      if (validString) {
        // Bets on
      } else
        return botChannel.send(`${author} - come back when you're serious...`);
    }
  } catch (error) {
    const { author } = message;
    const botChannel = await getBotChannel(message.guild);
    botChannel.send(`Sorry ${author}, the casino is closed for maintenance...`);
  }
};

module.exports = {
  name: "gamble",
  category: "robots",
  description: "gamble your currency for a chance to win big",
  aliases: ["bet", "roulette"],
  run: gamble
};
