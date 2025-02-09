const { Client, GatewayIntentBits } = require("discord.js");
const { CommandKit } = require("commandkit");
const path = require("path");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Initialize settings
client.settings = {
  messages: 5,
  time: 60 * 60,
};

// Initialize message counter
client.messageCounter = 0;

new CommandKit({
  client,
  commandsPath: path.join(__dirname, "commands"),
  eventsPath: path.join(__dirname, "events"),
});

// Message event handler
client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  // Get the coinSpawner module
  const coinSpawner = require("./events/coinspawner");
  // Pass the message and client to the coinSpawner
  coinSpawner(message, client);
});

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
  const coinSpawner = require("./events/coinspawner");
  coinSpawner.startResetInterval(client);
});

client.login(process.env.TOKEN);
