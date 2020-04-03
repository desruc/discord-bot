const { getBotChannel, getMember } = require('../../utils/helpers');
const { getRichestUsers } = require('../../services/currencyService');

const { RichEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');

const rich = async (client, message) => {
  try {
    const { channel, guild } = message;
    const botChannel = await getBotChannel(guild);

    if (channel !== botChannel && message.deletable) {
      message.delete();
    }

    const results = await getRichestUsers();
    const embed = new RichEmbed().setColor('RANDOM').setTitle('Richest Users');

    const emoji = {
      1: '💰 The Don',
      2: '🤑 Second in Command',
      3: '💎 Charge it to the game',
      4: '💅 Cashed up',
      5: '💸 Young entrepreneur'
    };

    results.forEach((doc, idx) => {
      const position = idx + 1;
      embed.addField(
        `** ${emoji[position]}**`,
        stripIndents`User: ${getMember(message, doc.userId)}
            Gold: ${doc.currency}`,
        false
      );
    });

    return botChannel.send(embed);
  } catch (error) {
    console.error('rich -> error', error);
    const botChannel = await getBotChannel(message.guild);
    botChannel.send(`Yikes! I can't get the calculate the richest users right now`);
  }
};

module.exports = {
  name: 'rich',
  category: 'currency',
  description: 'see the richest people on the server',
  run: rich
};
