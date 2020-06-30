import { Message } from 'discord.js';
import camelCase from 'lodash.camelcase';
import Bot from '../../core/bot';
import RPGCommand from '../../core/rpgCommand';

import { Items } from '../../constants/items';
import { IShopItem } from '../../typings';

export default class Buy extends RPGCommand {
  constructor(client: Bot) {
    super(client);
    this.name = 'buy';
    this.category = 'rpg';
  }

  public async exec(
    client: Bot,
    message: Message,
    args: string[]
  ): Promise<Message> {
    try {
      const { channel, member } = message;
      const { id: userId } = member;

      const item: IShopItem = Items.find(
        (i) => i.name.toLowerCase() === args.join(' ').toLowerCase()
      );

      if (!item)
        return channel.send(
          `We don't stock that, ${member}. Please view our items by using ` +
            '`' +
            `${client.config.prefix}shop` +
            '`'
        );

      const avatar = await this.getUserAvatar(userId);
      const { coins } = avatar;
      const { name, cost, addToInventory } = item;

      if (cost > coins) {
        const priceDiff = cost - coins;
        return channel.send(
          `You can't afford that ${member}. Come back when you have ${priceDiff} more coins!`
        );
      }

      if (addToInventory) {
        const $inc = { coins: -cost };
        $inc['inventory.' + camelCase(name)] = 1;
        await avatar.updateOne(
          {
            $inc
          },
          { upsert: true }
        );
        return channel.send(
          `${member}, you succesfully bought ` +
            '`' +
            name +
            '`' +
            ` for ${cost} coins.`
        );
      }
    } catch (error) {
      client.logger.error('Error caught in the BUY command: ', error);
    }
  }
}
