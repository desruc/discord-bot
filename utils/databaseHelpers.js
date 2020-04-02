const User = require('../models/userModel');
const Robot = require('../models/robotModel');

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

module.exports = {
  getUserRobot,
  getUserDatabaseRecord
};
