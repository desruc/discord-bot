import { Message, Client, ClientEvents } from 'discord.js';

export interface BotConfig {
  discordToken: string;
  prefix: string;
  modRole: string;
}

export interface CommandInterface {
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

export interface Event {
  name: keyof ClientEvents;
  exec(...args: any): any;
}
