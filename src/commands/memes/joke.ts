import { Client, Message, MessageEmbed } from 'discord.js';
import Command from '../../core/command';
import axios from 'axios';
import Bot from '../../core/bot';

export default class Joke extends Command {
  constructor(client: Bot) {
    super(client);
    this.name = 'joke';
    this.category = 'memes';
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
