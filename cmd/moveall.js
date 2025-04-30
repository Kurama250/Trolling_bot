/**
Create by Kurama
Github.com/Kurama250
Licence : Creative commons - CC BY-NC-ND 4.0
*/

const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, ChannelType } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('moveall')
    .setDescription("Moves all members from all voice channels to a target voice channel.")
    .addChannelOption(option =>
      option.setName('target')
        .setDescription('The target voice channel')
        .setRequired(true)),
  async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
            return interaction.reply({ content: "You don't have permission to use this command.", ephemeral: true });
        }
        
    const targetChannel = interaction.options.getChannel('target');

    if (targetChannel.type !== 2) {
      const errorEmbed = new EmbedBuilder().setColor('#FF0000').setTitle('Error').setDescription("Target must be a voice channel.");
      return interaction.reply({ embeds: [errorEmbed] });
    }

    interaction.guild.channels.cache
      .filter(channel => channel.type === 2)
      .forEach(channel => channel.members.forEach(member => member.voice.setChannel(targetChannel)));

    const successEmbed = new EmbedBuilder().setColor('#00FF00').setTitle('Success').setDescription(`All members have been moved to **${targetChannel.name}**.`);
    interaction.reply({ embeds: [successEmbed] });
  }
};
