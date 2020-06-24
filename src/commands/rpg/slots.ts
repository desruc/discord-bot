import { Message, MessageEmbed } from 'discord.js';
import Bot from '../../core/bot';
import RPGCommand from '../../core/rpgCommand';

import { randomNumber, isValidNumber } from '../../utils/helpers';

export default class Slots extends RPGCommand {
  constructor() {
    super();
    this.name = 'slots';
    this.category = 'rpg';
  }

  public async exec(
    client: Bot,
    message: Message,
    args: string[]
  ): Promise<Message> {
    try {
      const {
        channel,
        member: { id: userId, user, displayName }
      } = message;

      if (!args.length)
        return channel.send(
          `Try again **${displayName}**, but this time with a valid amount of coins`
        );

      const bettingAmount = args[0];

      if (!isValidNumber(bettingAmount))
        return channel.send(
          `I am no fool, ${displayName}. Enter a valid **number** of coins`
        );

      const avatar = await this.getUserAvatar(userId);
      const { coins } = avatar;

      if (Number(bettingAmount) > coins)
        return channel.send(
          `Enough funny business, **${displayName}**. Come back when you have enough coins.`
        );

      const icons = [
        {
          emoji: '💎',
          weight: 3,
          jackpot: 10
        },
        {
          emoji: '🦄',
          weight: 2,
          jackpot: 8
        },
        {
          emoji: '🌟',
          weight: 2,
          jackpot: 6
        },
        {
          emoji: '🧙‍♂️',
          weight: 1,
          jackpot: 4
        },
        {
          emoji: '🖖🏼',
          weight: 1,
          jackpot: 2
        }
      ];

      const turn = [];
      icons.forEach(() => {
        turn.push(icons[randomNumber(0, icons.length - 1)]);
      });

      const resultIconString = turn.map((t) => t.emoji).join('');

      const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setAuthor(`${displayName}'s slots`, user.avatarURL());

      const jackpot = turn.every((t) => t.emoji === turn[0].emoji);

      if (jackpot) {
        const winnings = Number(bettingAmount) * turn[0].jackpot;

        await avatar.updateOne({ $inc: { coins: winnings } });
        embed
          .setTitle('JACKPOT')
          .setDescription(`\nYou won **${winnings}** coins!\n\n${resultIconString}`)
          .setFooter("Let's see you do it again");
        return channel.send(embed);
      }

      const threeOfAKind = turn.find(
        (t) => turn.filter((j) => j.emoji === t.emoji).length >= 3
      );

      if (threeOfAKind) {
        const winnings = Number(bettingAmount) * threeOfAKind.weight;

        await avatar.updateOne({ $inc: { coins: winnings } });
        embed
          .setDescription(`\nYou won **${winnings}** coins!\n\n${resultIconString}`)
          .setFooter('See you next time!');
        return channel.send(embed);
      }

      await avatar.updateOne({ $inc: { coins: -Number(bettingAmount) } });
      embed
        .setDescription(
          `\nYou lost **${bettingAmount}** coins!\n\n${resultIconString}`
        )
        .setFooter('Better luck next time!');

      return channel.send(embed);
    } catch (error) {
      client.logger.error('Error caught in SLOTS command: ', error);
    }
  }
}
