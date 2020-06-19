import { Client, Message, MessageEmbed } from 'discord.js';
import Command from './command';
import { IAvatar, IMonster, IMonsterResult } from '../typings';

import Avatar from '../database/models/avatarModel';

import { basicMonsters } from '../constants/monsters';
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

  public getCurrentLevel(experience: number): number {
    // This will need to be updated if the exponent is updated
    return Math.floor(Math.pow(experience / this.baseExp, 2 / 3)) || 1;
  }

  public getExpForNextLevel(currentLevel: number): number {
    return Math.floor(this.baseExp * Math.pow(currentLevel, this.levelExponent));
  }

  public getBasicMonster(): IMonsterResult {
    const monster: IMonster =
      basicMonsters[randomNumber(0, basicMonsters.length - 1)];
    const damage = randomNumber(monster.minDmg, monster.maxDmg);
    const coins = randomNumber(monster.minCoins, monster.maxCoins);
    const exp = randomNumber(monster.minExp, monster.maxExp);
    return {
      name: monster.name,
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
    client: Client,
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
    client: Client,
    message: Message,
    args: string[]
  ): Promise<Message | Array<Message> | void> {
    console.log('Message contents: ', message.content);
    console.log('Arguments: ', args);
  }
}
