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

module.exports = {
  getRichestUsers,
  updateCurrency,
  grantDailyGold
};
