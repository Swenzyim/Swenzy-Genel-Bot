import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("unlock")
  .setDescription("Kanalın kilidini açar (herkes yazabilir).")
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels);

export async function execute(interaction) {
  const channel = interaction.channel;

  // Everyone rolüne mesaj izni ver
  await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
    SendMessages: true,
  });

  await interaction.reply(`🔓 **${channel.name}** kanalının kilidi açıldı.`);
}
