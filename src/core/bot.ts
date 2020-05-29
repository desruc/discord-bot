import fs from 'fs';
import { Client, Message, Collection } from 'discord.js';
import { CommandInterface } from '../types';

import config from '../constants/config';

export default class Bot {
  private client: Client;
  private readonly token: string;
  private readonly prefix: string;
  private readonly commands: Collection<string, CommandInterface> = new Collection();

  constructor() {
    this.client = new Client();
    this.token = config.discordToken;
    this.prefix = config.botPrefix;

    this.initiateCommands();
  }

  public listen(): Promise<string> {
    this.client.on('message', (message: Message) => {
      // Ignore messages from bot
      if (message.author.bot) return;

      // No prefix - no comprende
      if (message.content.toLowerCase().indexOf(this.prefix) !== 0) return;

      const args = message.content.slice(this.prefix.length).trim().split(/ +/g);
      const cmd = args.shift().toLowerCase();

      // No command - terminate
      if (cmd.length === 0) return;

      const command = this.commands.get(cmd);

      if (command) command.process(this.client, message, args);
    });

    return this.client.login(this.token);
  }

  private initiateCommands() {
    fs.readdirSync(`${__dirname}/../commands/`).forEach((dir) => {
      const commands = fs
        .readdirSync(`${__dirname}/../commands/${dir}/`)
        .filter((file) => file.endsWith('.js'));

      commands.forEach((file) => {
        const cmdClass = require(`${__dirname}/../commands/${dir}/${file}`).default;
        const command = new cmdClass();

        if (command.active) this.commands.set(command.name, command);
      });
    });
  }
}
