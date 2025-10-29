import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import os from "os";

export const data = new SlashCommandBuilder()
  .setName("bot")
  .setDescription("Bot hakkında bilgi verir.");

export async function execute(interaction) {
  const uptime = Math.floor(process.uptime());
  const embed = new EmbedBuilder()
    .setColor("Purple")
    .setTitle("🤖 SwenzyBot Bilgileri")
    .addFields(
      { name: "Ping", value: `${interaction.client.ws.ping}ms`, inline: true },
      { name: "Çalışma Süresi", value: `<t:${Math.floor(Date.now() / 1000) - uptime}:R>`, inline: true },
      { name: "Sunucu Sayısı", value: `${interaction.client.guilds.cache.size}`, inline: true },
      { name: "Platform", value: os.platform(), inline: true }
    );
  await interaction.reply({ embeds: [embed] });
}
