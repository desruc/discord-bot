const { RichEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');
const {
  randomNumber,
  getBotChannel,
  getMember,
  asyncForEach,
  timeout,
  getUserRobot
} = require('../helpers');

const User = require('../database/models/userModel');
const Robot = require('../database/models/robotModel');
const ShopItem = require('../database/models/shopItemModel');

const shopItemDocuments = require('../constants/shopItems');

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
      .setColor('RANDOM')
      .setThumbnail(member.user.displayAvatarURL)
      .setTitle(`${member.displayName}'s Robot`)

      .addField(
        'Stats:',
        stripIndents`**Hit points:** ${userRobot.hitPoints}
          **Damage:** ${userRobot.damage}
          **Wins:** ${userRobot.wins || 0}
          **Losses:** ${userRobot.losses || 0}`,
        true
      );

    return embed;
  } catch (error) {
    console.error('Error getting robot stat card');
    throw error;
  }
};

/*
 * SHOP FUNCTIONS
 */

const incrementAllUserCurrency = async () => {
  try {
    await User.updateMany({}, { $inc: { currency: 20 } });
  } catch (error) {
    console.error('Error incrementing all users gold: ', error);
    throw error;
  }
};

const initializeShop = async message => {
  const { guild, channel, author, content } = message;

  const triggerMessage = `${process.env.BOT_PREFIX} initialize shop`;

  if (author.id === guild.owner.id && content === triggerMessage) {
    try {
      await ShopItem.insertMany(shopItemDocuments);
      channel.send('The shop is open for business!');
      await updateStock();
    } catch (error) {
      console.error('Error inserting shop items into database: ', error);
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
    console.error('Error updating stock stored in memory: ', error);
    throw error;
  }
};

const getStockCard = () => {
  const embed = new RichEmbed().setColor('RANDOM').setTitle(`One Stop Robot Shop`);

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

    if (currency >= itemPrice) {
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
    console.error('Error purchasing item: ', error);
    throw error;
  }
};

const getStock = () => currentStock;

/*
 * FIGHT FUNCTIONS
 */

const checkIfHit = () => {
  const rand = randomNumber(1, 10);
  if (rand <= 7) return true;
  return false;
};

const playerTurn = (user, opponent, message) => {
  const hit = checkIfHit();
  let winner = false;
  let msg = getMissMessage(user, opponent, message);
  if (hit) {
    const kill = opponent.hitPoints - user.damage <= 0;
    if (kill) {
      msg = getVictoryMessage(user, opponent, message);
      winner = true;
    } else msg = getHitMessage(user, opponent, message);
  }

  return { hit, msg, winner };
};

const simulateFight = async (message, userRecord) => {
  try {
    const { author, mentions, guild } = message;
    const opponent = mentions.members.first();

    if (opponent.user.bot)
      return message.reply("you are not ready to face my wrath...");

    if (!opponent) return message.reply('who do you want to challenge?');

    if (opponent.id === author.id)
      return message.reply("play with yourself in your own time!");

    const botChannel = await getBotChannel(guild);

    // Get each robot separately incase one hasn't been created
    const authorRobot = await getUserRobot(author.id);
    const opponentRobot = await getUserRobot(opponent.id);

    if (authorRobot.hasFought)
      return message.reply("you've already fought today...");

    const msg = await botChannel.send(
      `LET'S GET READY TO RUMBLE! ${author} VS ${getMember(
        message,
        opponentRobot.userId
      )}`
    );
    await timeout(2000);

    // Variables
    const fightMsgs = [];
    let authorTurn = null;
    let opponentTurn = null;
    let authorDmg = 0;
    let opponentDmg = 0;
    let winner = null;

    // Fight loop
    while (authorRobot.hitPoints > 0 && opponentRobot.hitPoints > 0) {
      authorTurn = playerTurn(authorRobot, opponentRobot, message);
      fightMsgs.push(authorTurn.msg);
      if (authorTurn.hit) {
        opponentRobot.hitPoints -= authorRobot.damage;
        authorDmg += authorRobot.damage;
      }
      if (authorTurn.winner) {
        winner = author;
        await authorRobot.updateOne({
          $inc: { wins: 1 },
          $set: { hasFought: true }
        });
        await opponentRobot.updateOne({
          $inc: { losses: 1 }
        });
        break;
      }

      opponentTurn = playerTurn(opponentRobot, authorRobot, message);
      fightMsgs.push(opponentTurn.msg);
      if (opponentTurn.hit) {
        authorRobot.hitPoints -= opponentRobot.damage;
        opponentDmg += opponentRobot.damage;
      }
      if (opponentTurn.winner) {
        winner = opponent;
        await opponentRobot.updateOne({
          $inc: { wins: 1 }
        });
        await authorRobot.updateOne({
          $inc: { losses: 1 },
          $set: { hasFought: true }
        });
        break;
      }
    }

    // Loop through messages updating every couple of seconds.
    await asyncForEach(fightMsgs, async fm => {
      await msg.edit(fm);
      await timeout(3000);
    });

    // After everything create embed card with results
    const embed = new RichEmbed()
      .setColor('RANDOM')
      .setTitle(`${message.member.displayName} VS ${opponent.displayName}`)
      .addField('Winner:', stripIndents`${winner}`, false)
      .addField(
        `${message.member.displayName} Damage Dealt:`,
        stripIndents`${authorDmg}`,
        false
      )
      .addField(
        `${opponent.displayName} Damage Dealt:`,
        stripIndents`${opponentDmg}`,
        false
      )
      .addField(
        `${message.member.displayName} Remaining HP:`,
        stripIndents`${authorRobot.hitPoints}`,
        false
      )
      .addField(
        `${opponent.displayName} Remaining HP:`,
        stripIndents`${opponentRobot.hitPoints}`,
        false
      );

    await msg.edit(embed);

    // Get winner profile and update their currency
    const authorWon = winner === author;
    await userRecord.updateOne({
      $inc: { currency: authorWon ? 500 : 400 }
    });
  } catch (error) {
    console.error('Error simulating fight: ', error);
    throw error;
  }
};

const getHitMessage = (user, opponent, message) => {
  const uName = getMember(message, user.userId);
  const oName = getMember(message, opponent.userId);
  const uDmg = user.damage;
  const oHp = opponent.hitPoints;
  const hit = [
    `${uName} draws faster and ${oName} takes ${uDmg} damage! Leaving them on ${oHp} hit points!`,
    `${uName} gives ${oName} an atomic wedgie!`,
    `${uName} strikes the low hanging fruit 🍌! ${oName} takes ${uDmg} damage.`,
    `${oName} is caught over-extending... ${uName} deals ${uDmg} damage!`,
    `${uName} hurts ${oName}'s feelings... they are now on ${oHp} hit points 😭`,
    `${uName} blows a hole through ${oName}'s leg!!!`,
    `${uName} roundhouse kicks ${oName}, leaving them on ${oHp} hit points.`,
    `${uName} transforms into a tank and runs down ${oName}...`,
    `KARATE CHOP!!! ${oName} is now on ${oHp} hit points.`,
    `${oName} is hit with a fridge!!! They're now on ${oHp} hit points.`,
    `${uName} throws out a sidewinder and connects! ${oName} is on ${oHp} hit points`,
    `The blinding radiance of ${uName}'s good looks is too much too handle... ${oName} has ${oHp} hit points left...`,
    `${oName} slips on a 🥒... they're on ${oHp} hit points.`,
    `${uName} drops ${oName} with a BATISTA BOMB!!!!!`,
    `GET OVER HERE! ${uName} reels ${oName} in and hits em with an uppercut.`,
    `WAAAHHHHHHHH!! ${oName} is now on ${oHp} hit points`
  ];
  const rand = randomNumber(0, hit.length - 1);
  return hit[rand];
};

const getMissMessage = (user, opponent, message) => {
  const uName = getMember(message, user.userId);
  const oName = getMember(message, opponent.userId);
  const miss = [
    `${uName} is too zoinked and misses!`,
    `${uName} has a mental breakdown and sobs in the corner. ${oName} takes no damage.`,
    `${uName} trips over their own ego and misses...`,
    `💨 WHIFF!! ${uName} misses their attack.`,
    `${uName} rolls a critical fail. ${oName} takes no damage...`,
    `ZZZ... ${uName} is fast asleep...`,
    `BZZRRT! ${uName}'s circuits are fried...`,
    `${uName} is recharging their batteries. They miss their turn.`,
    `${uName} attack catches nothing but air...`,
    `${uName} is caught with their pants down and misses`
  ];
  const rand = randomNumber(0, miss.length - 1);
  return miss[rand];
};

const getVictoryMessage = (user, opponent, message) => {
  const uName = getMember(message, user.userId);
  const oName = getMember(message, opponent.userId);
  const victory = [
    `${uName} crushes ${oName} with a powerful blow and claims the VICTORY!`,
    `${oName} takes the L! ${uName} is the WINNER!!!`,
    `${oName} runs away in fear. ${uName} takes the crown.`,
    `${oName}, your performance was embarrassing... ${uName} is the victor.`,
    `FATALITY! ${uName} WINS!`,
    `R A M P A G E! ${uName} wins...`,
    `${uName} rips out ${oName}'s processor and secures the victory!!!`,
    `What a mess! Someones gonna need to put ${oName} back together.... ${uName} wins!`,
    `${oName} disintegrates after being blasted by a nuke! ${uName} conqueror!`
  ];
  return victory[randomNumber(0, victory.length - 1)];
};

const resetHasFoughtFlags = async () => {
  try {
    await Robot.updateMany({}, { hasFought: false });
  } catch (error) {
    console.error('Error reseting daily hasFought flags: ', error);
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
  purchaseItem,
  simulateFight,
  resetHasFoughtFlags
};
