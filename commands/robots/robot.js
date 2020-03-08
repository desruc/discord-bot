const { getStatCard } = require("../../services/robotService");

const robot = async (client, message, args) => {
  try {
    const { channel } = message;
    const statCard = await getStatCard(message, args);
    return channel.send(statCard);
  } catch (error) {
    console.error("Error getting roboto stat card: ", error);
    message.channel.send(
      "Sorry! There was an error retrieving your robots stats..."
    );
  }
};

module.exports = {
  name: "robot",
  category: "robots",
  description: "returns the users robot stat card",
  run: robot
};
