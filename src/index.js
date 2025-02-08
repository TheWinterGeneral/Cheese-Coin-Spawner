require("dotenv/config");
const messageCounter = require("./events/coinspawner.js");
const { Client, GatewayIntentBits } = require("discord.js");
const { CommandKit } = require("commandkit");
const { SlashCommandBuilder } = require("commandkit");
const keep_alive = require("./keep_alive");
global.messages = 300;
global.time = 30;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds, // Server events
    GatewayIntentBits.GuildMessages, // Message events
    GatewayIntentBits.MessageContent, // Message content
    GatewayIntentBits.GuildMembers, // Member events
    GatewayIntentBits.GuildPresences, // Presence updates
    GatewayIntentBits.DirectMessages, // DM events
  ],
});

new CommandKit({
  client,
  eventsPath: `${__dirname}/events`,
  commandsPath: `${__dirname}/commands`,
});
client.on("messageCreate", (message) => {
  messageCounter(message, client);
});
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isButton() || interaction.customId !== "dm_user") return;

  try {
    const specificUser = await client.users.fetch("868151299152162846");
    await specificUser.send(`<@${interaction.user.id}> Got 1K coins`);
    await interaction.reply({
      content: "Successfully told Lob you got the coins",
    });
  } catch (error) {
    console.error(error);
    // Only reply if the interaction hasn't been replied to yet
    if (!interaction.replied) {
      await interaction.reply({
        content: "There was an error processing your request.",
      });
    }
  }
});

client.login(
  "MTMzNzU2NTAzODk0NDE5MDQ5NA.GCzHyf.t0PktoaBTKOL0WLpf30fMJ93VWVzRlayOJojA0",
);
