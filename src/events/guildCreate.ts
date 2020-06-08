import Bot from '../core/bot';
import { IEvent } from '../typings';
import { Guild } from 'discord.js';

import { asyncForEach } from '../utils/helpers';

import userRecords from '../commands/dev/initUserRecords';

export default class GuildCreate implements IEvent {
  readonly name = 'guildCreate';

  constructor(private client: Bot) {}

  public async exec(guild: Guild): Promise<void> {
    const { members, id: guildId } = guild;

    const guildMembers = Array.from(members.cache.values()).filter(
      (m) => !m.user.bot
    );

    const recordHelpers = new userRecords();

    await asyncForEach(guildMembers, async (member) => {
      await recordHelpers.initializeUserRecord(this.client, guildId, member);
    });
  }
}
