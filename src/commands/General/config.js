const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { startResetInterval } = require("../../events/coinspawner"); // Fix the path

module.exports = {
  data: new SlashCommandBuilder()
    .setName("config")
    .setDescription("Configure the messages required and time to spawn coins")
    .addNumberOption((option) =>
      option
        .setName("time")
        .setDescription("The time that the bot takes to reset (in minutes)")
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(60),
    )
    .addNumberOption((option) =>
      option
        .setName("messages")
        .setDescription("The number of messages required")
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(100),
    ),

  run: async ({ interaction, client, handler }) => {
    await interaction.deferReply({ ephemeral: true });

    try {
      const messagesCount = interaction.options.getNumber("messages");
      const timeValueMinutes = interaction.options.getNumber("time");

      client.settings = {
        messages: messagesCount,
        time: timeValueMinutes * 60,
      };

      // Update the interval with new settings
      startResetInterval(client);

      await interaction.editReply({
        content: `Configuration successfully updated:\nTime: ${timeValueMinutes} minutes\nMessages Required: ${messagesCount}`,
      });
    } catch (error) {
      console.error("Configuration error:", error);
      await interaction.editReply({
        content: "There was an error while updating the configuration.",
      });
    }
  },

  options: {
    devOnly: false,
    userPermissions: ["ManageRoles"],
    botPermissions: ["ManageRoles"],
  },
};
