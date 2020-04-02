const { getBotChannel } = require('../../utils/helpers');
const { grantDailyGold } = require('../../services/currencyService');

const streak = async (client, message, args, userRecord) => {
  try {
    const { author, channel } = message;
    const botChannel = await getBotChannel(message.guild);

    if (channel !== botChannel && message.deletable) {
      message.delete();
    }

    const {
      daily: { streak, timestamp }
    } = userRecord;
    if (!timestamp || Date.now() - timestamp > 172800000) {
      // 24 hours, 2 days because one-day cooldown
      const baseAmount = 1000 * 0.1;
      await grantDailyGold(userRecord, 1, baseAmount);
      if (!timestamp)
        return botChannel.send(
          `${author}, the only way to go is up! You've scored $${baseAmount} and started a streak.`
        );
      return botChannel.send(
        `You slipped up ${author}! Your streak has been reset and you've only earned $${baseAmount} today.`
      );
    } else {
      const updatedStreak = streak + 1;
      const amount = 1000 * 0.1 * updatedStreak;
      await grantDailyGold(userRecord, updatedStreak, amount);
      return botChannel.send(
        `Yewwwww!!! Keep it up ${author}... your streak is at ${updatedStreak} and I've just added $${amount} to your account.`
      );
    }
  } catch (error) {
    console.error("streak -> error", error)
    const botChannel = await getBotChannel(message.guild);
    botChannel.send(`Damnnnn - there's a bug in the streak command.`);
  }
};

module.exports = {
  name: 'daily',
  category: 'currency',
  description: 'get a daily streak going and earn yourself some serious dough!',
  cooldown: 24 * (60 * 60 * 1000),
  aliases: ['quest'],
  run: streak
};
