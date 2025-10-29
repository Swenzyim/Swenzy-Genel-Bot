import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("timeout")
  .setDescription("Bir kullanıcıya süreli timeout uygular.")
  .addUserOption(option =>
    option.setName("kullanici").setDescription("Timeout uygulanacak kişi").setRequired(true)
  )
  .addIntegerOption(option =>
    option.setName("sure").setDescription("Süre (dakika)").setRequired(true)
  )
  .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers);

export async function execute(interaction) {
  const user = interaction.options.getUser("kullanici");
  const member = await interaction.guild.members.fetch(user.id);
  const minutes = interaction.options.getInteger("sure");
  const ms = minutes * 60 * 1000;
  await member.timeout(ms);
  await interaction.reply(`⏳ ${user.tag} ${minutes} dakika susturuldu.`);
}
