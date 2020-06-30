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
  level: number;
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
  inventory: {
    healthPotion: number;
  };
}

export interface IMonster {
  name: string;
  damage: number;
  coins: number;
  exp: number;
}

export interface IShopItem {
  name: string;
  cost: number;
  addToInventory?: boolean;
}

export interface IMonsters {
  hunt: IMonsterMeta;
  adventure: IMonsterMeta;
}

export interface IMonsterMeta {
  minDamage: number;
  maxDamage: number;
  minCoins: number;
  maxCoins: number;
  minExp: number;
  maxExp: number;
  names: string[];
}
