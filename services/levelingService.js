const UserExperience = require("../database/models/userExperienceModel");

// Check if record exits / create one
const getUserExperienceRecord = async userId => {
  try {
    const result = await UserExperience.findOne({ userId });
    // If a user record exists - return it
    if (result) return result;

    // Otherwise create a new record and return that
    const newRecord = await new UserExperience({
      userId,
      experience: 0
    }).save();
    return newRecord;
  } catch (error) {
    throw error;
  }
};

const experienceToAdd = message => {
  // Check if text, attachment, link, bot interaction
  return 7;
};

const updateRole = user => {
  // TODO
}

module.exports = {
  getUserExperienceRecord
};
