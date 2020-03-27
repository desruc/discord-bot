const { timeout } = require('../../helpers');

const mute = async (client, message) => {
  const { deletable, guild, mentions, channel, author } = message;

  if (deletable) message.delete();

  const toMute = mentions.members.first();
  if (!toMute)
    return message.reply('you must specify a member').then(m => m.delete(5000));

  if (author.id === toMute.id)
    return message.reply('why would you want to mute yourself?');

  if (author.id !== guild.owner.id)
    return message.reply("you don't have permissions to mute members.");

  let mutedRole = guild.roles.find(r => r.name === 'MUTED');
  if (!mutedRole) {
    try {
      mutedRole = await guild.createRole({
        name: 'MUTED',
        permissions: [],
        position: 999
      });
      message.guild.channels.forEach(async channel => {
        await channel.overwritePermissions(mutedRole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false,
          SEND_TTS_MESSAGES: false,
          ATTACH_FILES: false,
          SPEAK: false
        });
      });
    } catch (error) {
      console.error('Error creating mute role: ', error.stack);
    }
  }

  const alreadyHasRole = toMute.roles.has(mutedRole.id);
  if (alreadyHasRole) return message.reply('that user is already muted!');

  try {
    // Add the role to the user
    await toMute.addRole(mutedRole);
    channel.send(`${toMute}, you've been muted for 5 minutes...`);

    // Remove the role after 5000
    await timeout(300000);
    await toMute.removeRole(mutedRole);
    channel.send(
      `Alright ${toMute}, you've been unmuted... I hope you've learnt your lesson.`
    );
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  name: 'mute',
  category: 'moderation',
  aliases: ['m', 'nospeak'],
  description: 'the bot temporarily mutes the user',
  usage: '[mention]',
  run: mute
};
