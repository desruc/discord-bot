const moment = require("moment");
const User = require("./database/models/userModel");

module.exports = {
  getMember: function(message, toFind = "") {
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
  },

  formatDate: function(date) {
    return moment(date).format("DD/MM/YYYY");
  },

  randomNumber: function(number) {
    return Math.ceil(Math.random() * (Number(number) - 1));
  },

  checkForSwears: function(sentence) {
    const swears = ["fuck", "shit", "dick", "tits", "porn", "cunt", "cock"];
    return swears.some(swear => sentence.includes(swear));
  },

  asyncForEach: async function(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  },

  getUserDatabaseRecord: async function(userId) {
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
  }
};
