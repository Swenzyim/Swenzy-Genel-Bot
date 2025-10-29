import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Botun gecikmesini gösterir.");

export async function execute(interaction) {
  const sent = await interaction.reply({ content: "🏓 Pong!", fetchReply: true });
  await interaction.editReply(
    `🏓 Gecikme: **${sent.createdTimestamp - interaction.createdTimestamp}ms**`
  );
}
