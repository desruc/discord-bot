import { Client, Message } from 'discord.js';
import Command from '../../core/command';
import axios from 'axios';

export default class Noot extends Command {
  constructor() {
    super();
    this.name = 'joke';
    this.guildOnly = false;
  }

  private async getDadJoke(): Promise<string> {
    try {
      const {
        data: { joke }
      } = await axios.get('https://icanhazdadjoke.com/', {
        headers: {
          'User-Agent': 'Discord Bot (https://github.com/desruc/discord-bot)',
          Accept: 'application/json'
        }
      });
      return joke;
    } catch {
      return 'Apologies. I\'m all out of jokes right now.';
    }
  }

  public async exec(client: Client, message: Message): Promise<Message> {
    const joke = await this.getDadJoke();
    return message.channel.send(joke);
  }
}
