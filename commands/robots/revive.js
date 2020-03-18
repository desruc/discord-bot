const { resetUserRobotHealth } = require("../../services/robotService");
const { getBotChannel } = require("../../helpers");

const revive = async (client, message, args, userRecord) => {
  try {
    const { channel, author } = message;
    const botChannel = await getBotChannel(message.guild);

    if (channel !== botChannel && message.deletable) {
      message.delete();
    }

    const { currency } = userRecord;

    if (currency < 50)
      return message.reply(
        `I'm not running a charity, come back when you have $50...`
      );

    await resetUserRobotHealth(author.id);

    return botChannel.send(
      `get back out there ${author}! Your hit points have been topped up.`
    );
  } catch (error) {
    console.error("Error reviving robot: ", error);
    const { author } = message;
    const botChannel = await getBotChannel(message.guild);
    botChannel.send(
      `Sorry ${author}! There was an error reviving your robot...`
    );
  }
};

// module.exports = {
//   name: "revive",
//   category: "robots",
//   description: "restores your daily hitpoints for $50",
//   run: revive
// };
