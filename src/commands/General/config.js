const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { updateInterval } = require("../events/coinspawner.js"); // Adjust path as needed

module.exports = {
  data: new SlashCommandBuilder()
    .setName("config")
    .setDescription("Configure the messages required and time to spawn coins")
    .addNumberOption((option) =>
      option
        .setName("time")
        .setDescription("The time that the bot takes to reset (in seconds)")
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(3600),
    )
    .addNumberOption((option) =>
      option
        .setName("messages")
        .setDescription("The number of messages required")
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(500),
    ),

  run: async ({ interaction, client, handler }) => {
    await interaction.deferReply({ ephemeral: true });

    try {
      const messagesCount = interaction.options.getNumber("messages");
      const timeValue = interaction.options.getNumber("time");

      // Update client settings
      client.settings = {
        messages: messagesCount,
        time: timeValue,
      };

      // Update the interval
      updateInterval(client, timeValue);

      await interaction.editReply({
        content: `Configuration successfully updated:\nTime: ${timeValue} seconds\nMessages Required: ${messagesCount}`,
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
