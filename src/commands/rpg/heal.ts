import { Message } from 'discord.js';
import Bot from '../../core/bot';
import RPGCommand from '../../core/rpgCommand';

export default class Heal extends RPGCommand {
  constructor() {
    super();
    this.name = 'heal';
    this.category = 'rpg';
  }

  public async exec(client: Bot, message: Message): Promise<Message> {
    try {
      const { channel, member } = message;
      const { id: userId } = member;

      const avatar = await this.getUserAvatar(userId);
      const {
        hitPoints,
        maxHitPoints,
        inventory: { healthPotion }
      } = avatar;

      if (!healthPotion || healthPotion === 0)
        return channel.send(
          `${member}, you don't have any potions. Buy one from the shop!`
        );

      if (hitPoints === maxHitPoints)
        return channel.send(`${member}, you already have full health.`);

      await avatar.updateOne({
        $set: { hitPoints: maxHitPoints },
        $inc: { 'invtentory.healthPotion': -1 }
      });

      return channel.send(`${member}, your health has been restored.`);
    } catch (error) {
      client.logger.error('Error in the HEAL command: ', error);
    }
  }
}
