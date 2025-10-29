import {
  SlashCommandBuilder,
  EmbedBuilder,
  StringSelectMenuBuilder,
  ActionRowBuilder,
} from "discord.js";

<<<<<<< HEAD
export const data = new SlashCommandBuilder()
  .setName("yardım")
  .setDescription("Tüm komut kategorilerini görüntülersin.");
=======
exports.run = async (client, message, args) => {
  const embed = new EmbedBuilder()
    .setTitle("ExBOT | Yardım Menüsü")
    .setDescription("✅ Merhaba, **ExBOT** Yardım Menüsüne Hoşgeldin! 🎉\n\n➡️ Aşağıdaki menüden **ExBOT** botunda kullanabileceğin komutlar listelenecektir.\n\n📍 Eğer komutlarda hata veya bug görürsen <@1195760072068972577> veya [Yardım Sunucuma](https://discord.gg/excode) gelerek iletişime geçebilirsin")
    .setColor("Random")
    .setFooter({ text: `${client.user.username} | Sürüm ${client.config.version}`, iconURL: client.user.displayAvatarURL() })
    .setTimestamp();
>>>>>>> 1c868b228bf351bb2eb794c4803d569afde35941

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

<<<<<<< HEAD
  const selectMenu = new StringSelectMenuBuilder()
    .setCustomId("yardim-menu")
    .setPlaceholder("Bir kategori seçin 📂")
    .addOptions(
      Object.keys(categories).map((kategori) => ({
        label: kategori.replace(/[^a-zA-ZğüşöçıİĞÜŞÖÇ0-9\s]/g, ""),
        description: `${kategori} komutlarını görüntüle`,
        value: kategori,
      }))
=======
  client.commands.forEach(cmd => {
    switch(cmd.help.kategori) {
      case "Kullanıcı":
        kullanıcıKomutları.push(`\`${client.config.prefix}${cmd.help.name}\`: ${cmd.help.açıklama}`);
        break;
      case "Moderasyon":
        moderasyonKomutları.push(`\`${client.config.prefix}${cmd.help.name}\`: ${cmd.help.açıklama}`);
        break;
      case "Sahip":
        sahipKomutları.push(`\`${client.config.prefix}${cmd.help.name}\`: ${cmd.help.açıklama}`);
        break;
    }
  });

  const row = new ActionRowBuilder()
    .addComponents(
      new StringSelectMenuBuilder()
        .setCustomId('help_menu')
        .setPlaceholder('Bir kategori seçin')
        .addOptions([
          {
            label: '🔧 Kullanıcı Komutları',
            description: 'Herkesin kullanabileceği genel komutlar',
            value: 'kullanıcı',
          },
          {
            label: '🛡️ Moderasyon Komutları',
            description: 'Yetkililerin kullanabileceği moderasyon komutları',
            value: 'moderasyon',
          },
          {
            label: '🛠️ Sahip Komutları',
            description: 'Sadece bot sahibinin kullanabileceği komutlar',
            value: 'sahip',
          },
        ]),
>>>>>>> 1c868b228bf351bb2eb794c4803d569afde35941
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

<<<<<<< HEAD
  const collector = interaction.channel.createMessageComponentCollector({
    filter: (i) => i.user.id === interaction.user.id && i.customId === "yardim-menu",
    time: 60000,
  });

  collector.on("collect", async (i) => {
    const selected = i.values[0];
    const komutlar = categories[selected];

    if (!komutlar) {
      return i.reply({ content: "Bu kategoriye ait komut bulunamadı!", ephemeral: true });
=======
    switch(selection) {
      case 'kullanıcı':
        updatedEmbed
          .setTitle("ExBOT | Kullanıcı Komutları")
          .setDescription(kullanıcıKomutları.join('\n'));
        break;
      case 'moderasyon':
        updatedEmbed
          .setTitle("ExBOT | Moderasyon Komutları")
          .setDescription(moderasyonKomutları.join('\n'));
        break;
      case 'sahip':
        updatedEmbed
          .setTitle("ExBOT | Sahip Komutları")
          .setDescription(sahipKomutları.join('\n'));
        break;
>>>>>>> 1c868b228bf351bb2eb794c4803d569afde35941
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
