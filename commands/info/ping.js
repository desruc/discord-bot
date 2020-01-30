const ping = async (client, message, args) => {
  const msg = await message.channel.send(`🏓 Pinging....`);

  msg.edit(`🏓 Pong!
    Latency is ${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms
    API Latency is ${Math.round(client.ping)}ms`);
};

module.exports = {
  name: "ping",
  category: "info",
  description: "Returns latency and API ping",
  run: ping
};
