import { Message, MessageEmbed } from 'discord.js';
import Bot from '../../core/bot';
import RPGCommand from '../../core/rpgCommand';

import { Items } from '../../constants/items';

export default class Inventory extends RPGCommand {
  constructor() {
    super();
    this.name = 'inventory';
    this.category = 'rpg';
  }

  public async exec(client: Bot, message: Message): Promise<Message> {
    try {
      const { channel, member } = message;
      const { id: userId, displayName } = member;

      const avatar = await this.getUserAvatar(userId);
      const { inventory } = avatar;

      const entries = Object.entries(inventory).filter(
        ([key, value]) => key !== '$init' && value > 0
      );

      const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setDescription(`**${displayName}**'s inventory`);

      if (entries.length === 0) {
        embed.addField('Items', "There's nothing here!");
        return channel.send(embed);
      }

      let itemString = '';
      entries.forEach(([key, value], idx) => {
        const { name } = Items.find(
          (i) => i.name.replace(/\s/g, '').toLowerCase() === key.toLowerCase()
        );
        itemString += `**${name}**: ${value}`;
        if (idx !== entries.length - 1) itemString += '\n';
      });

      embed.addField('Items', itemString);

      return channel.send(embed);
    } catch (error) {
      client.logger.error('Error in the INVENTORY command: ', error);
    }
  }
}
