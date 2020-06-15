import { Client, Message } from 'discord.js';
import Command from './command';
import { IAvatar } from '../typings';

import Avatar from '../database/models/avatarModel';

export default class RPGCommand extends Command {
  public guildOnly = true;
  public baseExp = 125;
  public levelExponent = 1.5;

  public async getUserAvatar(userId: string, guildId: string): Promise<IAvatar> {
    try {
      const result = await Avatar.findOne({ userId, guildId });

      if (!result) {
        const newRecord = await new Avatar({
          userId,
          guildId
        }).save();

        return newRecord;
      }

      return result;
    } catch (error) {
      console.error(`Error retrieving users (${userId}) avatar on ${guildId}`);
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

  public async exec(
    client: Client,
    message: Message,
    args: string[]
  ): Promise<Message | Array<Message> | void> {
    console.log('Message contents: ', message.content);
    console.log('Arguments: ', args);
  }
}
