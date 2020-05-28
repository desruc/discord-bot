import { Message } from 'discord.js';

export interface CommandInterface {
  active: boolean;
  name: string;
  category: string;
  process(msg: Message): Promise<void>;
}
