import {
  SlashCommandBuilder,
  EmbedBuilder,
  StringSelectMenuBuilder,
  ActionRowBuilder,
} from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("yardım")
  .setDescription("Tüm komut kategorilerini görüntülersin.");

export async function execute(interaction) {
  const categories = {
    "🧩 Genel": [
      "`/ping`",
      "`/profil`",
      "`/server`",
      "`/say`",
      "`/bot-bilgi`",
      "`/avatar`",
    ],
    "🎮 Eğlence": [
      "`/zar`",
      "`/şaka`",
      "`/yazıtura`",
      "`/doğrulukcesaret`",
      "`/meme`",
      "`/ship`",
    ],
    "🛠️ Moderasyon": [
      "`/ban`",
      "`/kick`",
      "`/lock`",
      "`/unlock`",
      "`/temizle`",
      "`/timeout`",
      "`/uyarı-at`",
      "`/uyarı-liste`",
    ],
    "🎫 Destek & Giriş": [
      "`/destek-sistemi`",
      "`/destek-sistemi-sıfırla`",
      "`/giriş-çıkış`",
      "`/giriş-çıkış-kapat`",
      "`/sa-as`",
    ],
    "📊 Bilgi & Araçlar": [
      "`/stat`",
      "`/snipe`",
      "`/yavaş-mod`",
      "`/yasaklı-kelime`",
      "`/afk`",
    ],
    "👑 Sahip": ["`/owner`", "`/bot`"],
  };

  const selectMenu = new StringSelectMenuBuilder()
    .setCustomId("yardim-menu")
    .setPlaceholder("Bir kategori seçin 📂")
    .addOptions(
      Object.keys(categories).map((kategori) => ({
        label: kategori.replace(/[^a-zA-ZğüşöçıİĞÜŞÖÇ0-9\s]/g, ""),
        description: `${kategori} komutlarını görüntüle`,
        value: kategori,
      }))
    );

  const row = new ActionRowBuilder().addComponents(selectMenu);

  const embed = new EmbedBuilder()
    .setTitle("💫 Swenzy Yardım Menüsü")
    .setDescription("Aşağıdaki menüden bir **kategori seçin** ve o kategorideki komutları görün.")
    .setColor("Blurple")
    .setThumbnail(interaction.client.user.displayAvatarURL())
    .setFooter({ text: "Swenzy Project | By Excode" });

  await interaction.reply({
    embeds: [embed],
    components: [row],
  });

  const collector = interaction.channel.createMessageComponentCollector({
    filter: (i) => i.user.id === interaction.user.id && i.customId === "yardim-menu",
    time: 60000,
  });

  collector.on("collect", async (i) => {
    const selected = i.values[0];
    const komutlar = categories[selected];

    if (!komutlar) {
      return i.reply({ content: "Bu kategoriye ait komut bulunamadı!", ephemeral: true });
    }

    const kategoriEmbed = new EmbedBuilder()
      .setTitle(`${selected} Komutları`)
      .setDescription(komutlar.join("\n"))
      .setColor("Green")
      .setFooter({ text: "Swenzy Yardım Menüsü 💫" });

    await i.update({ embeds: [kategoriEmbed], components: [row] });
  });

  collector.on("end", async () => {
    try {
      await interaction.editReply({
        components: [],
      });
    } catch {}
  });
}
