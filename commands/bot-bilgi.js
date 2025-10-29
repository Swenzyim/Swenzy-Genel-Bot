import { SlashCommandBuilder, EmbedBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("bot-bilgi")
  .setDescription("Bot hakkında bilgi verir.");

export async function execute(interaction) {
  const embed = new EmbedBuilder()
    .setColor("Purple")
    .setTitle("🤖 Swenzy Bot Bilgi")
    .addFields(
      { name: "Bot İsmi", value: interaction.client.user.username, inline: true },
      { name: "Sunucu Sayısı", value: `${interaction.client.guilds.cache.size}`, inline: true },
      { name: "Ping", value: `${interaction.client.ws.ping}ms`, inline: true },
      { name: "Sahip", value: "<@KENDİ_DISCORD_ID>" }
    )
    .setFooter({ text: "Development By Swenzy © 2025" });

  await interaction.reply({ embeds: [embed] });
}
