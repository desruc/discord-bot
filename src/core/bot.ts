import { Client, ClientOptions } from 'discord.js';

import EventHandler from './eventHandler';
import CommandHandler from './commandHandler';
import { BotConfig } from '../typings';

import config from '../constants/config';
import { Logger } from './logger';

export default class Bot extends Client {
  public readonly config: BotConfig = config;
  readonly logger = new Logger(config.name).logger;
  public readonly commandHandler = new CommandHandler(this);
  private readonly eventHandler = new EventHandler(this);

  constructor(opts: ClientOptions) {
    super(opts);
  }

  public async init(): Promise<Bot> {
    // Init commands & events
    this.commandHandler.initializeCommands();
    this.eventHandler.initializeEvents();
    // Login to discord
    const { discordToken } = this.config;
    await this.login(discordToken);
    return this;
  }
}
