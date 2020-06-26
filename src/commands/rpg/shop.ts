import { Message, MessageEmbed } from 'discord.js';
import Bot from '../../core/bot';
import RPGCommand from '../../core/rpgCommand';

export default class Shop extends RPGCommand {
  constructor() {
    super();
    this.name = 'shop';
    this.category = 'rpg';
  }

  public async exec(client: Bot, message: Message): Promise<Message> {
    try {
      const { channel } = message;

      const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setDescription('**Buy an item buy using** `.buy [item]`')
        .addField('Items', '`health potion` - restores your HP (20 coins)', false);

      return channel.send(embed);
    } catch (error) {
      client.logger.error('Error caught in the SHOP command: ', error);
    }
  }
}
