const moment = require('moment');
const User = require('./database/models/userModel');
const Robot = require('./database/models/robotModel');

const talkedRecently = new Set();

const getTalkedRecently = () => talkedRecently;

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
    console.error('Error retrieving users robot: ', error);
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
    console.error('Error getting users database record: ', error);
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
      console.error('Error getting/creating bot channel: ', error);
      throw error;
    }
  }
  return channel;
};

// Check if a number is valid
const checkNumber = num => !isNaN(Number(num)) && isFinite(Number(num));

// Pause a function for the specified time
const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));

const getBaseChannel = async client => {
  const { id: channelId } = await client.channels
    .filter(({ type }) => type === 'text')
    .first();
  return await client.channels.get(channelId);
};

const checkCooldown = (userRecord, command) => {
  let timeRemaining = 0;
  let onCooldown = false;

  const { cooldowns } = userRecord;
  const cooldownRecord = cooldowns.find(c => c.command === command.name);
  if (cooldownRecord) {
    const { timestamp } = cooldownRecord;
    if (timestamp > Date.now()) {
      onCooldown = true;
      timeRemaining = timestamp - Date.now();
    }
  }
  return { onCooldown, timeRemaining };
};

const updateCooldown = async (userRecord, command) => {
  if (command.cooldown) {
    const { cooldowns } = userRecord;
    const cooldownRecord = cooldowns.find(c => c.command === command.name);
    if (cooldownRecord) {
      await userRecord.updateOne(
        { $set: { 'cooldowns.$[el].timestamp': Date.now() + command.cooldown } },
        { arrayFilters: [{ 'el.command': command.name }], new: true }
      );
    } else {
      await userRecord.updateOne({
        $push: {
          cooldowns: {
            command: command.name,
            timestamp: Date.now() + command.cooldown
          }
        }
      });
    }
  }
};

const msToString = ms => {
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 60);
  const mins = Math.floor((ms / (1000 * 60)) % 60);
  const seconds = Math.floor((ms / 1000) % 60);

  if (hours > 0) return `${hours} hours and ${mins} minutes`;
  if (mins > 0) return `${mins} minutes and ${seconds} seconds`;
  return `${seconds} seconds`;
};

const getCooldownMessage = (command, ms) => {
  const timeRemaining = msToString(ms);
  let message = `you'll have to wait another ${timeRemaining} before using that command.`;
  if (command.cooldownMessage) message = command.cooldownMessage;
  if (command.cooldownMessage && command.showCooldown)
    message = `${command.cooldownMessage} (${timeRemaining} remaining)`;
  return message;
};

module.exports = {
  getMember,
  formatDate,
  randomNumber,
  asyncForEach,
  getUserDatabaseRecord,
  getBotChannel,
  checkNumber,
  timeout,
  getUserRobot,
  getBaseChannel,
  checkCooldown,
  updateCooldown,
  msToString,
  getCooldownMessage,
  getTalkedRecently
};
