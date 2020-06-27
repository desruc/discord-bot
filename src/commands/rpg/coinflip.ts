import { Message, MessageEmbed } from 'discord.js';
import Bot from '../../core/bot';
import RPGCommand from '../../core/rpgCommand';

import { randomNumber, isValidNumber } from '../../utils/helpers';

export default class CoinFlip extends RPGCommand {
  constructor() {
    super();
    this.name = 'coinflip';
    this.aliases = ['cf'];
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
          `**${displayName}**, you must choose heads/tails and specify a valid amount of coins`
        );

      const choice = args[0];
      const bettingAmount = Math.floor(Number(args[1]));

      const acceptedArgs = ['h', 't', 'heads', 'tails'];

      if (!acceptedArgs.some((a) => a === choice))
        return channel.send(
          `**${displayName}**, the correct way to use this command is ` +
            '`' +
            client.config.prefix +
            'coinflip [h/t] [coins]' +
            '`'
        );

      if (!isValidNumber(bettingAmount))
        return channel.send(
          `**${displayName}**... Enter a valid **number** of coins next time`
        );

      const avatar = await this.getUserAvatar(userId);
      const { coins } = avatar;

      if (bettingAmount > coins)
        return channel.send(
          `**${displayName}**. Come back when you have enough coins.`
        );

      const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setAuthor(`${displayName}'s coinflip`, user.avatarURL());

      const rand = randomNumber(1, 10);
      const heads = ['h', 'heads'].some((a) => a === choice) && rand % 2 === 0;
      const tails = ['t', 'tails'].some((a) => a === choice) && rand % 2 !== 0;

      if (heads || tails) {
        await avatar.updateOne({ $inc: { coins: bettingAmount } });
        embed
          .setDescription(`\nIt was ${heads ? '**heads**' : '**tails**'}!`)
          .setFooter(`You won ${bettingAmount} coins`);
        return channel.send(embed);
      }

      await avatar.updateOne({ $inc: { coins: -bettingAmount } });
      embed
        .setDescription(`\nIt was ${rand % 2 === 0 ? '**heads**' : '**tails**'}!`)
        .setFooter(`You lost ${bettingAmount} coins`);
      return channel.send(embed);
    } catch (error) {
      client.logger.error('Error caught in the COINFLIP command: ', error);
    }
  }
}
