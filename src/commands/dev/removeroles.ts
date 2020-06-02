import { Message } from 'discord.js';
import Command from '../../core/command';
import Bot from '../../core/bot';

import { asyncForEach } from '../../utils/helpers';

import { roles } from '../../constants/roles';

export default class RemoveRoles extends Command {
  constructor() {
    super();
    this.name = 'removeroles';
    this.guildOnly = true;
    this.ownerOnly = true;
  }

  public async exec(client: Bot, message: Message): Promise<void> {
    const { guild } = message;
    await asyncForEach(roles, async (role) => {
      const { name } = role;
      const existingRole = guild.roles.cache.find((r) => r.name === name);

      if (existingRole) {
        try {
          await existingRole.delete();
          client.logger.info(`${name} role removed from ${guild.name}`);
        } catch (error) {
          client.logger.error(`Error removing the ${name} role: `, error);
        }
      }
    });
  }
}
