import { Message, Collection, MessageEmbed } from 'discord.js';
import Command from '../../core/command';
import Bot from '../../core/bot';
import { ICommand } from '../../typings';

export default class Help extends Command {
  constructor(client: Bot) {
    super(client);
    this.name = 'help';
    this.category = 'info';
  }

  private getCategoryCommandList(
    commands: Collection<string, ICommand>,
    category: string
  ): string {
    return commands
      .filter((c) => c.category === category)
      .map((c) => `\`${c.name}\``)
      .join(', ');
  }

  public async exec(client: Bot, message: Message): Promise<Message> {
    const commands = client.commandHandler.commands;
    const commandCategories = client.commandHandler.commands
      .filter((c) => c.category !== undefined)
      .map((c) => c.category);

    const uniqueCategories = [...new Set(commandCategories)];

    const commandListMarkup = uniqueCategories
      .map(
        (c) =>
          `**${c[0].toUpperCase() + c.slice(1)}** \n${this.getCategoryCommandList(
            commands,
            c
          )}`
      )
      .reduce((string, category) => string + '\n' + category);

    const embed = new MessageEmbed()
      .setColor('RANDOM')
      .setDescription(commandListMarkup);
    return message.channel.send(embed);
  }
}
