const {
  Client,
  GatewayIntentBits,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  EmbedBuilder,
} = require("discord.js");

let resetInterval;
let messages = 0;
function startResetInterval(client) {
  if (resetInterval) {
    clearInterval(resetInterval);
  }

  const timeInMinutes = client?.settings?.time ? client.settings.time / 60 : 60;
  const timeInMs = timeInMinutes * 60 * 1000;

  console.log(`Setting interval for ${timeInMinutes} minutes`);

  resetInterval = setInterval(() => {
    console.log("Resetting messages count");
    messages = 0;
  }, timeInMs);
}

const dropMessages = [
  "AMC has dropped 1K coins! Quick, grab them!",
  "The Cheese Cartel hid their evidence and you found it, here is 1K coins!",
  "The Lobble bank has lost 1K coins, here they are!",
  "WinterGeneral's bot glitched, here is 1k coins",
  "Roxxy sold a UGC and dropped 1K coins!",
  "Flop was being a retard and lost 1k coins!",
];

const getRandomDropMessage = () => {
  const randomIndex = Math.floor(Math.random() * dropMessages.length);
  return dropMessages[randomIndex];
};

module.exports = (message, client) => {
  // ... rest of your existing code ...

  module.exports = (message, client) => {
    // Only start the interval when we actually have a client
    if (!resetInterval && client) {
      startResetInterval(client);
    }

    if (message.author.bot) return;
    // ... your channel checks ...

    messages++;
    console.log(`Message sent at ${new Date().toLocaleTimeString()}`);
    console.log(`Messages: ${messages}`);

    const requiredMessages = client?.settings?.messages || 5; // Default to 5 if not set
    if (client.messageCounter >= (client.settings?.messages || 5)) {
      const button = new ButtonBuilder()
        .setCustomId("collect_coins")
        .setLabel("Collect Cheese Coins")
        .setStyle(ButtonStyle.Primary);

      const row = new ActionRowBuilder().addComponents(button);

      const coinEmbed = new EmbedBuilder()
        .setColor("#FFD700")
        .setTitle("💰 Cheese Drop! 💰")
        .setDescription(getRandomDropMessage())
        .setTimestamp()
        .setFooter({ text: "Be quick to collect!" });

      message.channel.send({
        embeds: [coinEmbed],
        components: [row],
      });

      messages = 0;
      startResetInterval(client);
    }
  };

  module.exports.startResetInterval = startResetInterval;
};
