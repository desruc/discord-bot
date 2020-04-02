const talkedRecently = new Set();

const getTalkedRecently = () => talkedRecently;

const checkCooldown = (userRecord, command) => {
  let timeRemaining = 0;
  let onCooldown = false;

  const { cooldowns } = userRecord;
  const cooldownRecord = cooldowns.find(c => c.command === command.name);
  if (cooldownRecord) {
    const { timestamp } = cooldownRecord;
    if (timestamp > Date.now()) {
      onCooldown = true;
      timeRemaining = timestamp - Date.now();
    }
  }
  return { onCooldown, timeRemaining };
};

const updateCooldown = async (userRecord, command) => {
  if (command.cooldown) {
    const { cooldowns } = userRecord;
    const cooldownRecord = cooldowns.find(c => c.command === command.name);
    if (cooldownRecord) {
      await userRecord.updateOne(
        { $set: { 'cooldowns.$[el].timestamp': Date.now() + command.cooldown } },
        { arrayFilters: [{ 'el.command': command.name }], new: true }
      );
    } else {
      await userRecord.updateOne({
        $push: {
          cooldowns: {
            command: command.name,
            timestamp: Date.now() + command.cooldown
          }
        }
      });
    }
  }
};

const msToString = ms => {
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 60);
  const mins = Math.floor((ms / (1000 * 60)) % 60);
  const seconds = Math.floor((ms / 1000) % 60);

  if (hours > 0) return `${hours} hours and ${mins} minutes`;
  if (mins > 0) return `${mins} minutes and ${seconds} seconds`;
  return `${seconds} seconds`;
};

const getCooldownMessage = (command, ms) => {
  const timeRemaining = msToString(ms);
  let message = `you'll have to wait another ${timeRemaining} before using that command.`;
  if (command.cooldownMessage) message = command.cooldownMessage;
  if (command.cooldownMessage && command.showCooldown)
    message = `${command.cooldownMessage} (${timeRemaining} remaining)`;
  return message;
};

module.exports = {
  getTalkedRecently,
  checkCooldown,
  updateCooldown,
  getCooldownMessage
};
