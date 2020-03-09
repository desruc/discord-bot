const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { randomNumber } = require("../helpers");

const User = require("../database/models/userModel");
const Robot = require("../database/models/robotModel");
const ShopItem = require("../database/models/shopItemModel");

const shopItemDocuments = require("../constants/shopItems");

// Store the current items in memory for speed
let currentStock = [];

const incrementAllUserCurrency = async () => {
  try {
    await User.updateMany({}, { $inc: { currency: 10 } });
  } catch (error) {
    throw error;
  }
};

const getStatCard = async (message, args, userRecord) => {
  try {
    const { member } = message;
    const { robot: userRobot } = userRecord;

    const embed = new RichEmbed()
      .setColor("RANDOM")
      .setThumbnail(member.user.displayAvatarURL)
      .setTitle(`${member.displayName}'s Robot`)

      .addField(
        "Stats:",
        stripIndents`**Hit points:** ${userRobot.hitPoints}
          **Damage:** ${userRobot.damage}`,
        true
      );

    return embed;
  } catch (error) {
    throw error;
  }
};

const initializeShop = async message => {
  const { guild, channel, author, content } = message;

  const triggerMessage = `${process.env.BOT_PREFIX} initialize shop`;

  if (author.id === guild.owner.id && content === triggerMessage) {
    try {
      await ShopItem.insertMany(shopItemDocuments);
      channel.send("The shop is open for business!");
      await updateStock();
    } catch (error) {
      throw error;
    }
  }
};

const updateStock = async () => {
  try {
    const itemDocuments = await ShopItem.aggregate([{ $sample: { size: 4 } }]);

    if (itemDocuments.length === 0) {
      return false;
    } else {
      currentStock = itemDocuments.map((doc, idx) => ({
        index: idx + 1,
        name: doc.name,
        cost: randomNumber(Number(doc.minCost), Number(doc.maxCost)),
        value: randomNumber(doc.minValue, doc.maxValue),
        type: doc.type
      }));
      return true;
    }
  } catch (error) {
    throw error;
  }
};

const getStockCard = () => {
  const embed = new RichEmbed()
    .setColor("RANDOM")
    .setTitle(`One Stop Robot Shop`);

  currentStock.forEach((item, idx) => {
    embed.addField(
      `**Item ${idx + 1}**:`,
      stripIndents`Name: ${item.name}
    Info: Increases ${item.type} by ${item.value}
    Cost: $${item.cost}`,
      true
    );
  });

  return embed;
};

const simulateFight = async message => {
  try {
    const { author, mentions } = message;
    const opponent = mentions.members.first();

    if (!opponent) return message.reply("who do you want to challenge?");

    // Get each robot separately incase one hasn't been created
    const authorRobot = getUserRobot(author.id);
    const opponentRobot = getUserRobot(opponent.id);

    // TODO: Fight!
  } catch (error) {
    throw error;
  }
};

const purchaseItem = async (userRecord, itemNumber) => {
  try {
    const { currency } = userRecord;
    const item = currentStock[itemNumber - 1];
    const itemPrice = Number(item.cost);

    if (currency > itemPrice) {
      await userRecord.updateOne({ $inc: { currency: -itemPrice } });
      await Robot.findOneAndUpdate(
        { userId: userRecord.userId },
        { $inc: { [item.type]: item.value } },
        { new: true }
      );
      return true;
    }
    return false;
  } catch (error) {
    throw error;
  }
};

const getStock = () => currentStock;

module.exports = {
  incrementAllUserCurrency,
  getStatCard,
  initializeShop,
  updateStock,
  getStock,
  getStockCard,
  purchaseItem
};
