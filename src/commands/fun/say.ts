import { Client, Message, TextChannel, Guild } from 'discord.js';
import Command from '../../core/command';
import config from '../../constants/config';

type hey = {
  blah: string;
};

export default class Say extends Command {
  constructor() {
    super();
    this.name = 'say';
    this.dm = true;
  }

  private checkDmPermissions(message: Message, guild: Guild): boolean {
    const {
      author: { id: authorId },
      member
    } = message;

    const modRole = guild.roles.cache.find((r) => r.name === config.modRole);

    if (
      (modRole && member.roles.cache.has(modRole.id)) ||
      guild.ownerID === authorId
    )
      return true;

    return false;
  }

  private async sendMessageToChannel(
    message: Message,
    guild: Guild,
    userMessage: string
  ): Promise<Message | Array<Message> | void> {
    // Get all text channels in guild
    const serverTextChannels = guild.channels.cache
      .filter(({ type }) => type === 'text')
      .map((channel) => {
        const c = channel as TextChannel;
        return {
          name: c.name,
          id: c.id
        };
      });

    // Guild has no text channels (should never happen)
    if (serverTextChannels.length <= 0) {
      return message.channel.send(
        'The selected guild has no text channels. Terminating process.'
      );
    }

    // Only one text channel - send the message there
    if (serverTextChannels.length === 1) {
      const onlyTextChannel = guild.channels.cache
        .filter(({ type }) => type === 'text')
        .first();
      return (onlyTextChannel as TextChannel).send(userMessage);
    }

    const channelOptions = serverTextChannels
      .map((c, idx) => `${idx + 1}) ${c.name}\n`)
      .join('');

    const channelAnswers = [...new Array(serverTextChannels.length)].map(
      (e, idx) => `${idx + 1}`
    );

    const channelFilter = (response) =>
      channelAnswers.some((answer) => answer === response.content);

    // Await a channel response
    return message.channel
      .send(
        `Please select a channel (Enter a number from 1 - ${serverTextChannels.length})?\n${channelOptions}`
      )
      .then(() =>
        message.channel
          .awaitMessages(channelFilter, {
            max: 1,
            time: 3000,
            errors: ['time']
          })
          .then((collected) => {
            // The user has selected a guild and channel - send the message
            const chosenChannel =
              serverTextChannels[Number(collected.first().content) - 1];

            console.info(`You have chosen ${chosenChannel.name}`);

            const channelObject = guild.channels.cache.find(
              (c) => c.id === chosenChannel.id
            );

            (channelObject as TextChannel).send(userMessage);
          })
          .catch(() =>
            message.channel.send(
              'Are you still there? No channel was selected, please start the command again.'
            )
          )
      );
  }

  public async process(
    client: Client,
    message: Message,
    args: string[]
  ): Promise<Message | Array<Message> | void> {
    const noArgs = args.length === 0;
    if (noArgs)
      return message.channel.send(
        'What do you want me to say? Try the command again.'
      );

    const userMessage = args.join(' ');

    // The command was sent in a server - post the response there
    if (message.guild) {
      if (message.deletable) message.delete();
      return message.channel.send(userMessage);
    }

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
    if (authorGuilds.length <= 0)
      return message.channel.send(
        'We have no guilds in common. Terminating process.'
      );

    // Bot and user only share one guild - ask which channel
    if (authorGuilds.length === 1) {
      const onlyGuild = client.guilds.cache.find((g) =>
        g.members.cache.some((member) => member.id === authorId)
      );

      if (this.checkDmPermissions(message, onlyGuild))
        return this.sendMessageToChannel(message, onlyGuild, userMessage);

      return message.channel.send(
        "You don't have permission to use that command outside of the guild."
      );
    }

    const serverOptions = authorGuilds
      .map((g, idx) => `${idx + 1}) ${g.name}\n`)
      .join('');

    const serverAnswers = [...new Array(authorGuilds.length)].map(
      (e, idx) => `${idx + 1}`
    );

    const guildFilter = (response) =>
      serverAnswers.some((answer) => answer === response.content);

    // Ask which guild the author wants
    message.channel
      .send(
        `Please select a server (Enter a number from 1 - ${authorGuilds.length})\n${serverOptions}`
      )
      .then(() => {
        // Await a guild response
        message.channel
          .awaitMessages(guildFilter, { max: 1, time: 3000, errors: ['time'] })
          .then((collected) => {
            const chosenGuildMeta =
              authorGuilds[Number(collected.first().content) - 1];

            const chosenGuild = client.guilds.cache.find(
              (g) => g.id === chosenGuildMeta.id
            );

            console.info(`You have chosen ${chosenGuildMeta.name}`);

            if (this.checkDmPermissions(message, chosenGuild))
              return this.sendMessageToChannel(message, chosenGuild, userMessage);

            return message.channel.send(
              "You don't have permission to use that command outside of the chosen guild."
            );
          })
          .catch(() =>
            message.channel.send(
              'Are you still there? No server was selected, please start the command again.'
            )
          );
      });
  }
}
