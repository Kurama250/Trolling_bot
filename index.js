/**
Create by Kurama
Github.com/Kurama250
Licence : Creative commons - CC BY-NC-ND 4.0
*/

const { Client, GatewayIntentBits, Collection, REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');
const { token, clientId } = require('./config.json');

const antiLeaveMap = new Map();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates,
  ],
});
client.commands = new Collection();

const commands = [];
const cmdPath = path.join(__dirname, 'cmd');
fs.readdirSync(cmdPath).forEach(file => {
  const command = require(`./cmd/${file}`);
  client.commands.set(command.data.name, command);
  commands.push(command.data.toJSON());
});

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
  try {
    console.log('Starting the update of commands (/) on Discord.');
    await rest.put(Routes.applicationCommands(clientId), { body: commands });
    console.log('Slash commands updated successfully.');
  } catch (error) {
    console.error('Error updating commands:', error);
  }
})();

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;
  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction, antiLeaveMap);
  } catch (error) {
    console.error(`Error executing command ${interaction.commandName}:`, error);
    await interaction.reply({ content: 'Error executing the command.', ephemeral: true });
  }
});

client.on('voiceStateUpdate', async (oldState, newState) => {
  const userId = newState.id;

  if (antiLeaveMap.has(userId)) {
    const originalChannelId = antiLeaveMap.get(userId);

    if (!newState.channelId || oldState.channelId !== newState.channelId) {
      const originalChannel = newState.guild.channels.cache.get(originalChannelId);
      
      if (originalChannel) {
        if (newState.member.voice.channel) {
          try {
            await newState.member.voice.setChannel(originalChannel);
          } catch (error) {
            console.error('Error moving user back to original channel:', error);
          }
        }
      }
    }
  }
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

client.login(token)
  .catch(err => console.error('Error connecting the bot :', err));
