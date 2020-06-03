import { Message, GuildMember } from 'discord.js';
import Command from '../../core/command';
import Bot from '../../core/bot';
import UserModel from '../../core/database/models/userModel';

import { asyncForEach } from '../../utils/helpers';

export default class InitUserRecords extends Command {
  constructor() {
    super();
    this.name = 'inituserrecords';
    this.guildOnly = true;
    this.ownerOnly = true;
  }

  public async initializeUserRecord(
    client: Bot,
    guildId: string,
    member: GuildMember
  ): Promise<any> {
    try {
      const result = await UserModel.findOne({ userId: member.id });

      if (result) {
        // Shouldn't happen when initializing new guild
        const hasGuild = result.guilds.some((g) => g.guildId === guildId);

        if (!hasGuild) {
          result.guilds.push({
            guildId,
            experience: 0
          });
          await result.save();
          client.logger.info(
            `Inserted guild into existing member record (${member.id}).`
          );
          return result;
        } else return result;
      }

      const newRecord = await new UserModel({
        userId: member.id,
        guilds: [
          {
            guildId,
            experience: 0
          }
        ]
      }).save();

      client.logger.info(`Initialized new record for member (${member.id}).`);

      return newRecord;
    } catch (error) {
      client.logger.error(error);
    }
  }

  public async exec(client: Bot, message: Message): Promise<void> {
    const {
      guild: { members, id: guildId }
    } = message;

    const guildMembers = Array.from(members.cache.values()).filter(
      (m) => !m.user.bot
    );

    await asyncForEach(guildMembers, async (member) => {
      this.initializeUserRecord(client, guildId, member);
    });
  }
}
