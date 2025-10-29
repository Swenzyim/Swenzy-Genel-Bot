import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("afk")
  .setDescription("AFK moduna geçersin.")
  .addStringOption(opt =>
    opt
      .setName("sebep")
      .setDescription("AFK olma sebebin (isteğe bağlı)")
      .setRequired(false)
  );

export async function execute(interaction) {
  const sebep = interaction.options.getString("sebep") || "Belirtilmedi";

  // Kullanıcıyı AFK olarak kaydediyoruz.
  interaction.client.afk = interaction.client.afk || new Map();
  interaction.client.afk.set(interaction.user.id, {
    reason: sebep,
    timestamp: Date.now(),
  });

  await interaction.reply({
    content: `💤 ${interaction.user}, AFK moduna geçtin. Sebep: **${sebep}**`,
    ephemeral: true,
  });
}
