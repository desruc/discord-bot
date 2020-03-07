const {
  getUserLevelInfo,
  getLevelChannel
} = require("../../services/levelingService");

const level = async (client, message, args, userRecord) => {
  try {
    const levelChannel = await getLevelChannel(message.guild);

    const { channel, author } = message;
    if (channel.name !== "levels" && message.deletable) {
      message.delete();
    }

    const userDetails = await getUserLevelInfo(userRecord);
    const { currentLevel, experience, expToNextLevel } = userDetails;
    levelChannel.send(
      `${author}, you are currently level ${currentLevel} and have ${experience} EXP! You need ${expToNextLevel} EXP to level up.`
    );
  } catch (error) {
    const levelChannel = await getLevelChannel(message.guild);
    levelChannel.send(
      `Sorry ${message.author}! I can't get your record right now`
    );
  }
};

module.exports = {
  name: "level",
  category: "info",
  description: "returns the users experience.",
  aliases: ["xp"],
  run: level
};
