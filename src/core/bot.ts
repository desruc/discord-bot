import fs from 'fs';
import { Client, Message, Collection } from 'discord.js';
import { Command } from '../types';
import env from '../constants/env';

export default class Bot {
  private client: Client;
  private readonly token: string;
  private readonly prefix: string;
  private readonly commands: Collection<string, Command> = new Collection();

  constructor() {
    this.client = new Client();
    this.token = env.discordToken;
    this.prefix = env.botPrefix;

    this.initiateCommands();
  }

  public listen(): Promise<string> {
    this.client.on('message', (message: Message) => {
      // Ignore messages from bot
      if (message.author.bot) return;

      // Ignore messages not sent in a guild
      if (!message.guild) return;

      // No prefix - no comprende
      if (message.content.toLowerCase().indexOf(this.prefix) !== 0) return;

      const args = message.content
        .slice(this.prefix.length)
        .trim()
        .split(/ +/g);
      const cmd = args.shift().toLowerCase();

      // No command - terminate
      if (cmd.length === 0) return;

      const command = this.commands.get(cmd);

      if (command) command.run(message);
    });

    return this.client.login(this.token);
  }

  private initiateCommands() {
    fs.readdirSync(`${__dirname}/../commands/`).forEach((dir) => {
      const commands = fs
        .readdirSync(`${__dirname}/../commands/${dir}/`)
        .filter((file) => file.endsWith('.js'));

      commands.forEach((file) => {
        let pull = require(`${__dirname}/../commands/${dir}/${file}`).default;

        if (pull.name) this.commands.set(pull.name, pull);
      });
    });
  }
}
