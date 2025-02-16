const {
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  EmbedBuilder,
} = require("discord.js");

let messages = 0;
let resetInterval;
let activeDrops = new Set(); // To track active drops

const startResetInterval = (client) => {
  if (resetInterval) {
    clearInterval(resetInterval);
  }

  let timeInMinutes = client?.settings?.time;
  let timeInMs = timeInMinutes * 60 * 1000;

  console.log(`Setting interval for ${timeInMinutes} minutes`);
  
  resetInterval = setInterval(() => {
    console.log("Resetting messages count");
    client.messageCounter = 0;
  }, timeInMs);
};

const dropMessages = [
  "AMC has dropped 1K coins! Quick, grab them!",
  "The Cheese Cartel hid their evidence and you found it, here is 1K coins!",
  "The Lobble bank has lost 1K coins, here they are!",
  "WinterGeneral's bot glitched, here is 1k coins",
  "Roxxy sold a UGC and dropped 1K coins!",
  "Flop was being a retard and lost 1k coins!",
];

const getRandomDropMessage = () => {
  return dropMessages[Math.floor(Math.random() * dropMessages.length)];
};

// Button handler function
const handleCollectButton = async (interaction, client) => {
  try {
    const messageId = interaction.message.id;

    let coinsGained = client?.settings?.coins;

    // Check if drop is still active
    if (!activeDrops.has(messageId)) {
      await interaction.reply({
        content: "This drop has already been collected!",
        ephemeral: true,
      });
      return;
    }

    // Remove the drop from active drops
    activeDrops.delete(messageId);

    const collector = interaction.user;
    // First, reply to the interaction
    await interaction.reply({
      content: `You collected ${coinsGained} cheese coins! 🧀`,
      ephemeral: true,
    });

    // Send to specific channel with error handling
    try {
      const logChannel = interaction.client.channels.cache.get(
        "1335808569848762419",
      );
      if (
        logChannel &&
        logChannel
          .permissionsFor(interaction.client.user)
          .has(["SendMessages", "ViewChannel"])
      ) {
        await logChannel.send({
          content: `${collector.toString()} collected ${coinsGained} cheese coins! 🧀`,
        });
      } else {
        console.log(
          "Bot doesn't have permission to send messages in log channel",
        );
      }
    } catch (error) {
      console.log("Error sending to log channel:", error);
      // Continue execution even if logging fails
    }

    // Send DM to specific user with error handling
    try {
      const specificUser =
        await interaction.client.users.fetch("868151299152162846");
      await specificUser.send({
        content: `${collector.toString()} collected ${coinsGained} cheese coins in ${interaction.channel.name}! 🧀`,
      });
    } catch (error) {
      console.log("Couldn't send DM to specific user");
      // Continue execution even if DM fails
    }

    // Create new embed for the collected state
    const collectedEmbed = new EmbedBuilder()
      .setColor("#808080")
      .setTitle("💰 Cheese Drop Collected! 💰")
      .setDescription(`${collector.toString()} collected 1,000 cheese coins!`)
      .setTimestamp()
      .setFooter({ text: "This drop has been claimed" });

    // Edit the original message with the new embed and remove the button
    await interaction.message.edit({
      embeds: [collectedEmbed],
      components: [],
    });
  } catch (error) {
    console.error("Error handling collect button:", error);
    if (!interaction.replied) {
      await interaction.reply({
        content: "Failed to collect coins. Please try again.",
        ephemeral: true,
      });
    }
  }
};

const handleMessage = async (message, client) => {
  if (message.author.bot) return;
  if (message.channel.id === "1239238219019845673") return;
  if (message.channel.id === "1239004128768692245") return;
  if (message.channel.id === "1303186797932843019") return;
  if (message.channel.id === "1239238709933506771") return;
  if (message.channel.id === "1239238748986933269") return;
  if (message.channel.id === "1135452919957831690") return;
  if (message.channel.id === "1239004485095784548") return;
  if (message.channel.id === "1239238425996034151") return;
  if (message.channel.id === "1287226832063561728") return;
  if (message.channel.id === "1239004245391315084") return;
  if (message.channel.id === "1274397520268627978") return;
  if (message.channel.id === "1252834039824388147") return;
  if (message.channel.id === "1239238624143216732") return;
  if (message.channel.id === "1303161756843118683") return;
  if (message.channel.id === "1137638631943712799") return;
  if (message.channel.id === "1331117682929696850") return;
  if (message.channel.id === "1289026476502421585") return;
  if (message.channel.id === "1253485149438476368") return;
  if (message.channel.id === "1330384939828514967") return;
  if (message.channel.id === "1330384974469267506") return;
  if (message.channel.id === "1330383750051270656") return;
  if (message.channel.id === "1330383540948435014") return;
  if (message.channel.id === "1330385010137497711") return;
  if (message.channel.id === "1330409594018857033") return;
  if (message.channel.id === "1232747974434488372") return;
  if (message.channel.id === "1252847089743036446") return;
  if (message.channel.id === "1135457432450105405") return;
  if (message.channel.id === "1135452058229678112") return;
  if (message.channel.id === "1331066955309781032") return;
  if (message.channel.id === "1135455154477477888") return;
  if (message.channel.id === "1264757179907571732") return;
  if (message.channel.id === "1304200839736590417") return;
  if (message.channel.id === "1186498645646917736") return;
  if (message.channel.id === "1241015307305488455") return;
  if (message.channel.id === "1135463794106187836") return;
  if (message.channel.id === "1135459212017799168") return;
  if (message.channel.id === "1136964389270990981") return;
  if (message.channel.id === "1137419245324615791") return;
  if (message.channel.id === "1292499940504764416") return;

  messages++;
  console.log(`Messages: ${messages}`);
  console.log(`Message sent at ${new Date().toLocaleTimeString()}`);

  const requiredMessages = client?.settings?.messages || 5;
  if (messages >= requiredMessages) {
    const button = new ButtonBuilder()
      .setCustomId("collect_coins")
      .setLabel("Collect Cheese Coins")
      .setStyle(ButtonStyle.Primary);

    const row = new ActionRowBuilder().addComponents(button);
    const skibidi = client?.settings?.messages;
    const skibidilob = client?.settings?.time;
    const coinEmbed = new EmbedBuilder()
      .setColor("#FFD700")
      .setTitle("💰 Cheese Drop! 💰")
      .setDescription(getRandomDropMessage())
      .setTimestamp()
      .setFooter({
        text: `This message appears when you get ${skibidi} messages in ${skibidilob}`,
      });

    const sentMessage = await message.channel.send({
      embeds: [coinEmbed],
      components: [row],
    });

    // Add this drop to active drops
    activeDrops.add(sentMessage.id);

    messages = 0;
  }
};

module.exports = {
  handleMessage,
  startResetInterval,
  handleCollectButton,
};
