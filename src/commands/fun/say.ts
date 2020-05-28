import { Client, Message } from 'discord.js';
import Command from '../../core/command';

export default class Say extends Command {
  constructor() {
    super();
    this.name = 'say';
    this.dm = true;
  }

  public async process(
    client: Client,
    message: Message,
    args: string[]
  ): Promise<void> {
    if (message.guild) {
      message.reply(`You said '${message.content}'`);
    }

    const {
      author: { id: authorId }
    } = message;
    const authorGuilds = [];

    client.guilds.cache.forEach((guild) => {
      if (guild.members.cache.some((member) => member.id === authorId)) {
        authorGuilds.push({
          name: guild.name,
          id: guild.id
        });
      }
    });

    const serverOptions = authorGuilds
      .map((g, idx) => `${idx + 1}) ${g.name}\n`)
      .join('');

    const answers = [...new Array(serverOptions.length)].map(
      (e, idx) => `${idx + 1}`
    );

    const filter = (response) =>
      answers.some((answer) => answer === response.content);

    message.channel.send(`Which server?\n${serverOptions}`).then(() => {
      message.channel
        .awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
        .then((collected) => {
          const chosenGuild = authorGuilds[Number(collected.first().content) - 1];
          message.channel.send(`You have chosen ${chosenGuild.name}`);
        });
    });
  }
}
