import { SlashCommandBuilder, EmbedBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("snipe")
  .setDescription("Son silinen mesajı gösterir.");

let lastDeleted = null;

export function storeDeleted(message) {
  if (!message.author?.bot && message.content) lastDeleted = message;
}

export async function execute(interaction) {
  if (!lastDeleted)
    return interaction.reply({ content: "🚫 Henüz silinen bir mesaj yok.", ephemeral: true });

  const embed = new EmbedBuilder()
    .setAuthor({ name: lastDeleted.author.tag, iconURL: lastDeleted.author.displayAvatarURL() })
    .setDescription(lastDeleted.content)
    .setColor(0xff0000)
    .setTimestamp();

  await interaction.reply({ embeds: [embed] });
}
