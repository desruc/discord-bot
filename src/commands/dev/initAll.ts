import { Message } from 'discord.js';
import Command from '../../core/command';
import Bot from '../../core/bot';

import initChannels from './initChannels';
import initUserRecords from './initUserRecords';
import initRoles from './initRoles';
import giveBaseLevelRole from './giveBaseLevelRole';

export default class InitAll extends Command {
  constructor() {
    super();
    this.name = 'initall';
    this.guildOnly = true;
    this.ownerOnly = true;
  }

  public async exec(client: Bot, message: Message): Promise<void> {
    // Run all initialization commands
    await new initChannels().exec(client, message);
    await new initUserRecords().exec(client, message);
    await new initRoles().exec(client, message);
    await new giveBaseLevelRole().exec(client, message);

    client.logger.info(
      `Finished running initialization commands on ${message.guild.name}`
    );
  }
}
