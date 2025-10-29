import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("ban-liste")
  .setDescription("Sunucudaki banlı kullanıcıları listeler.")
  .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers);

export async function execute(interaction) {
  const bans = await interaction.guild.bans.fetch();
  if (bans.size === 0) return interaction.reply("🚫 Banlı kullanıcı yok.");
  const list = bans.map(b => `${b.user.tag} (${b.user.id})`).join("\n");
  await interaction.reply(`🚫 **Banlı Kullanıcılar:**\n${list}`);
}
