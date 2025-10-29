import { SlashCommandBuilder } from "discord.js";
import fs from "fs";

export const data = new SlashCommandBuilder()
  .setName("uyarı-liste")
  .setDescription("Bir kullanıcının uyarı geçmişini gösterir.")
  .addUserOption(option =>
    option.setName("kullanıcı")
      .setDescription("Uyarı geçmişi görüntülenecek kullanıcı.")
      .setRequired(true)
  );

export async function execute(interaction) {
  const user = interaction.options.getUser("kullanıcı");
  const dataPath = "./database/uyarilar.json";

  if (!fs.existsSync(dataPath)) {
    return interaction.reply({ content: "⚠️ Henüz hiç uyarı verilmemiş.", ephemeral: true });
  }

  const data = JSON.parse(fs.readFileSync(dataPath));

  if (!data[user.id] || data[user.id].length === 0) {
    return interaction.reply({ content: `✅ **${user.tag}** için kayıtlı uyarı bulunmuyor.`, ephemeral: true });
  }

  const list = data[user.id]
    .map((u, i) => `**${i + 1}.** Sebep: ${u.sebep}\n👮 Yetkili: <@${u.moderator}>\n📅 Tarih: ${u.tarih}`)
    .join("\n\n");

  await interaction.reply({
    content: `📋 **${user.tag}** adlı kullanıcının uyarı geçmişi:\n\n${list}`,
    ephemeral: false
  });
}
