import { Message, Client, ClientEvents } from 'discord.js';

export interface BotConfig {
  discordToken: string;
  name: string;
  prefix: string;
  modRole: string;
}

export interface ICommand {
  active: boolean;
  name: string;
  category: string;
  cooldown: number;
  description: string;
  guildOnly: boolean;
  exec(
    client: Client,
    message: Message,
    args?: string[]
  ): Promise<Message | Array<Message> | void>;
}

export interface IEvent {
  name: keyof ClientEvents;
  exec(...args: any): any;
}
