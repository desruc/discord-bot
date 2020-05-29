import { Message, Client } from 'discord.js';

export interface CommandInterface {
  active: boolean;
  name: string;
  category: string;
  cooldown: number;
  description: string;
  guildOnly: boolean;
  process(
    client: Client,
    message: Message,
    args?: string[]
  ): Promise<Message | Array<Message> | void>;
}
