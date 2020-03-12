const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const {
  randomNumber,
  getBotChannel,
  getMember,
  asyncForEach,
  timeout
} = require("../helpers");

const User = require("../database/models/userModel");
const Robot = require("../database/models/robotModel");
const ShopItem = require("../database/models/shopItemModel");

const shopItemDocuments = require("../constants/shopItems");

// Store the current items in memory for speed
let currentStock = [];

/*
 * GENERIC FUNCTIONS
 */

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

/*
 * SHOP FUNCTIONS
 */

const incrementAllUserCurrency = async () => {
  try {
    await User.updateMany({}, { $inc: { currency: 10 } });
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

/*
 * FIGHT FUNCTIONS
 */

const checkIfHit = () => {
  const rand = randomNumber(1, 30);
  if (rand < 11) return true;
  return false;
};

const playerTurn = (user, opponent) => {
  const hit = checkIfHit();
  let msg = `${user.userId}'s hit misses!`;
  if (hit)
    msg = `${user.userId} smashes ${opponent.userId} for ${user.damage} points!`;
  return { hit, msg };
};

const simulateFight = async message => {
  try {
    const { author, mentions } = message;
    const opponent = mentions.members.first();

    if (!opponent) return message.reply("who do you want to challenge?");

    const botChannel = await getBotChannel();

    // Get each robot separately incase one hasn't been created
    const authorRobot = getUserRobot(author.id);
    const opponentRobot = getUserRobot(opponent.id);

    const msg = await botChannel.send(
      `LET'S GET READY TO RUMBLE! ${author} VS ${getMember(
        message,
        opponentRobot.userId
      )}`
    );

    // Variables
    const fightMsgs = [];
    let authorTurn = null;
    let opponentTurn = null;

    // Fight loop
    while (authorRobot.hitPoints > 0 && opponentRobot.hitPoints > 0) {
      authorTurn = playerTurn(authorRobot, opponentRobot);
      fightMsgs.push(authorTurn.msg);
      if (authorTurn.hit) opponentRobot.hitPoints -= authorRobot.damage;

      opponentTurn = playerTurn(opponentRobot, authorRobot);
      fightMsgs.push(opponentTurn.msg);
      if (opponentTurn.hit) authorRobot.hitPoints -= opponentTurn.damage;
    }

    // Determine winner based on hitpoints and add victory message
    let victoryMsg = "";
    let winner = null;
    const authorWin = authorRobot.hitPoints > 0;
    if (authorWin) {
      victoryMsg = `${authorRobot.id} is the victor! They survived with ${authorRobot.hitPoints}`;
      winner = author;
    } else {
      victoryMsg = `${opponentRobot.id} is the victor! They survived with ${opponentRobot.hitPoints}`;
      winner = getMember(message, opponentRobot.userId);
    }
    fightMsgs.push(victoryMsg);

    // Loop through messages updating every couple of seconds.
    await asyncForEach(fightMsgs, async fm => {
      await msg.edit(fm);
      await timeout(3000);
    });

    // Add edit to victory message
    await msg.edit(victoryMsg);
    await timeout(5000);

    // After everything create embed card with results
    const embed = new RichEmbed()
      .setColor("RANDOM")
      .setTitle(`${author} VS ${getMember(message, opponentRobot.userId)}`)
      .addField("Winner", stripIndents`${winner}`, false);

    await msg.edit(embed);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  incrementAllUserCurrency,
  getStatCard,
  initializeShop,
  updateStock,
  getStock,
  getStockCard,
  purchaseItem
};
