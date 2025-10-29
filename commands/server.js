import { SlashCommandBuilder, EmbedBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("sunucu")
  .setDescription("Sunucu hakkında bilgi verir.");

export async function execute(interaction) {
  const { guild } = interaction;
  const embed = new EmbedBuilder()
    .setColor("Green")
    .setTitle(`🏠 ${guild.name}`)
    .setThumbnail(guild.iconURL())
    .addFields(
      { name: "👑 Sahip", value: `<@${guild.ownerId}>`, inline: true },
      { name: "🧩 Üye Sayısı", value: `${guild.memberCount}`, inline: true },
      { name: "📅 Oluşturulma", value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:R>`, inline: true }
    );
  await interaction.reply({ embeds: [embed] });
}
