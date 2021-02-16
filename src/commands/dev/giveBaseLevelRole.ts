import { Message } from 'discord.js';
import Command from '../../core/command';
import Bot from '../../core/bot';

import UserModel from '../../database/models/userModel';

import { asyncForEach } from '../../utils/helpers';

import { basicRoles, fantasyRoles } from '../../constants/roles';

export default class GiveBaseLevelRole extends Command {
  private roles = [];

  constructor(client: Bot) {
    super(client);

    const {
      config: { roleSet }
    } = client;

    this.name = 'givebaselevelrole';
    this.guildOnly = true;
    this.ownerOnly = true;
    this.roles = roleSet === 'basic' ? basicRoles : fantasyRoles;
  }

  public async exec(client: Bot, message: Message): Promise<void> {
    const {
      guild: { members, roles: guildRoles, name: guildName }
    } = message;

    const baseLevelRole = this.roles.find((r) => r.level === 0);
    const existingGuildRole = guildRoles.cache.find(
      (r) => r.name === baseLevelRole.name
    );

    if (!existingGuildRole)
      client.logger.error(
        `The ${baseLevelRole.name} role doesn't exist in this guild!`
      );

    if (existingGuildRole) {
      const allUsers = await UserModel.find({});

      await asyncForEach(allUsers, async (user) => {
        try {
          const member = members.cache.get(user.userId);
          await member.roles.add(existingGuildRole);
        } catch (error) {
          client.logger.error(error);
        }
      });

      if (allUsers.length > 0) {
        client.logger.info(
          `The ${baseLevelRole.name} role has been granted to every member of ${guildName}`
        );
      }
    }
  }
}
