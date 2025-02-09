const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { startResetInterval } = require("../../events/coinspawner");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("config")
    .setDescription("Configure the messages required and time to spawn coins")
    .addIntegerOption((option) =>
      option
        .setName("time")
        .setDescription("The time that the bot takes to reset (in minutes)")
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(60),
    )
    .addIntegerOption((option) =>
      option
        .setName("messages")
        .setDescription("The number of messages required")
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(800),
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),

  run: async ({ interaction, client }) => {
    if (!interaction.memberPermissions.has(PermissionFlagsBits.ManageRoles)) {
      return interaction.reply({
        content: "You need the Manage Roles permission to use this command.",
        ephemeral: true,
      });
    }

    try {
      const messagesCount = interaction.options.getInteger("messages");
      const timeValueMinutes = interaction.options.getInteger("time");

      client.settings = {
        messages: messagesCount,
        time: timeValueMinutes,
      };

      startResetInterval(client);

      await interaction.reply({
        content: `Configuration successfully updated:\nTime: ${timeValueMinutes} minutes\nMessages Required: ${messagesCount}`,
        ephemeral: true,
      });
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: "There was an error while updating the configuration.",
        ephemeral: true,
      });
    }
  },
};
