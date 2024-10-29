/**
Create by Kurama
Github.com/Kurama250
Licence : Creative commons - CC BY-NC-ND 4.0
*/

const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');
const { token } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates] });
client.commands = new Collection();

const cmdPath = path.join(__dirname, 'cmd');
fs.readdirSync(cmdPath).forEach(file => {
  const command = require(`./cmd/${file}`);
  client.commands.set(command.data.name, command);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;
  const command = client.commands.get(interaction.commandName);
  if (command) await command.execute(interaction, client);
});

const eventPath = path.join(__dirname, 'event');
fs.readdirSync(eventPath).forEach(file => {
  const event = require(`./event/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client));
  } else {
    client.on(event.name, (...args) => event.execute(...args, client));
  }
});

client.login(token);
