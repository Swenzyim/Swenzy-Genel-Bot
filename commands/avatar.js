import { SlashCommandBuilder, EmbedBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("avatar")
  .setDescription("Kullanıcının avatarını gösterir.")
  .addUserOption(option =>
    option.setName("kullanici").setDescription("Avatarı gösterilecek kişi")
  );

export async function execute(interaction) {
  const user = interaction.options.getUser("kullanici") || interaction.user;
  const embed = new EmbedBuilder()
    .setTitle(`${user.username} adlı kullanıcının avatarı`)
    .setImage(user.displayAvatarURL({ size: 1024 }))
    .setColor("Random");
  await interaction.reply({ embeds: [embed] });
}
