import { Message, MessageEmbed } from 'discord.js';
import RPGCommand from '../../core/rpgCommand';
import Bot from '../../core/bot';

export default class Stats extends RPGCommand {
  constructor() {
    super();
    this.name = 'stats';
    this.aliases = ['profile'];
    this.category = 'rpg';
  }

  public async exec(client: Bot, message: Message): Promise<void> {
    try {
      const {
        member: { id: userId, user, displayName }
      } = message;

      const avatar = await this.getUserAvatar(userId);

      const { hitPoints, maxHitPoints, armour, attack, level, exp, coins } = avatar;

      const requiredExp = this.getExpForLevel(level + 1);

      const percentProgress = Math.round((exp / requiredExp) * 100 * 10) / 10;

      const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setThumbnail(user.avatarURL())
        .setAuthor(`${displayName}'s avatar`, user.avatarURL())
        .addField(
          'Meta',
          `**Level:** ${level} (${percentProgress}%)
        **XP:** ${exp}/${requiredExp}
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
      client.logger.error('Error caught in the STATS command: ', error);
    }
  }
}
