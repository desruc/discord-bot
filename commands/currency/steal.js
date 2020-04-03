const { getBotChannel, randomNumber } = require('../../utils/helpers');
const { getUserDatabaseRecord } = require('../../utils/databaseHelpers');
const { transferFunds } = require('../../services/currencyService');

const steal = async (client, message) => {
  try {
    const { author, channel, mentions } = message;
    const botChannel = await getBotChannel(message.guild);

    if (channel !== botChannel && message.deletable) {
      message.delete();
    }

    const minGold = 500;
    const target = mentions.members.first();

    if (!target)
      return botChannel.send(`${author}, you gotta mention someone to steal from!!`);

    if (author.id === target.id)
      return botChannel.send(
        `${author}, it seems kinda pointless to steal from yourself...`
      );

    const targetRecord = await getUserDatabaseRecord(target.id);
    const { currency: targetGold } = targetRecord;

    if (targetGold < minGold)
      return botChannel.send(
        `${author}... ${target} only has $${targetGold}. Let them get a bit more before we hit em where it hurts.`
      );

    const canSteal = randomNumber(1, 100);
    let stealAmount = 0;
    let resultMsg = '';

    if (canSteal <= 50) {
      const punishAmount = targetGold * 0.1;
      await transferFunds(author, target, punishAmount);
      return botChannel.send(
        `Damn ${author}, you were caught! You've just paid ${target} $${punishAmount}`
      );
    } else if (canSteal > 50 && canSteal <= 80) {
      stealAmount = targetGold * 0.2;
      resultMsg = `${author}, you managed to grab $${stealAmount} before heading out the back door.`;
    } else if (canSteal > 80 && canSteal <= 90) {
      stealAmount = targetGold * 0.4;
      resultMsg = `${author}, you swiped $${stealAmount} out from right under their nose!`;
    } else {
      stealAmount = targetGold * 0.8;
      resultMsg = `${author}, you are one thieving muhfugga! You stole $${stealAmount}!!!`;
    }

    await transferFunds(target, author, stealAmount);
    return botChannel.send(resultMsg);
  } catch (error) {
    console.error('steal -> error', error);
  }
};

module.exports = {
  name: 'steal',
  category: 'currency',
  aliases: ['rob'],
  cooldown: 720 * 60 * 1000,
  description: 'attempt to steal someones gold',
  run: steal
};
