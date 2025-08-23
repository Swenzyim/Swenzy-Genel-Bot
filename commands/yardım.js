const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const fs = require('fs');

exports.run = async (client, message, args) => {
  const embed = new EmbedBuilder()
    .setTitle("ExBOT | Yardım Menüsü")
    .setDescription("✅ Merhaba, **ExBOT** Yardım Menüsüne Hoşgeldin! 🎉\n\n➡️ Aşağıdaki menüden **ExBOT** botunda kullanabileceğin komutlar listelenecektir.\n\n📍 Eğer komutlarda hata veya bug görürsen <@1195760072068972577> veya [Yardım Sunucuma](https://discord.gg/excode) gelerek iletişime geçebilirsin")
    .setColor("Random")
    .setFooter({ text: `${client.user.username} | Sürüm ${client.config.version}`, iconURL: client.user.displayAvatarURL() })
    .setTimestamp();

  const kullanıcıKomutları = [];
  const moderasyonKomutları = [];
  const sahipKomutları = [];

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
    );

  const helpMessage = await message.channel.send({ embeds: [embed], components: [row] });

  const filter = i => i.customId === 'help_menu' && i.user.id === message.author.id;
  const collector = message.channel.createMessageComponentCollector({ filter, time: 60000 });

  collector.on('collect', async i => {
    const selection = i.values[0];
    
    const updatedEmbed = new EmbedBuilder()
      .setColor("Random")
      .setFooter({ text: `${client.user.username} | Sürüm ${client.config.version}`, iconURL: client.user.displayAvatarURL() })
      .setTimestamp();

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
    }

    await i.update({ embeds: [updatedEmbed], components: [row] });
  });

  collector.on('end', () => {
    helpMessage.edit({ components: [] }).catch(() => {});
  });
};

exports.help = {
  name: "yardım",
  kategori: "Kullanıcı", 
  açıklama: "Komutları kategoriye göre listeler"
};
