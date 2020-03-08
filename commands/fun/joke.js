const axios = require("axios");

const joke = async (client, message, args) => {
  const { channel } = message;
  try {
    const msg = await channel.send("Hold up, just thinking of a good one...");
    const {
      data: { joke }
    } = await axios.get("https://icanhazdadjoke.com/", {
      headers: {
        "User-Agent": "Discord Bot (https://github.com/desruc/discord-bot)",
        Accept: "application/json"
      }
    });
    msg.edit(joke);
  } catch (error) {
    console.error("Error with joke command: ", error);
    channel.send("Apologies. I'm all outta jokes right now.");
  }
};

module.exports = {
  name: "joke",
  aliases: ["pun"],
  category: "fun",
  description: "returns a random joke.",
  run: joke
};
