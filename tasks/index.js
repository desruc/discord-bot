const schedule = require('node-schedule');

const { morningMeme } = require('../services/memeService');
const { updateStock } = require('../services/robotService');

module.exports = client => {
  // Post a meme to the channel at 8.30 every morning
  schedule.scheduleJob('30 8 * * *', function() {
    morningMeme(client);
  });

  // Refresh the robot store
  schedule.scheduleJob('* 3 * * *', async function() {
    try {
      await updateStock();
    } catch (error) {
      console.error('Error updating stock: ', error);
    }
  });
};
