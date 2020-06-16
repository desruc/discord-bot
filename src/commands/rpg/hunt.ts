import { Client, Message, MessageEmbed } from 'discord.js';
import RPGCommand from '../../core/rpgCommand';

export default class Hunt extends RPGCommand {
  constructor() {
    super();
    this.name = 'hunt';
    this.category = 'rpg';
    this.cooldown = 1000 * 60 * 3;
  }

  public async exec(client: Client, message: Message): Promise<void> {
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
      const updatedExp = this.getExpForNextLevel(currentLevel - 1);
      // TODO: Set max health after death
      await avatar.updateOne({ exp: updatedExp, hitPoints: maxHitPoints });
      const failureMessage = `**${displayName}** found a **${name}** but died fighting it!\nYou've lost a level. Don't forget to heal after fights!`;
      message.channel.send(failureMessage);
      return;
    }

    await avatar.updateOne({ $inc: { exp: monsterExp, coins, hitPoints: -damage } });

    let responseMsg = `**${displayName}** found and killed a ${name}!\nGained ${monsterExp} exp and ${coins} coins\nLost ${damage} HP, remaining HP ${
      hitPoints - damage
    }/${maxHitPoints}`;

    // Check if user leveled up
    if (exp + monsterExp > nextLevelExp)
      responseMsg += `\nThey are now **Level ${currentLevel + 1}**`;

    message.channel.send(responseMsg);

    // TODO: Cooldowns
  }
}
