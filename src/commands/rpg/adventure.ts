import { Message } from 'discord.js';
import RPGCommand from '../../core/rpgCommand';
import Bot from '../../core/bot';

export default class Adventure extends RPGCommand {
  constructor() {
    super();
    this.name = 'adventure';
    this.category = 'rpg';
    this.cooldown = 1000 * 60 * 60;
  }

  public async exec(client: Bot, message: Message): Promise<Message> {
    try {
      const {
        member: { id: userId, displayName }
      } = message;

      const avatar = await this.getUserAvatar(userId);
      const monster = this.getMonster('adventure');

      // Check if user survived
      const { hitPoints, level, exp, maxHitPoints } = avatar;
      const { name, damage, coins, exp: monsterExp } = monster;

      if (damage > hitPoints) {
        const backToBase = level - 1 === 0;
        if (backToBase) {
          // User is back to the base avatar stats
          this.resetAvatar(avatar);
        } else {
          // Set the users stats to previous level
          this.removeLevel(avatar);
        }

        const failureMessage = `**${displayName}** found a **${name}** but died fighting it!\nYou've lost a level. Don't forget to heal after fights!`;
        return message.channel.send(failureMessage);
      }

      let responseMsg = `**${displayName}** found and killed a ${name}!\nGained ${monsterExp} exp and ${coins} coins\nLost ${damage} HP, remaining HP ${
        hitPoints - damage
      }/${maxHitPoints}`;

      const updatedExp = exp + monsterExp;
      const hasLeveled = updatedExp >= this.getExpForLevel(level + 1);

      if (hasLeveled) {
        responseMsg += `\nThey are now **Level ${level + 1}**`;
        await avatar.updateOne({
          $set: {
            exp: updatedExp - this.getExpForLevel(level + 1)
          },
          $inc: {
            level: 1,
            coins,
            hitPoints: -damage,
            maxHitPoints: 5,
            attack: 1,
            armour: 1
          }
        });
      } else {
        await avatar.updateOne({
          $inc: { exp: monsterExp, coins, hitPoints: -damage }
        });
      }

      return message.channel.send(responseMsg);
    } catch (error) {
      client.logger.error('Error caught in the ADVENTURE command: ', error);
    }
  }
}
