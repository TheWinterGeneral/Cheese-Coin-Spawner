module.exports = {
  customId: "collect_coins",

  run: async ({ interaction, client }) => {
    try {
      // Add your coin collection logic here
      let coinsGained = client?.settings?.coins
      await interaction.reply({
        content: `You collected ${coinsGained} cheese coins! 🧀`,
        ephemeral: true,
      });

      // Optional: Delete or disable the message after someone collects
      if (interaction.message.deletable) {
        await interaction.message.delete();
      }
    } catch (error) {
      console.error("Error in collect_coins button:", error);
      await interaction.reply({
        content: "Failed to collect coins. Please try again.",
        ephemeral: true,
      });
    }
  },
};
