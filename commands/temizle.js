import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("temizle")
  .setDescription("Belirtilen sayıda mesajı siler.")
  .addIntegerOption(o =>
    o.setName("miktar").setDescription("Silinecek mesaj sayısı (1-100)").setRequired(true)
  )
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages);

export async function execute(interaction) {
  const miktar = interaction.options.getInteger("miktar");
  if (miktar < 1 || miktar > 100)
    return interaction.reply({ content: "1 ile 100 arasında sayı gir.", ephemeral: true });

  await interaction.channel.bulkDelete(miktar, true);
  await interaction.reply({ content: `🧹 ${miktar} mesaj silindi.`, ephemeral: true });
}
