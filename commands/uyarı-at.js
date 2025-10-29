import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import fs from "fs";

export const data = new SlashCommandBuilder()
  .setName("uyarı-at")
  .setDescription("Bir kullanıcıya uyarı verir.")
  .addUserOption(option =>
    option.setName("kullanıcı")
      .setDescription("Uyarı verilecek kullanıcı.")
      .setRequired(true)
  )
  .addStringOption(option =>
    option.setName("sebep")
      .setDescription("Uyarı sebebi.")
      .setRequired(true)
  )
  .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers);

export async function execute(interaction) {
  const user = interaction.options.getUser("kullanıcı");
  const sebep = interaction.options.getString("sebep");
  const dataPath = "./database/uyarilar.json";

  // Eğer klasör yoksa oluştur
  if (!fs.existsSync("./database")) fs.mkdirSync("./database");

  let data = {};
  if (fs.existsSync(dataPath)) {
    data = JSON.parse(fs.readFileSync(dataPath));
  }

  if (!data[user.id]) data[user.id] = [];
  data[user.id].push({
    sebep,
    moderator: interaction.user.id,
    tarih: new Date().toLocaleString("tr-TR")
  });

  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

  await interaction.reply({
    content: `⚠️ **${user.tag}** adlı kullanıcıya uyarı verildi!\n> Sebep: **${sebep}**`,
    ephemeral: false
  });
}
