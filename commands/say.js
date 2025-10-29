import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("say")
  .setDescription("Mesajı tekrar eder.")
  .addStringOption(option =>
    option.setName("mesaj").setDescription("Yazılacak mesaj").setRequired(true)
  );

export async function execute(interaction) {
  const mesaj = interaction.options.getString("mesaj");
  await interaction.reply(mesaj);
}
