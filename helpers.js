const moment = require("moment");
const User = require("./database/models/userModel");

const getMember = (message, toFind = "") => {
  toFind = toFind.toLowerCase();

  let target = message.guild.members.get(toFind);

  if (!target && message.mentions.members)
    target = message.mentions.members.first();

  if (!target && toFind) {
    target = message.guild.members.find(member => {
      return (
        member.displayName.toLowerCase().includes(toFind) ||
        member.user.tag.toLowerCase().includes(toFind)
      );
    });
  }

  if (!target) target = message.member;

  return target;
};

const formatDate = date => moment(date).format("DD/MM/YYYY");

const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

const randomNumber = (min, max) => {
  if (min === 0) {
    return Math.ceil(Math.random() * (Number(max) - 1));
  }
  return (
    Math.floor(
      Math.random() * (Math.ceil(Number(max)) - Math.floor(Number(min)))
    ) + Number(min)
  );
};

const getUserDatabaseRecord = async userId => {
  try {
    const result = await User.findOne({ userId });

    // If a user record exists - return it
    if (result) return result;

    // Otherwise create a new record and return that
    const newRecord = await new User({
      userId,
      experience: 0,
      memesRequested: 0
    }).save();

    return newRecord;
  } catch (error) {
    throw error;
  }
};

const getBotChannel = async guild => {
  const channel = guild.channels.find(channel => channel.name === "bot");
  if (!channel) {
    try {
      const result = await guild.createChannel("bot", { type: "text" });
      return result;
    } catch (error) {
      throw error;
    }
  }
  return channel;
};

module.exports = {
  getMember,
  formatDate,
  randomNumber,
  asyncForEach,
  getUserDatabaseRecord,
  getBotChannel
};
