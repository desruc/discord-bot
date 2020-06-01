import { Client, Message, MessageEmbed } from 'discord.js';
import Command from '../../core/command';
import axios from 'axios';

export default class Joke extends Command {
  constructor() {
    super();
    this.name = 'joke';
    this.guildOnly = false;
  }

  private async getDadJoke(): Promise<string> {
    const {
      data: { joke }
    } = await axios.get('https://icanhazdadjoke.com/', {
      headers: {
        'User-Agent': 'Discord Bot (https://github.com/desruc/discord-bot)',
        Accept: 'application/json'
      }
    });
    return joke;
  }

  public async exec(client: Client, message: Message): Promise<Message> {
    try {
      const joke = await this.getDadJoke();
      const embed = new MessageEmbed().setTitle(joke).setColor('RANDOM');
      return message.channel.send(embed);
    } catch {
      return message.channel.send("Apologies. I'm all out of jokes right now.");
    }
  }
}
