/**
Create by Kurama
Github.com/Kurama250
Licence : Creative commons - CC BY-NC-ND 4.0
*/

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
let antiLeaveActive = false;

module.exports = {
  data: new SlashCommandBuilder()
    .setName('anti-leave')
    .setDescription("Activates or deactivates anti-leave.")
    .addUserOption(option =>
      option.setName('user')
        .setDescription('The user to apply anti-leave to')
        .setRequired(true))
    .addBooleanOption(option =>
      option.setName('activate')
        .setDescription('Activate or deactivate anti-leave')
        .setRequired(true)),
  async execute(interaction) {
    const user = interaction.options.getUser('user');
    antiLeaveActive = interaction.options.getBoolean('activate');

    const status = antiLeaveActive ? "activated" : "deactivated";
    const embed = new EmbedBuilder().setColor('#00FF00').setTitle('Anti-Leave Status').setDescription(`Anti-leave has been ${status} for ${user.tag}.`);
    interaction.reply({ embeds: [embed] });
  }
};
