import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("kick")
  .setDescription("Bir kullanıcıyı sunucudan atar.")
  .addUserOption(option =>
    option.setName("kullanici").setDescription("Atılacak kişi").setRequired(true)
  )
  .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers);

export async function execute(interaction) {
  const user = interaction.options.getUser("kullanici");
  const member = await interaction.guild.members.fetch(user.id);
  await member.kick();
  await interaction.reply(`👢 ${user.tag} sunucudan atıldı.`);
}
