import Bot from '../core/bot';
import { IEvent } from '../typings';
import { Message, MessageEmbed, TextChannel } from 'discord.js';

import User from '../database/models/userModel';

import { roles } from '../constants/roles';

export default class MessageEvent implements IEvent {
  readonly name = 'message';

  constructor(private client: Bot) {}

  private calculateMessageExp(message: Message): number {
    const { embeds, attachments } = message;
    const {
      config: { prefix }
    } = this.client;
    if (message.content.toLowerCase().indexOf(prefix) === 0) return 3;
    if (Array.from(attachments.values()).length > 0) return 21;
    if (embeds.length > 0) return 14;
    return 7;
  }

  private async incrementExperience(message: Message): Promise<void> {
    // Only grant experience for messages sent in a guild channel
    if (!message.guild) return;

    // Don't grant experience in the mod channel
    if ((message.channel as TextChannel).name === this.client.config.modChannel)
      return;

    const {
      member,
      guild: { id: guildId }
    } = message;

    const { id: userId } = member;
    const userRecord = await User.findOneAndUpdate(
      { userId, 'guilds.guildId': guildId },
      { $inc: { 'guilds.$.experience': this.calculateMessageExp(message) } },
      { new: true }
    ).lean();

    const { experience: userExp } = userRecord.guilds.find(
      (g) => g.guildId === guildId
    );

    const userLevel = this.calculateUserLevel(userExp);
    this.promoteMember(message, userLevel);
  }

  private getExpForLevel(level: number): number {
    let exp = 0;
    for (let i = 1; i < level; i++) {
      exp += i * 25;
    }
    return exp;
  }

  private calculateUserLevel(userExperience: number) {
    const levelRoles = roles.filter((r) => r.level !== undefined);

    // Calculate the exp for each level
    const levelMeta = [];
    for (let i = 0; i < levelRoles.length * 5; i++) {
      levelMeta.push({ level: i, exp: this.getExpForLevel(i) });
    }

    let userLevel = 0;
    levelMeta.forEach((l) => {
      if (userExperience >= l.exp) userLevel = l.level;
    });
    return userLevel;
  }

  private async promoteMember(message: Message, userLevel: number): Promise<void> {
    const { guild, member, channel } = message;

    const levelRoles = roles.filter((r) => r.level !== undefined);

    let roleName = '';
    levelRoles.forEach(({ level, name }) => {
      if (userLevel >= level) roleName = name;
    });

    const guildRole = guild.roles.cache.find((r) => r.name === roleName);

    if (guildRole) {
      const alreadyHasRole = member.roles.cache.has(guildRole.id);

      if (!alreadyHasRole) {
        try {
          await member.roles.add(guildRole.id);
          channel.send(
            `Congratulations **${member.displayName}**! You are now a ${guildRole.name}!`
          );
        } catch (error) {
          this.client.logger.error(
            `Error granting ${member.displayName} the ${guildRole.name} role on ${guild.name}: `,
            error
          );
        }
      }
    }
  }

  public exec(message: Message): any {
    // Ignore messages from bot
    if (message.author.bot) return;

    // Reward their contribution with some chat exp!
    this.incrementExperience(message);

    // No prefix - no comprende
    const {
      config: { prefix }
    } = this.client;
    if (message.content.toLowerCase().indexOf(prefix) !== 0) return;

    return this.client.commandHandler.handleCommand(message);
  }
}
