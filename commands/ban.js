import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("ban")
  .setDescription("Bir kullanıcıyı yasaklar.")
  .addUserOption(option =>
    option.setName("kullanici").setDescription("Yasaklanacak kişi").setRequired(true)
  )
  .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers);

export async function execute(interaction) {
  const user = interaction.options.getUser("kullanici");
  const member = await interaction.guild.members.fetch(user.id);
  await member.ban();
  await interaction.reply(`🚫 ${user.tag} yasaklandı.`);
}
