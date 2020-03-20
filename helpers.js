const moment = require('moment');
const User = require('./database/models/userModel');
const Robot = require('./database/models/robotModel');

const getMember = (message, toFind = '') => {
  toFind = toFind.toLowerCase();

  let target = message.guild.members.get(toFind);

  if (!target && message.mentions.members) target = message.mentions.members.first();

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

const formatDate = date => moment(date).format('DD/MM/YYYY');

const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

const randomNumber = (min, max) => {
  const strictMin = Math.ceil(Number(min));
  const strictMax = Math.floor(Number(max));
  return Math.floor(Math.random() * (strictMax - strictMin + 1)) + strictMin;
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

const getUserDatabaseRecord = async userId => {
  try {
    const result = await User.findOne({ userId });

    let robotDocId = '';
    if (!result || !result.robot) {
      const robotResult = await getUserRobot(userId);
      robotDocId = robotResult._id;
    }

    if (result && !result.robot) {
      await result.updateOne({ robot: robotDocId });
    }

    // If a user record exists - return it
    if (result && result.robot) return result;

    // Otherwise create a new record and return that
    if (!result) {
      await new User({
        userId,
        experience: 0,
        memesRequested: 0,
        robot: robotDocId
      }).save();
    }

    // Has to be a better way than this
    const newRecord = await User.findOne({ userId });

    return newRecord;
  } catch (error) {
    throw error;
  }
};

const getBotChannel = async guild => {
  const channel = guild.channels.find(
    channel => channel.name === process.env.BOT_CHANNEL
  );
  if (!channel) {
    try {
      const result = await guild.createChannel(process.env.BOT_CHANNEL, {
        type: 'text'
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
  return channel;
};

const checkNumber = num => !isNaN(Number(num)) && isFinite(Number(num));

const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));

module.exports = {
  getMember,
  formatDate,
  randomNumber,
  asyncForEach,
  getUserDatabaseRecord,
  getBotChannel,
  checkNumber,
  timeout,
  getUserRobot
};
