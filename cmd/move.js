/**
Create by Kurama
Github.com/Kurama250
Licence : Creative commons - CC BY-NC-ND 4.0
*/

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('move')
    .setDescription("Moves all members from one voice channel to another.")
    .addChannelOption(option =>
      option.setName('source')
        .setDescription('The source voice channel')
        .setRequired(true))
    .addChannelOption(option =>
      option.setName('target')
        .setDescription('The target voice channel')
        .setRequired(true)),
  async execute(interaction) {
    const sourceChannel = interaction.options.getChannel('source');
    const targetChannel = interaction.options.getChannel('target');

    if (sourceChannel.type !== 2 || targetChannel.type !== 2) {
      const errorEmbed = new EmbedBuilder().setColor('#FF0000').setTitle('Error').setDescription("Both channels must be voice channels.");
      return interaction.reply({ embeds: [errorEmbed] });
    }

    sourceChannel.members.forEach(member => member.voice.setChannel(targetChannel));
    const successEmbed = new EmbedBuilder().setColor('#00FF00').setTitle('Success').setDescription(`All members have been moved from **${sourceChannel.name}** to **${targetChannel.name}**.`);
    interaction.reply({ embeds: [successEmbed] });
  }
};
