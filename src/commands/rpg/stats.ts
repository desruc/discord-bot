import { Client, Message, MessageEmbed } from 'discord.js';
import RPGCommand from '../../core/rpgCommand';

export default class Stats extends RPGCommand {
  constructor() {
    super();
    this.name = 'stats';
    this.category = 'rpg';
  }

  public async exec(client: Client, message: Message): Promise<void> {
    try {
      const {
        member: { id: userId, user, displayName },
        guild: { id: guildId }
      } = message;

      const avatar = await this.getUserAvatar(userId, guildId);

      const { hitPoints, maxHitPoints, armour, attack, exp, coins } = avatar;

      const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setThumbnail(user.avatarURL())
        .setAuthor(`${displayName}'s avatar`, user.avatarURL())
        .addField(
          'Meta',
          `**Level:** TODO
        **XP:** ${exp}/
        `
        )
        .addField(
          'Stats',
          `**HP:** ${hitPoints}/${maxHitPoints}
        **DEF:** ${armour}
        **ATT:** ${attack}`
        )
        .addField('Inventory', `**Coins:** ${coins}`);

      message.channel.send(embed);
    } catch (error) {
      console.log(error);
    }
  }
}
