const { getBotChannel, checkNumber, randomNumber } = require('../../utils/helpers');
const { updateCooldown } = require('../../utils/cooldownHelpers');

const gamble = async (client, message, args, userRecord) => {
  try {
    const { author, channel } = message;
    const { currency } = userRecord;
    const botChannel = await getBotChannel(message.guild);

    if (channel !== botChannel && message.deletable) {
      message.delete();
    }

    // Check if the supplied argument is valid
    const bet = Number(Math.floor(args[0]));
    const isValid = checkNumber(bet) && bet > 0;
    if (!isValid)
      return botChannel.send(`${author}, why are you like this? Enter a valid bet.`);

    // Check the user has money
    const hasMoney = currency >= bet;
    if (!hasMoney)
      return botChannel.send(
        `Nice try ${author}! Come back when you have enough cash...`
      );

    //
    const putItOn = args[1];
    const number = checkNumber(Number(putItOn));
    const rand = randomNumber(1, 10);

    if (number) {
      // Number bet
      const validNumber = Number(putItOn) <= 10 && Number(putItOn) > 0;

      if (!validNumber)
        return botChannel.send(
          `${author}, You must choose a number between 1-10 or specify even or odd.`
        );

      await updateCooldown(userRecord, command);

      if (Number(putItOn) === rand) {
        await userRecord.updateOne({ $inc: { currency: bet * 10 } });
        return botChannel.send(`Nicely done ${author}! You've won $${bet * 10}`);
      } else {
        await userRecord.updateOne({ $inc: { currency: -bet } });
        return botChannel.send(
          `Better luck next time ${author}! The number was ${rand}.`
        );
      }
    } else {
      // Odd or Even
      const validString = putItOn === 'odd' || putItOn === 'even';
      if (!validString)
        return botChannel.send(`${author} - come back when you're serious...`);

      await updateCooldown(userRecord, command);

      const evenSuccess = putItOn === 'even' && rand % 2 === 0;
      const oddSuccess = putItOn === 'odd' && rand % 2 !== 0;
      if (evenSuccess || oddSuccess) {
        await userRecord.updateOne({ $inc: { currency: bet } });
        return botChannel.send(
          `Congratulations ${author}! The number was ${rand} and you've won $${bet}.`
        );
      } else {
        await userRecord.updateOne({ $inc: { currency: -bet } });
        return botChannel.send(`Unlucky ${author}! The number was ${rand}.`);
      }
    }
  } catch (error) {
    console.log('gamble -> error', error);
    const { author } = message;
    const botChannel = await getBotChannel(message.guild);
    botChannel.send(`Sorry ${author}, the casino is closed for maintenance...`);
  }
};

const command = {
  name: 'gamble',
  category: 'currency',
  cooldown: 5000,
  description:
    'gamble your currency for a chance to win big. takes two arguments, your bet and what you bet on (either odd/even or 1-10).',
  aliases: ['bet'],
  example: '[arnie bet 1000 even] OR [arnie bet 10 4]',
  run: gamble
};

module.exports = command;
