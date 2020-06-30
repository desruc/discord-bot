import { Message } from 'discord.js';
import Command from '../../core/command';
import Bot from '../../core/bot';

import { asyncForEach } from '../../utils/helpers';

import { categories, textChannels, voiceChannels } from '../../constants/channels';

export default class InitChannels extends Command {
  constructor(client: Bot) {
    super(client);
    this.name = 'initchannels';
    this.guildOnly = true;
    this.ownerOnly = true;
  }

  public async exec(client: Bot, message: Message): Promise<void> {
    const { guild } = message;

    // Categories
    await asyncForEach(categories, async (category) => {
      const existingCategory = guild.channels.cache.find(
        (c) => c.name === category && c.type === 'category'
      );

      if (!existingCategory) {
        await guild.channels.create(category, { type: 'category' });
        client.logger.info(
          `The ${category} category has been initialized in ${guild.name}.`
        );
      } else
        client.logger.info(
          `The ${category} category already exists in ${guild.name}.`
        );
    });

    // Text channels
    await asyncForEach(textChannels, async (textChannel) => {
      const { name, parent } = textChannel;
      if (name) {
        const existingTextChannel = guild.channels.cache.find(
          (c) => c.name === name && c.type === 'text'
        );

        if (!existingTextChannel) {
          if (parent) {
            const category = guild.channels.cache.find(
              (c) => c.name === parent && c.type === 'category'
            );
            await guild.channels.create(name, {
              type: 'text',
              parent: category.id
            });
          } else await guild.channels.create(name, { type: 'text' });

          client.logger.info(
            `The ${textChannel.name} text channel has been initialized in ${guild.name}.`
          );
        } else
          client.logger.info(
            `The ${textChannel.name} text channel already exists in ${guild.name}.`
          );
      }
    });

    // Vouice channels
    await asyncForEach(voiceChannels, async (voiceChannel) => {
      const { name, parent } = voiceChannel;
      if (name) {
        const existingVoiceChannel = guild.channels.cache.find(
          (c) => c.name === name && c.type === 'voice'
        );

        if (!existingVoiceChannel) {
          if (parent) {
            const category = guild.channels.cache.find(
              (c) => c.name === parent && c.type === 'category'
            );
            await guild.channels.create(name, {
              type: 'voice',
              parent: category.id
            });
          } else await guild.channels.create(name, { type: 'voice' });

          client.logger.info(
            `The ${voiceChannel.name} voice channel has been initialized in ${guild.name}.`
          );
        } else
          client.logger.info(
            `The ${voiceChannel.name} voice channel already exists in ${guild.name}.`
          );
      }
    });

    client.logger.info(
      `All categories and channels have been initialized on ${guild.name}`
    );
    return;
  }
}
