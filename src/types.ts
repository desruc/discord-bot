import { Message } from 'discord.js';

export type Command = {
  name: string;
  category: string;
  run: (message: Message) => void;
};
