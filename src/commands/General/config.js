const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("config")
    .setDescription("Configure the messages required and time to spawn coins")
    .addNumberOption((option) =>
      option
        .setName("time")
        .setDescription("The time that the bot takes to reset")
        .setRequired(true),
    )
    .addNumberOption((option) =>
      option
        .setName("messages")
        .setDescription("The number of messages required")
        .setRequired(true),
    ),

  run: async ({ interaction, client, handler }) => {
    try {
      // Use getNumber() instead of getString() for number options
      global.messages = interaction.options.getNumber("messages");
      global.time = interaction.options.getNumber("time");

      await interaction.reply({
        content: `Configuration updated:\nTime: ${global.time}\nMessages: ${global.messages}`,
        ephemeral: true
      });
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: "There was an error while updating the configuration.",
        ephemeral: true
      });
    }
  },  
  options: {
    devOnly: false,
    userPermissions: ['ManageRoles'],
    botPermissions: ['ManageRoles'],
  },
};
