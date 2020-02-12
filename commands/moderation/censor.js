const { randomNumber } = require("../../functions");

const censor = async (client, message, args) => {
  const replies = [
    "do you kiss your mother with that mouth?",
    "behave or I'll tell your father about your behavior",
    "wash your mouth out with soap",
    "try that again with less attitude",
    "you are one sick puppy"
  ];
  return message.reply(replies[randomNumber(replies.length)]);
};

module.exports = censor;
