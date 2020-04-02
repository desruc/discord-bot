const levelRoles = require('../constants/levelRanks');
const { asyncForEach } = require('../utils/helpers');
const User = require('../models/userModel');

// Create the roles on the server
const initializeLevelRoles = async message => {
  const { guild } = message;

  await asyncForEach(levelRoles, async ({ name, color, level }) => {
    try {
      await guild.createRole({
        name,
        color,
        position: level,
        hoist: true
      });
      console.info(`Successfully created the '${name}' role!`);
    } catch (error) {
      console.info(`There was an error creating the '${name}' role`);
    }
  });
};

const calculateExperience = message => {
  const { embeds, attachments } = message;
  if (message.content.toLowerCase().indexOf(process.env.BOT_PREFIX) === 0) return 3;
  if (attachments.length > 0) return 21;
  if (embeds.length > 0) return 14;
  return 7;
};

const expForLevel = num => {
  let exp = 0;
  for (let i = 1; i < num; i++) {
    exp += i * 50;
  }
  return exp;
};

const calculateLevel = experience => {
  const levels = [];
  for (let i = 0; i < 100; i++) {
    levels.push({ level: i, experience: expForLevel(i) });
  }
  let userLevel = 0;
  levels.forEach(l => {
    if (experience >= l.experience) userLevel = l.level;
  });
  return userLevel;
};

const updateRole = async (message, userExperience) => {
  const { guild, member, channel } = message;

  const currentLevel = calculateLevel(userExperience);

  let roleName = '';
  levelRoles.forEach(({ level, name }) => {
    if (currentLevel >= level) roleName = name;
  });

  // Get the role object
  const role = guild.roles.find(r => r.name === roleName);

  if (role) {
    const alreadyHasRole = member.roles.has(role.id);

    if (!alreadyHasRole) {
      try {
        await member.addRole(role);
        channel.send(
          `Congratulations ${member}! You've ascended to a ${role.name}!`
        );
      } catch (error) {
        channel.send(
          `${member} leveled up but there was an error granting their rank!`
        );
      }
    }
  } else {
    // Role doesn't exist - leveling system hasn't been initialized
    return false;
  }
};

const incrementExperience = async (message, userRecord) => {
  if (message.channel.name !== process.env.MOD_CHANNEL) {
    try {
      const { experience: currentExperience } = userRecord;

      // Update their record with experience gained
      const experienceGained = calculateExperience(message);
      const updatedExperience = currentExperience + experienceGained;
      await userRecord.updateOne({
        experience: updatedExperience
      });

      // Check and update their role
      await updateRole(message, updatedExperience);
    } catch (error) {
      message.channel.send(
        `Sorry ${message.author}, there was a problem incrementing your experience`
      );
    }
  }
};

const getUserLevelInfo = async userRecord => {
  const { experience } = userRecord;
  const currentLevel = calculateLevel(experience);
  const expToNextLevel = Math.ceil(
    Number(expForLevel(currentLevel + 1) - experience)
  );

  return {
    currentLevel,
    experience,
    expToNextLevel
  };
};

const getLevelLeaderboard = async () => {
  try {
    const result = User.find({})
      .sort({ experience: -1 })
      .limit(5);
    return result;
  } catch (error) {
    console.error('Error retrieving level leaderboard: ', error);
    throw error;
  }
};

module.exports = {
  initializeLevelRoles,
  incrementExperience,
  getUserLevelInfo,
  calculateLevel,
  getLevelLeaderboard
};
