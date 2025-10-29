import { SlashCommandBuilder } from "discord.js";

const OWNER_ID = "KENDI_DISCORD_ID";

export const data = new SlashCommandBuilder()
  .setName("owner")
  .setDescription("Sadece bot sahibi tarafından kullanılabilir.");

export async function execute(interaction) {
  if (interaction.user.id !== OWNER_ID)
    return interaction.reply({ content: "❌ Bu komut sadece sahibine özeldir.", ephemeral: true });

  await interaction.reply("👑 Merhaba sahip, bot gayet iyi çalışıyor!");
}
