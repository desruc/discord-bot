import Bot from '../core/bot';
import { IEvent } from '../typings';
import { Message, GuildMember } from 'discord.js';

import { getGreeting } from '../constants/messages';

import userRecords from '../commands/dev/initUserRecords';

import { getTextChannel } from '../utils/helpers';

export default class GuildMemberAdd implements IEvent {
  readonly name = 'guildMemberAdd';

  constructor(private client: Bot) {}

  public async exec(member: GuildMember): Promise<Message> {
    const { guild } = member;
    const { id: guildId } = guild;
    new userRecords().initializeUserRecord(this.client, guildId, member);

    const baseChannel = await getTextChannel(guild);

    return baseChannel.send(getGreeting(member));
  }
}
