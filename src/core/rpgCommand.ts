import { Client, Message } from 'discord.js';
import Command from './command';
import { IAvatar } from '../typings';

import Avatar from '../database/models/avatarModel';

export default class RPGCommand extends Command {
  public guildOnly = true;

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

  public async exec(
    client: Client,
    message: Message,
    args: string[]
  ): Promise<Message | Array<Message> | void> {
    console.log('Message contents: ', message.content);
    console.log('Arguments: ', args);
  }
}
