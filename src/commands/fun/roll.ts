import { Client, Message } from 'discord.js';
import Command from '../../core/command';
import Bot from '../../core/bot';

export default class Say extends Command {
  constructor(client: Bot) {
    super(client);
    this.name = 'roll';
    this.category = 'utility';
    this.description =
      'returns a random number between 1 and 100 (or the number specified).';
    this.category = 'fun';
  }

  private randomNumber(min: number, max: number) {
    const strictMin: number = Math.ceil(Number(min));
    const strictMax: number = Math.floor(Number(max));
    return Math.floor(Math.random() * (strictMax - strictMin + 1)) + strictMin;
  }

  private numberIsValid(number: number) {
    return !isNaN(Number(number)) && isFinite(Number(number));
  }

  public async exec(
    client: Client,
    message: Message,
    args: string[]
  ): Promise<Message | Array<Message> | void> {
    const { channel, author } = message;

    if (args[1] === undefined) {
      const num: number = Number(args[0]) || 100;

      if (!this.numberIsValid) return channel.send("That isn't a number...");

      if (num <= 1) return channel.send('Nice try...');

      const rand = this.randomNumber(1, num);
      return message.channel.send(`${author} rolls ${rand} (1-${num})`);
    }

    const minimum = Number(args[0]);
    const maximum = Number(args[1]);
    if (!this.numberIsValid(minimum) || !this.numberIsValid(maximum))
      return channel.send('You must enter two numbers... Terminating process.');

    if (minimum > maximum || minimum < 0 || maximum < 1)
      return channel.send(
        'Do you take me for a fool? You must enter two positive number values - a minimum and a maximum.'
      );

    const rand = this.randomNumber(minimum, maximum);
    return message.channel.send(`${author} rolls ${rand} (${minimum}-${maximum})`);
  }
}
