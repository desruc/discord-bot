const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { getMember } = require("../helpers");

const User = require("../database/models/userModel");
const Robot = require("../database/models/robotModel");

const incrementAllUserCurrency = async () => {
  try {
    await User.updateMany({}, { $inc: { currency: 9 } });
  } catch (error) {
    throw error;
  }
};

const getUserRobot = async userId => {
  try {
    const result = await Robot.findOne({ userId });

    if (result) return result;

    const newRecord = await new Robot({
      userId
    }).save();
    return newRecord;
  } catch (error) {
    throw error;
  }
};

const getStatCard = async (message, args) => {
  try {
    await simulateFight(message);
    const member = getMember(message, args.join(" "));
    const userRobot = await getUserRobot(member.id);

    const embed = new RichEmbed()
      .setColor("RANDOM")
      .setThumbnail(member.user.displayAvatarURL)
      .setTitle(`${member.displayName}'s Robot`)

      .addField(
        "Stats:",
        stripIndents`**Hit points:** ${userRobot.hitPoints}
          **Damage:** ${userRobot.damage}`,
        true
      );

    return embed;
  } catch (error) {
    throw error;
  }
};

const simulateFight = async message => {
  try {
    const { author, mentions } = message;
    const opponent = mentions.members.first();

    if (!opponent) return message.reply("who do you wan't to challenge?");

    // Get each robot seperately incase one hasn't been created
    const authorRobot = getUserRobot(author.id);
    const opponentRobot = getUserRobot(opponent.id);

    // TODO: Fight!

  } catch (error) {
    throw error;
  }
};

module.exports = {
  incrementAllUserCurrency,
  getStatCard,
  simulateFight
};
