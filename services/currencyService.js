const User = require("../database/models/userModel");

const incrementAllUserCurrency = async () => {
  try {
    await User.updateMany({}, { $inc: { currency: 9 } });
  } catch (error) {
    throw error;
  }
};

const getUserCurrency = async userId => {
  try {
    const result = await User.findOne({ userId });
    const { currency } = result;
    return currency;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  incrementAllUserCurrency,
  getUserCurrency
};
