const moment = require("moment");

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

  checkForSwears: function(args) {
    const swears = ["fuck", "shit", "dick", "tits", "porn"];
    return args.some(arg => swears.includes(arg));
  }
};
