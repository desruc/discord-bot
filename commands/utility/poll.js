const poll = async (client, message, args) => {
  if (!args.length > 0) return message.reply("you didn't supply a question...");

  if (message.deletable) message.delete();

  const pollMessage = args.join(' ');
  // Send the message then react
  const msg = await message.channel.send(
    `:clipboard: **POLL** :clipboard: \n${pollMessage}`
  );
  await msg.react('👍');
  await msg.react('👎');
};

module.exports = {
  name: 'poll',
  category: 'utility',
  description: 'start a poll with the defined question',
  usage: '<question>',
  example: 'arnie poll are you having a good day?',
  run: poll
};
