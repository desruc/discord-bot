import Bot from '../core/bot';
import { Presence } from 'discord.js';
import { IEvent } from '../typings';

export default class ReadyEvent implements IEvent {
  readonly name = 'ready';

  constructor(private client: Bot) {}

  public exec(): void {
    const numOfUsers = this.client.users.cache.filter(
      (u) => !u.equals(this.client.user!)
    ).size;
    const numOfGuilds = this.client.guilds.cache.size;

    const logMessage = `${numOfUsers} users on ${numOfGuilds} guilds!`;

    this.client.logger.info(
      `${
        this.client.shard ? `[Shard #${this.client.shard.ids}]` : ''
      } I'm ready to serve ${logMessage}`
    );

    const updatePresence = async (): Promise<Presence> =>
      this.client.user!.setPresence({
        activity: {
          name: `${await this.client.getUsersCount()} users!`,
          type: 'WATCHING'
        }
      });

    setInterval(updatePresence, 30 * 1000);
    updatePresence();
  }
}
