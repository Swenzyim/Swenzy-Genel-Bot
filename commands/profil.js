import { SlashCommandBuilder, EmbedBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("profil")
  .setDescription("Kullanıcı hakkında bilgi verir.")
  .addUserOption(option =>
    option.setName("kullanici").setDescription("Profiline bakılacak kişi")
  );

export async function execute(interaction) {
  const user = interaction.options.getUser("kullanici") || interaction.user;
  const embed = new EmbedBuilder()
    .setColor("Blue")
    .setTitle(`${user.username} Profili`)
    .addFields(
      { name: "🆔 ID", value: user.id, inline: true },
      { name: "📅 Oluşturulma", value: `<t:${Math.floor(user.createdTimestamp / 1000)}:R>`, inline: true }
    )
    .setThumbnail(user.displayAvatarURL({ dynamic: true }));
  await interaction.reply({ embeds: [embed] });
}
