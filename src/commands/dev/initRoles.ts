import { Message } from 'discord.js';
import Command from '../../core/command';
import Bot from '../../core/bot';

import { asyncForEach } from '../../utils/helpers';

import { roles } from '../../constants/roles';

export default class InitRoles extends Command {
  constructor() {
    super();
    this.name = 'initroles';
    this.guildOnly = true;
    this.ownerOnly = true;
  }

  public async exec(client: Bot, message: Message): Promise<void> {
    const { guild } = message;
    await asyncForEach(roles, async (role, index) => {
      const { name, color, position, hoist } = role;
      const existingRole = guild.roles.cache.find((r) => r.name === name);

      if (!existingRole) {
        try {
          await guild.roles.create({
            data: {
              name,
              mentionable: false,
              hoist: hoist || false,
              color: color || 'RANDOM',
              position: position || index + 1
            }
          });
          client.logger.info(`${name} role initialized on ${guild.name}`);
        } catch (e) {
          client.logger.error(`Error initializing ${name} role: `, e);
        }
      }
    });
  }
}
