import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("zar")
  .setDescription("1 ile 6 arasında rastgele bir zar atar.");

export async function execute(interaction) {
  const zar = Math.floor(Math.random() * 6) + 1;
  await interaction.reply(`🎲 Attığın zar: **${zar}**`);
}
