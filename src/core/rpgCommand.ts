import { Message, MessageEmbed } from 'discord.js';
import Bot from './bot';
import Command from './command';
import { IAvatar, IMonster } from '../typings';

import Avatar from '../database/models/avatarModel';

import { basicCreatures } from '../constants/monsters';
import { randomNumber, msToString } from '../utils/helpers';

export default class RPGCommand extends Command {
  public rpg = true;
  public guildOnly = true;
  public baseExp = 125;
  public levelExponent = 1.5;

  public async getUserAvatar(userId: string): Promise<IAvatar> {
    try {
      const result = await Avatar.findOne({ userId });

      if (!result) {
        const newRecord = await new Avatar({
          userId
        }).save();

        return newRecord;
      }

      return result;
    } catch (error) {
      console.error(`Error retrieving users (${userId}) avatar`);
      return null;
    }
  }

  public getExpForLevel(level: number): number {
    return Math.floor(this.baseExp * Math.pow(level, this.levelExponent));
  }

  public getBasicMonster(): IMonster {
    const name = basicCreatures[randomNumber(0, basicCreatures.length - 1)];
    const damage = randomNumber(10, 35);
    const coins = randomNumber(4, 18);
    const exp = randomNumber(5, 20);
    return {
      name,
      damage,
      coins,
      exp
    };
  }

  public checkCooldown(avatar: IAvatar, command: string): boolean {
    const { cooldowns } = avatar;
    const cooldownRecord = cooldowns.find((c) => c.command === command);
    if (cooldownRecord) {
      const { timestamp } = cooldownRecord;
      if (timestamp > Date.now()) {
        return true;
      }
    }
    return false;
  }

  public async updateCooldown(avatar: IAvatar, command: string): Promise<void> {
    try {
      const { cooldowns } = avatar;
      const cooldownRecord = cooldowns.find((c) => c.command === command);
      if (cooldownRecord) {
        await avatar.updateOne(
          { $set: { 'cooldowns.$[el].timestamp': Date.now() + this.cooldown } },
          { arrayFilters: [{ 'el.command': command }], new: true }
        );
      } else {
        await avatar.updateOne({
          $push: {
            cooldowns: {
              command: command,
              timestamp: Date.now() + this.cooldown
            }
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  private sendCooldownMessage(avatar: IAvatar, message: Message): Promise<Message> {
    try {
      const {
        member: { user, displayName },
        channel
      } = message;
      const { cooldowns } = avatar;
      const { timestamp } = cooldowns.find((c) => c.command === this.name);
      const remainingMs = timestamp - Date.now();

      const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setAuthor(`${displayName}`, user.avatarURL())
        .setDescription(
          `That command is on cooldown. Try again in **${msToString(remainingMs)}**`
        );

      return channel.send(embed);
    } catch (error) {
      console.log(error);
    }
  }

  public async execRpgCommand(
    client: Bot,
    message: Message,
    args: string[]
  ): Promise<Message | Array<Message> | void> {
    // Check if the command is on cooldown before executing
    if (this.cooldown > 0) {
      const {
        member: { id: userId }
      } = message;
      const avatar = await this.getUserAvatar(userId);

      const onCooldown = this.checkCooldown(avatar, this.name);
      if (onCooldown) return this.sendCooldownMessage(avatar, message);
      else this.updateCooldown(avatar, this.name);
    }

    return this.exec(client, message, args);
  }

  public async exec(
    client: Bot,
    message: Message,
    args: string[]
  ): Promise<Message | Array<Message> | void> {
    console.log('Message contents: ', message.content);
    console.log('Arguments: ', args);
  }
}
