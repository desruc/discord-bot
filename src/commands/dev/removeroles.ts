import { Message } from 'discord.js';
import Command from '../../core/command';
import Bot from '../../core/bot';

import { asyncForEach } from '../../utils/helpers';

import { basicRoles, fantasyRoles } from '../../constants/roles';

export default class RemoveRoles extends Command {
  private roles = [];

  constructor(client: Bot) {
    super(client);

    const {
      config: { roleSet }
    } = client;

    this.name = 'removeroles';
    this.guildOnly = true;
    this.ownerOnly = true;
    this.roles = roleSet === 'basic' ? basicRoles : fantasyRoles;
  }

  public async exec(client: Bot, message: Message): Promise<void> {
    const { guild } = message;
    await asyncForEach(this.roles, async (role) => {
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
