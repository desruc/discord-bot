import { readdirSync } from 'fs';
import { ICommand } from '../typings';
import { Collection, Message } from 'discord.js';
import Bot from './bot';

export default class CommandHandler {
  readonly commands: Collection<string, ICommand> = new Collection();
  readonly aliases: Collection<string, string> = new Collection();

  constructor(public client: Bot) {}

  public initializeCommands(): void {
    readdirSync(`${__dirname}/../commands/`).forEach((dir) => {
      const commands = readdirSync(
        `${__dirname}/../commands/${dir}/`
      ).filter((file) => file.endsWith('.js'));

      commands.forEach((file) => {
        const command = new (require(`${__dirname}/../commands/${dir}/${file}`).default)(
          this.client
        );

        if (command.active) {
          this.commands.set(command.name, command);

          if (command.aliases.length > 0) {
            command.aliases.map((alias) => {
              this.aliases.set(alias, command.name);
            });
          }
        }
      });
    });
  }

  public handleCommand(message: Message): any {
    const {
      config: { prefix }
    } = this.client;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    // No command - terminate
    if (cmd.length === 0) return;

    const command =
      this.commands.get(cmd) || this.commands.get(this.aliases.get(cmd));

    if (command) {
      // Guild only command in direct message - not today!
      if (command.guildOnly && !message.guild) return;

      // Guild owners only!
      if (command.ownerOnly && message.guild.ownerID !== message.author.id) return;

      // Rpg commands have their own handler that checks cooldowns before executing
      if (command.rpg) return command.execRpgCommand(this.client, message, args);

      return command.exec(this.client, message, args);
    }
  }
}
