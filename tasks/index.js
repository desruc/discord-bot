const schedule = require("node-schedule");

const {
  morningMeme,
  clearUsersRequestedMeme
} = require("../services/memeService");
const { incrementAllUserCurrency } = require("../services/currencyService");

module.exports = client => {
  // Post a meme to the channel at 8.30 every morning
  const meme = schedule.scheduleJob("30 8 * * *", function() {
    console.info(`morningMeme will next run at ${meme.nextInvocation()}`);
    morningMeme(client);
  });

  // Clear the usersRequestedMeme record daily at 1am - only two memes per day
  const clearMemeRecords = schedule.scheduleJob("* 1 * * *", async function() {
    try {
      await clearUsersRequestedMeme();
    } catch (error) {
      console.error("Error clearing user meme requested: ", error);
    }
  });

  // Increment all users currency by 10 every hour
  const handOutGold = schedule.scheduleJob("1 * * * *", async function() {
    try {
      await incrementAllUserCurrency();
    } catch (error) {
      console.error("Error incrementing currency: ", error);
    }
  });

  console.info(
    `the first handOutGold will run at ${handOutGold.nextInvocation()}`
  );
  console.info(`the first morningMeme will run at ${meme.nextInvocation()}`);
  console.info(
    `the first clearMemeRecords will run at ${clearMemeRecords.nextInvocation()}`
  );
};
