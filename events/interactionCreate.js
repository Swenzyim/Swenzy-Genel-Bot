import { Events } from "discord.js";

export const name = Events.InteractionCreate;

export async function execute(interaction, client) {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) {
    console.log(`⚠️ Komut bulunamadı: ${interaction.commandName}`);
    return;
  }

  try {
    await command.execute(interaction, client);
  } catch (error) {
    console.error(`❌ Komut çalıştırma hatası (${interaction.commandName}):`, error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({ content: "❌ Komut çalıştırılırken hata oluştu!", ephemeral: true });
    } else {
      await interaction.reply({ content: "❌ Komut çalıştırılırken hata oluştu!", ephemeral: true });
    }
  }
}
