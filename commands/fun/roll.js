const roll = async (client, message, args) => {
  const channel = message.channel;
  const member = message.member;
  let num = args[0] || 100;

  if (isNaN(Number(num))) return channel.send("Yeah, that isn't a number...");

  num = Math.ceil(Number(num));
  if (Number(num) <= 1) return channel.send("Nice try...");

  const rand = Math.ceil(Math.random() * num);
  channel.send(`${member} rolls ${rand} (1-${num})`);
};

module.exports = {
  name: "roll",
  category: "fun",
  description:
    "returns a random number between 1 and 100 (or the number specified).",
  usage: "[number]",
  example: "arnie roll 666",
  run: roll
};
