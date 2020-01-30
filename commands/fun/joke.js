const axios = require("axios");

const joke = async (client, message, args) => {
  const channel = message.channel;
  try {
    const {
      data: { joke }
    } = await axios.get("https://icanhazdadjoke.com/", {
      headers: {
        "User-Agent": "Discord Bot (https://github.com/desruc/discord-bot)",
        Accept: "application/json"
      }
    });
    channel.send(joke);
  } catch (error) {
    console.log("TCL: error", error);
    channel.send("Apologies. I'm all outta jokes right now.");
  }
};

module.exports = {
  name: "joke",
  aliases: ["pun"],
  category: "fun",
  description: "Returns a random joke.",
  run: joke
};
