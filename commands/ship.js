import { SlashCommandBuilder, EmbedBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("ship")
  .setDescription("İki kullanıcı arasındaki aşk uyumunu ölçer.")
  .addUserOption(o => o.setName("kisi1").setDescription("Birinci kişi").setRequired(true))
  .addUserOption(o => o.setName("kisi2").setDescription("İkinci kişi").setRequired(true));

export async function execute(interaction) {
  const u1 = interaction.options.getUser("kisi1");
  const u2 = interaction.options.getUser("kisi2");
  const oran = Math.floor(Math.random() * 101);
  const kalp = "❤️".repeat(Math.floor(oran / 20)) + "🤍".repeat(5 - Math.floor(oran / 20));

  const embed = new EmbedBuilder()
    .setColor(0xff69b4)
    .setTitle("💞 Aşk Uyumu")
    .setDescription(`${u1.username} ❤️ ${u2.username}\n\n${kalp} **${oran}% Uyum!**`);
  await interaction.reply({ embeds: [embed] });
}
