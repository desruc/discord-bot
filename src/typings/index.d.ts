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
  rpg?: boolean;
  execRpgCommand?(
    client: Client,
    message: Message,
    args?: string[]
  ): Promise<Message | Array<Message> | void>;
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
  cooldowns: {
    command: string;
    timestamp: number;
  }[];
}

export interface IMonster {
  name: string;
  minDmg: number;
  maxDmg: number;
  minCoins: number;
  maxCoins: number;
  minExp: number;
  maxExp: number;
}

export interface IMonsterResult {
  name: string;
  damage: number;
  coins: number;
  exp: number;
}
