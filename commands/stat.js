import { SlashCommandBuilder, EmbedBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("stat")
  .setDescription("Sunucu istatistiklerini gösterir.");

export async function execute(interaction) {
  const { guild } = interaction;
  const members = await guild.members.fetch();

  const embed = new EmbedBuilder()
    .setTitle("📊 Sunucu İstatistikleri")
    .setColor("Blue")
    .setThumbnail(guild.iconURL({ dynamic: true }))
    .addFields(
      { name: "👥 Üye Sayısı", value: `${guild.memberCount}`, inline: true },
      { name: "🟢 Çevrimiçi", value: `${members.filter(m => m.presence?.status === "online").size}`, inline: true },
      { name: "📆 Oluşturulma Tarihi", value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:R>`, inline: true },
    )
    .setFooter({ text: "💫 Swenzy Project" });

  await interaction.reply({ embeds: [embed] });
}
