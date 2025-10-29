import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("destek-sistemi-sıfırla")
  .setDescription("Destek sistemini sıfırlar.");

export async function execute(interaction) {
  await interaction.reply({
    content: "🧹 Destek sistemi başarıyla sıfırlandı!",
    ephemeral: true
  });
}
