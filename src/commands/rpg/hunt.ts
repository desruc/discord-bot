import { Client, Message, MessageEmbed } from 'discord.js';
import RPGCommand from '../../core/rpgCommand';

export default class Hunt extends RPGCommand {
  constructor() {
    super();
    this.name = 'hunt';
    this.category = 'rpg';
    this.cooldown = 1000 * 60 * 3;
  }

  public async exec(client: Client, message: Message): Promise<Message> {
    const {
      member: { id: userId, displayName }
    } = message;

    const avatar = await this.getUserAvatar(userId);
    const monster = this.getBasicMonster();

    // Check if user survived
    const { hitPoints, exp, maxHitPoints } = avatar;
    const { name, damage, coins, exp: monsterExp } = monster;

    const currentLevel = this.getCurrentLevel(exp);
    const nextLevelExp = this.getExpForNextLevel(currentLevel);

    if (damage > hitPoints) {
      const backToBase = currentLevel - 1 === 0;
      const updatedExp = this.getExpForNextLevel(currentLevel - 1);
      if (backToBase) {
        // User is back to the base avatar stats
        await avatar.updateOne({
          exp: updatedExp,
          hitPoints: 100,
          attack: 1,
          armour: 1,
          maxHitPoints: 100
        });
      } else {
        // Set the users stats to previous level
        const updatedMaxHitPoints = maxHitPoints - 5;
        await avatar.updateOne({
          $set: {
            exp: updatedExp,
            hitPoints: updatedMaxHitPoints,
            maxHitPoints: updatedMaxHitPoints
          },
          $inc: { attack: -1, armour: -1 }
        });
      }

      const failureMessage = `**${displayName}** found a **${name}** but died fighting it!\nYou've lost a level. Don't forget to heal after fights!`;
      return message.channel.send(failureMessage);
    }

    let responseMsg = `**${displayName}** found and killed a ${name}!\nGained ${monsterExp} exp and ${coins} coins\nLost ${damage} HP, remaining HP ${
      hitPoints - damage
    }/${maxHitPoints}`;

    const hasLeveled = exp + monsterExp > nextLevelExp;

    if (hasLeveled) {
      responseMsg += `\nThey are now **Level ${currentLevel + 1}**`;
      await avatar.updateOne({
        $inc: {
          exp: monsterExp,
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
  }
}
