const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

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
    try {
      // Check if user has permission
      if (
        !interaction.member.permissions.has(PermissionFlagsBits.ManageRoles)
      ) {
        return await interaction.reply({
          content: "You don't have permission to use this command!",
          ephemeral: true,
        });
      }

      const messagesCount = interaction.options.getNumber("messages");
      const timeValue = interaction.options.getNumber("time");

      // Validate inputs
      if (!messagesCount || !timeValue) {
        return await interaction.reply({
          content: "Invalid input values. Please provide valid numbers.",
          ephemeral: true,
        });
      }

      // Log the values before setting
      console.log("Setting new values:", {
        messages: messagesCount,
        time: timeValue,
      });

      // Store the values
      try {
        global.messages = messagesCount;
        global.time = timeValue;
      } catch (e) {
        console.error("Error setting global variables:", e);
        throw new Error("Failed to set global variables");
      }

      // Verify the values were set
      console.log("New values set:", {
        messages: global.messages,
        time: global.time,
      });

      await interaction.reply({
        content: `Configuration successfully updated:\nTime: ${global.time} seconds\nMessages Required: ${global.messages}`,
        ephemeral: true,
      });
    } catch (error) {
      console.error("Detailed error:", error);
      await interaction.reply({
        content: `There was an error while updating the configuration: ${error.message}`,
        ephemeral: true,
      });
    }
  },

  options: {
    devOnly: false,
    userPermissions: ["ManageRoles"],
    botPermissions: ["ManageRoles"],
  },
};
