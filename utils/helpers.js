const moment = require('moment');

// Get a member in the guild
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

// Change date to Australian format
const formatDate = date => moment(date).format('DD/MM/YYYY');

// Async for each method!
const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

// Get a random number
const randomNumber = (min, max) => {
  const strictMin = Math.ceil(Number(min));
  const strictMax = Math.floor(Number(max));
  return Math.floor(Math.random() * (strictMax - strictMin + 1)) + strictMin;
};

// Get base server channel
const getBaseChannel = async client => {
  const { id: channelId } = await client.channels
    .filter(({ type }) => type === 'text')
    .first();
  return await client.channels.get(channelId);
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
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

module.exports = {
  getMember,
  formatDate,
  randomNumber,
  asyncForEach,
  getBotChannel,
  checkNumber,
  sleep,
  getBaseChannel
};
