const {
  Client,
  GatewayIntentBits,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  EmbedBuilder,
} = require("discord.js");
const { CommandKit } = require("commandkit");
const { ButtonKit } = require("commandkit");

const { Message } = require("discord.js");

let messages = 0;

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

const cheeserCoin = "<:CheeserCoin:1308546658803650580>";

const handleInteraction = async (interaction) => {
  if (!interaction.isButton() || interaction.customId !== "collect_coins")
    return;

  try {
    const specificUser =
      await interaction.client.users.fetch("868151299152162846");
    const notificationChannel = await interaction.client.channels.fetch(
      "1337571423199301703",
    );

    // Create a DM embed
    const dmEmbed = new EmbedBuilder()
      .setColor("#00FF00")
      .setTitle("🎉 New Coin Drop Winner!")
      .setDescription(
        `${interaction.user.tag} has collected 1,000 cheeser coins!`,
      )
      .addFields({
        name: "Action Required",
        value: "Please deliver their coins in <#1232747974434488372>",
      })
      .setTimestamp();

    // Create an announcement embed
    const announcementEmbed = new EmbedBuilder()
      .setColor("#FFD700")
      .setTitle("🎉 Coin Drop Winner!")
      .setDescription(`Congratulations <@${interaction.user.id}>!`)
      .addFields({
        name: "Prize",
        value: `${cheeserCoin} 1,000 cheeser coins`,
      })
      .setTimestamp();

    // Send DM and announcement with embeds
    await specificUser.send({ embeds: [dmEmbed] });
    await notificationChannel.send({ embeds: [announcementEmbed] });

    // Create collected embed (for the original message)
    const collectedEmbed = new EmbedBuilder()
      .setColor("#FF0000")
      .setTitle("💰 Coin Drop Collected! 💰")
      .setDescription(
        `This drop has been collected by ${interaction.user.tag}!`,
      )
      .setTimestamp()
      .setFooter({ text: "I'll be back!" });

    // Disable the button
    const disabledButton = ButtonBuilder.from(
      interaction.message.components[0].components[0],
    ).setDisabled(true);
    const disabledRow = new ActionRowBuilder().addComponents(disabledButton);

    // Edit the original message
    await interaction.message.edit({
      embeds: [collectedEmbed],
      components: [disabledRow],
    });

    await interaction.reply({
      content: "You've successfully collected the coins!",
      ephemeral: true,
    });
  } catch (error) {
    console.error("Error:", error);
    if (!interaction.replied) {
      await interaction.reply({
        content: "There was an error processing your request.",
        ephemeral: true,
      });
    }
  }
};

module.exports = (message, client) => {
  if (
    !client
      .listeners("interactionCreate")
      .some((listener) => listener.name === "handleInteraction")
  ) {
    client.on("interactionCreate", handleInteraction);
  }

  if (message.author.bot) return;
  if (message.channelId === "1239238219019845673") return;
  if (message.channelId === "1239004128768692245") return;
  if (message.channelId === "1303186797932843019") return;
  if (message.channelId === "1239238709933506771") return;
  if (message.channelId === "1239238748986933269") return;
  if (message.channelId === "1135452919957831690") return;
  if (message.channelId === "1239004485095784548") return;
  if (message.channelId === "1239238425996034151") return;
  if (message.channelId === "1287226832063561728") return;
  if (message.channelId === "1239004245391315084") return;
  if (message.channelId === "1337469088749977612") return;
  if (message.channelId === "1274397520268627978") return;
  if (message.channelId === "1252834039824388147") return;
  if (message.channelId === "1239238624143216732") return;
  if (message.channelId === "1303161756843118683") return;
  if (message.channelId === "1135452058229678112") return;
  if (message.channelId === "1331066955309781032") return;
  if (message.channelId === "1135455154477477888") return;
  if (message.channelId === "1135457432450105405") return;
  if (message.channelId === "1264757179907571732") return;
  if (message.channelId === "1304200839736590417") return;
  if (message.channelId === "1186498645646917736") return;
  if (message.channelId === "1241015307305488455") return;
  if (message.channelId === "1135463794106187836") return;
  if (message.channelId === "1135459212017799168") return;
  if (message.channelId === "1136964389270990981") return;
  if (message.channelId === "1137419245324615791") return;
  if (message.channelId === "1135458119788977152") return;
  if (message.channelId === "1292499940504764416") return;
  if (message.channelId === "1232747974434488372") return;

  messages++;
  console.log(`Message sent at ${new Date().toLocaleTimeString()}`);
  console.log(`Messages: ${messages}`);

  if (messages >= 300) {
    const button = new ButtonBuilder()
      .setCustomId("collect_coins")
      .setLabel("Collect Cheese Coins")
      .setStyle(ButtonStyle.Primary);

    const row = new ActionRowBuilder().addComponents(button);

    // Create an embed
    const coinEmbed = new EmbedBuilder()
      .setColor("#FFD700") // Gold color for coins
      .setTitle("💰 Cheese Drop! 💰")
      .setDescription(getRandomDropMessage())
      .setTimestamp()
      .setFooter({ text: "Be quick to collect!" });

    message.channel.send({
      embeds: [coinEmbed],
      components: [row],
    });

    messages = 0;
  }
};

setInterval(
  () => {
    messages = 0;
  },
  30 * 60 * 1000,
);
