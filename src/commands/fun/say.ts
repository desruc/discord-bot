import { Client, Message, TextChannel } from 'discord.js';
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
  ): Promise<Message | Array<Message> | void> {
    const noArgs = args.length === 0;
    if (noArgs) return message.channel.send('No args dummy');

    const userMessage = args.join(' ');

    // The command was sent in a server - post the response there
    if (message.guild) {
      if (message.deletable) message.delete();
      return message.channel.send(userMessage);
    }

    // TODO: Check if author has dm permissions

    // The command was sent in a dm - ask for guild and channel
    const {
      author: { id: authorId }
    } = message;

    const authorGuilds = [];

    // Get all the guilds the bot and author share
    client.guilds.cache.forEach((guild) => {
      if (guild.members.cache.some((member) => member.id === authorId)) {
        authorGuilds.push({
          name: guild.name,
          id: guild.id
        });
      }
    });

    // Bot and user share no guilds (should never happen)
    if (authorGuilds.length === 0)
      return message.channel.send(
        'We have no guilds in common. Terminating process.'
      );

    const serverOptions = authorGuilds
      .map((g, idx) => `${idx + 1}) ${g.name}\n`)
      .join('');

    const serverAnswers = [...new Array(authorGuilds.length)].map(
      (e, idx) => `${idx + 1}`
    );

    const guildFilter = (response) =>
      serverAnswers.some((answer) => answer === response.content);

    message.channel.send(`Which server?\n${serverOptions}`).then(() => {
      // TODO: Collection timeout

      message.channel
        .awaitMessages(guildFilter, { max: 1, time: 30000, errors: ['time'] })
        .then((collected) => {
          const chosenGuild = authorGuilds[Number(collected.first().content) - 1];

          console.info(`You have chosen ${chosenGuild.name}`);

          const serverTextChannels = client.channels.cache
            .filter(({ type }) => type === 'text')
            .map((channel) => {
              const c = channel as TextChannel;
              return {
                name: c.name,
                id: c.id
              };
            });

          const channelOptions = serverTextChannels
            .map((c, idx) => `${idx + 1}) ${c.name}\n`)
            .join('');

          const channelAnswers = [...new Array(serverTextChannels.length)].map(
            (e, idx) => `${idx + 1}`
          );

          const channelFilter = (response) =>
            channelAnswers.some((answer) => answer === response.content);

          message.channel.send(`Which channel?\n${channelOptions}`).then(() => {
            message.channel
              .awaitMessages(channelFilter, {
                max: 1,
                time: 30000,
                errors: ['time']
              })
              .then((collected) => {
                const chosenChannel =
                  serverTextChannels[Number(collected.first().content) - 1];

                console.info(`You have chosen ${chosenChannel.name}`);

                const channelObject = client.channels.cache.find(
                  (c) => c.id === chosenChannel.id
                );

                (channelObject as TextChannel).send(userMessage);
              });
          });
        });
    });
  }
}
