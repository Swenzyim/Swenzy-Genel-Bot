import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("yavaş-mod")
  .setDescription("Kanalın yavaş mod süresini ayarlar.")
  .addIntegerOption(o =>
    o.setName("süre").setDescription("Süre (saniye)").setRequired(true)
  )
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels);

export async function execute(interaction) {
  const süre = interaction.options.getInteger("süre");
  await interaction.channel.setRateLimitPerUser(süre);
  await interaction.reply(`🕒 Bu kanalın yavaş modu **${süre} saniye** olarak ayarlandı.`);
}
