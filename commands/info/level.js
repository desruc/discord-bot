const { getUserLevelInfo } = require("../../services/levelingService");

const level = async (client, message, args) => {
  try {
    const { channel, author } = message;
    const userDetails = await getUserLevelInfo(message);
    const { currentLevel, experience, expToNextLevel } = userDetails;
    channel.send(
      `${author}, you are currently level ${currentLevel} and have ${experience} EXP! You need ${expToNextLevel} EXP to level up.`
    );
  } catch (error) {
    message.channel.send(`Sorry ${message.author}! I can't get your record right now`);
  }
};

module.exports = {
  name: "level",
  category: "info",
  description: "returns the users experience.",
  run: level
};
