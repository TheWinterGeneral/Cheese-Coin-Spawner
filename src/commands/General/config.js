const { ApplicationCommandType } = require("discord.js");

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

  run: ({ interaction, client, handler }) => {
    global.messages = interaction.options.getString("messages");
    global.time = interaction.options.getString("time");

    interaction.reply(`Done ${global.time} ${global.messages}`);
  },
   
  options: {
    devOnly: false,
    userPermissions: ['Administrator'],
    deleted: false,
  },
};
