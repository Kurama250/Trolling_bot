/**
Create by Kurama
Github.com/Kurama250
Licence : Creative commons - CC BY-NC-ND 4.0
*/

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('movebyrole')
    .setDescription("Moves members with a specific role to a target voice channel.")
    .addChannelOption(option =>
      option.setName('target')
        .setDescription('The target voice channel')
        .setRequired(true))
    .addRoleOption(option =>
      option.setName('role')
        .setDescription('The role of members to move')
        .setRequired(true)),
  async execute(interaction) {
    const targetChannel = interaction.options.getChannel('target');
    const role = interaction.options.getRole('role');

    if (targetChannel.type !== 2) {
      const errorEmbed = new EmbedBuilder().setColor('#FF0000').setTitle('Error').setDescription("Target must be a voice channel.");
      return interaction.reply({ embeds: [errorEmbed] });
    }

    interaction.guild.channels.cache
      .filter(channel => channel.type === 2)
      .forEach(channel => channel.members.forEach(member => {
        if (member.roles.cache.has(role.id)) {
          member.voice.setChannel(targetChannel);
        }
      }));

    const successEmbed = new EmbedBuilder().setColor('#00FF00').setTitle('Success').setDescription(`Members with the role **${role.name}** have been moved to **${targetChannel.name}**.`);
    interaction.reply({ embeds: [successEmbed] });
  }
};
