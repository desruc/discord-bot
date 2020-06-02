import { Message } from 'discord.js';
import Command from '../../core/command';
import Bot from '../../core/bot';

import { asyncForEach } from '../../utils/helpers';

export default class InitUserRecords extends Command {
  constructor() {
    super();
    this.name = 'inituserrecords';
    this.guildOnly = true;
    this.ownerOnly = true;
  }

  public async exec(client: Bot, message: Message): Promise<void> {
    const {
      guild: { members }
    } = message;

    const guildMembers = Array.from(members.cache.values()).filter(
      (m) => !m.user.bot
    );

    await asyncForEach(guildMembers, async (member) => {
      // TODO: Create database records
    });
  }
}
