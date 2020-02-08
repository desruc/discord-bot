const roll = async (client, message, args) => {
  const channel = message.channel;
  const member = message.member;
  const num = args[0] || 100;
  const rand = Math.ceil(Math.random() * (Number(num) + 1));
  channel.send(`${member} rolls ${rand} (0-${num})`);
};

module.exports = {
  name: "roll",
  category: "fun",
  description:
    "returns a random number between 0 and 100 (or the number specified).",
  usage: "[number]",
  example: "arnie roll 666",
  run: roll
};
