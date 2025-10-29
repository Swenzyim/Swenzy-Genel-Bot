import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("yazıtura")
  .setDescription("Yazı veya tura atar");

export async function execute(interaction) {
  const sonuc = Math.random() < 0.5 ? "Yazı" : "Tura";
  await interaction.reply(`🪙 Para döndü ve... **${sonuc}!**`);
}
