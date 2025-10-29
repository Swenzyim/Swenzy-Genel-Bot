import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("lock")
  .setDescription("Bulunduğun kanalı kilitler (sadece yetkililer yazabilir).")
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels);

export async function execute(interaction) {
  const channel = interaction.channel;

  // Everyone rolünün mesaj gönderme iznini kapat
  await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
    SendMessages: false,
  });

  await interaction.reply(`🔒 **${channel.name}** kanalı kilitlendi. Sadece yetkililer yazabilir.`);
}
