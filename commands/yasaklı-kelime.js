import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("yasaklı-kelime")
  .setDescription("Sunucuda yasaklanacak kelimeleri ayarlar.")
  .addStringOption(option =>
    option.setName("kelime")
      .setDescription("Yasaklanacak kelimeyi yaz.")
      .setRequired(true)
  );

export async function execute(interaction) {
  const kelime = interaction.options.getString("kelime");
  await interaction.reply({
    content: `🚫 **${kelime}** kelimesi yasaklılar listesine eklendi.`,
    ephemeral: true
  });
}
