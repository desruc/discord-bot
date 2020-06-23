import { Message } from 'discord.js';
import camelCase from 'lodash.camelcase';
import Bot from '../../core/bot';
import RPGCommand from '../../core/rpgCommand';

import { Items } from '../../constants/items';
import { IShopItem } from '../../typings';

export default class Buy extends RPGCommand {
  constructor() {
    super();
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
          `I'm not sure we stock that, ${member}. Please check the item name`
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
      client.logger.error('Error in the BUY command: ', error);
    }
  }
}
