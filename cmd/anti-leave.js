/**
Create by Kurama
Github.com/Kurama250
Licence : Creative commons - CC BY-NC-ND 4.0
*/

const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('anti-leave')
    .setDescription("Enable or disable anti-leave for a user.")
    .addUserOption(option =>
      option.setName('member')
        .setDescription('The member to apply anti-leave')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('action')
        .setDescription('Enable or disable anti-leave')
        .addChoices(
          { name: 'Enable', value: 'enable' },
          { name: 'Disable', value: 'disable' }
        )
        .setRequired(true)),

  async execute(interaction, antiLeaveMap) {
    if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
      return await interaction.reply({ content: "You don't have permission to use this command.", ephemeral: true });
    }

    const user = interaction.options.getUser('member');
    const action = interaction.options.getString('action');

    if (action === 'enable') {
      const member = await interaction.guild.members.fetch(user.id);
      if (member.voice.channelId) {
        antiLeaveMap.set(user.id, member.voice.channelId);

        const embed = new EmbedBuilder()
          .setColor('#00FF00')
          .setTitle('Anti-Leave Enabled')
          .setDescription(`Anti-leave has been enabled for ${user.tag}.`);
        await interaction.reply({ embeds: [embed], ephemeral: true });
      } else {
        await interaction.reply({ content: `${user.tag} needs to be in a voice channel to enable anti-leave.`, ephemeral: true });
      }
    } else {
      antiLeaveMap.delete(user.id);
      const embed = new EmbedBuilder()
        .setColor('#FF0000')
        .setTitle('Anti-Leave Disabled')
        .setDescription(`Anti-leave has been disabled for ${user.tag}.`);
      await interaction.reply({ embeds: [embed], ephemeral: true });
    }
  },
};