const User = require('../models/userModel');

const getRichestUsers = async () => {
  const result = await User.find({})
    .sort({ currency: -1 })
    .limit(5);
  return result;
};

const updateCurrency = async (userRecord, amount) => {
  const result = await userRecord.updateOne({ $inc: { currency: amount } });
  return result;
};

const grantDailyGold = async (userRecord, streak, amount) => {
  const result = userRecord.updateOne({
    $set: { 'daily.streak': streak, 'daily.timestamp': Date.now() },
    $inc: { currency: amount }
  });
  return result;
};

const transferFunds = async (user, recipient, amount) => {
  const userResult = await User.findOneAndUpdate(
    { userId: user.id },
    { $inc: { currency: -amount } }
  );
  const recipientResult = await User.findOneAndUpdate(
    { userId: recipient.id },
    { $inc: { currency: amount } }
  );
  return { userResult, recipientResult };
};

module.exports = {
  getRichestUsers,
  updateCurrency,
  grantDailyGold,
  transferFunds
};
