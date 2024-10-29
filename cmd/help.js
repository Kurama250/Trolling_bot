/**
Create by Kurama
Github.com/Kurama250
Licence : Creative commons - CC BY-NC-ND 4.0
*/

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Displays a list of available commands'),
  async execute(interaction) {
    const helpEmbed = new EmbedBuilder()
      .setColor('#00FF00')
      .setTitle('Available Commands')
      .setDescription(`
        **/move** : Move members from one voice channel to another.
        **/moveall** : Move all members to a specified voice channel.
        **/movebyrole** : Move members with a specific role to a target voice channel.
        **/anti-leave** : Activate or deactivate anti-leave.
      `);
    await interaction.reply({ embeds: [helpEmbed] });
  }
};
