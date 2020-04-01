const fs = require('fs');

const syncCommands = client => {
  fs.readdirSync('./commands/').forEach(dir => {
    const commands = fs
      .readdirSync(`./commands/${dir}/`)
      .filter(file => file.endsWith('.js'));

    commands.forEach(file => {
      let pull = require(`../commands/${dir}/${file}`);

      if (pull.name) client.commands.set(pull.name, pull);

      if (pull.aliases && Array.isArray(pull.aliases))
        pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
    });
  });
};

const initializeEvents = client => {
  fs.readdir('./events/', (err, files) => {
    files.forEach(file => {
      const handler = require(`../events/${file}`);
      const event = file.split('.')[0];
      client.on(event, arg => handler(client, arg));
    });
  });
};

module.exports = {
  syncCommands,
  initializeEvents
};
