import { Message } from 'discord.js';
import { CommandInterface } from '../types';

import { commandDefaults } from '../constants/defaults';

export default class Command implements CommandInterface {
  public active: boolean;
  public name: string;
  public category: string;
  public cooldown: number;
  public description: string;
  public dm: boolean;

  constructor() {
    this.active = true;
    this.dm = false;
    this.cooldown = commandDefaults.cooldown;
  }

  public async process(msg: Message): Promise<void> {
    console.log('Message contents: ', msg.content);
  }
}
