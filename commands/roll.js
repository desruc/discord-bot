module.exports = (message, num) => {
  const channel = message.channel;
  const member = message.member;
  const rand = Math.ceil(Math.random() * (Number(num) + 1));
  return channel.send(`${member} rolls ${rand} (0-${num})`);
};
