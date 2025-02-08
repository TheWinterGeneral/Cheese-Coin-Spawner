const {
  Client,
  GatewayIntentBits,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  EmbedBuilder,
} = require("discord.js");

let messages = 0;
let resetInterval;

// Modified startResetInterval function
function startResetInterval(client) {
  if (resetInterval) {
    clearInterval(resetInterval);
  }

  // Default to 60 minutes if settings aren't available
  const timeInMinutes = client?.settings?.time ? client.settings.time / 60 : 60;
  const timeInMs = timeInMinutes * 60 * 1000;

  console.log(`Setting interval for ${timeInMinutes} minutes`);

  resetInterval = setInterval(() => {
    console.log("Resetting messages count");
    messages = 0;
  }, timeInMs);
}

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

  if (messages >= requiredMessages) {
    // Your coin drop logic
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
    module.exports.startResetInterval = startResetInterval;
  }
};
