import { Message, Client, ClientEvents } from 'discord.js';
import { Document } from 'mongoose';

export interface BotConfig {
  discordToken: string;
  name: string;
  prefix: string;
  modRole: string;
  totalShards: string;
  modChannel: string;
}

export interface ICommand {
  active: boolean;
  name: string;
  category: string;
  cooldown: number;
  description: string;
  guildOnly: boolean;
  ownerOnly: boolean;
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

export interface IUser extends Document {
  userId: string;
  guilds: {
    guildId: string;
    experience: number;
  }[];
}

export interface IAvatar extends Document {
  userId: string;
  guildId: string;
  exp: number;
  hitPoints: number;
  maxHitPoints: number;
  armour: number;
  attack: number;
  coins: number;
}
