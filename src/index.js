const {
  Client,
  GatewayIntentBits,
  REST,
  Routes,
  Collection,
  SlashCommandBuilder,
} = require("discord.js");
const { CommandKit } = require("commandkit");
const keep_alive = require("./keep_alive");
const path = require("path");
const fs = require("fs");
const coinSpawner = require("./events/coinspawner");
require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.commands = new Collection();

// Initialize settings
client.settings = {
  messages: 100,
  time: 30,
};

// Initialize CommandKit
new CommandKit({
  client,
  commandsPath: path.join(__dirname, "commands"),
  eventsPath: path.join(__dirname, "events"),
});

// Interaction handler
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.run({ interaction, client });
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error executing this command!",
      ephemeral: true,
    });
  }
});

// Message event handler
client.on("messageCreate", (message) => {
  if (message.author.bot) return;
  coinSpawner.handleMessage(message, client);
});

// Button interaction handler
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isButton()) return;
  if (interaction.customId === "collect_coins") {
    await coinSpawner.handleCollectButton(interaction);
  }
});

client.login("MTMzNzU2NTAzODk0NDE5MDQ5NA.GACTxZ.k4MF6w3xbOBEE69bt_SSYCNQdzdVpOUW5Ui5uk");
