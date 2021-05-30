import { Message, GuildMember } from 'discord.js';
import { Event } from '../core/eventHandler';

import { getGreeting } from '../constants/messages';

import { getTextChannel } from '../utils/helpers';

export default class GuildMemberAdd implements Event {
  readonly name = 'guildMemberAdd';

  public async exec(member: GuildMember): Promise<Message> {
    const { guild } = member;

    const baseChannel = await getTextChannel(guild);

    return baseChannel.send(getGreeting(member));
  }
}
