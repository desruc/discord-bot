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
  ): Promise<void> {
    if (message.guild) {
      // TODO: Say command for in guild channel
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

    const answers = [...new Array(authorGuilds.length)].map(
      (e, idx) => `${idx + 1}`
    );

    const filter = (response) =>
      answers.some((answer) => answer === response.content);

    message.channel.send(`Which server?\n${serverOptions}`).then(() => {
      message.channel
        .awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
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

                (channelObject as TextChannel).send(args.join(' '));
              });
          });
        });
    });
  }
}
