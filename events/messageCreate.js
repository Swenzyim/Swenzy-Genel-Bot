import { EmbedBuilder } from "discord.js";

export default {
  name: "messageCreate",
  async execute(message, client) {
    if (!client.afk) client.afk = new Map();

    // Bot mesajlarını yok say
    if (message.author.bot) return;

    const content = message.content.toLowerCase();

    if (["sa", "sea", "selam", "selamun aleyküm", "selamün aleyküm"].includes(content)) {
      const embed = new EmbedBuilder()
        .setColor("Green")
        .setDescription(`👋 Aleyküm Selam **${message.author.username}**, hoş geldin! 💫`);
      return message.reply({ embeds: [embed] });
    }


    // Eğer kullanıcı AFK’ysa ve mesaj yazarsa
    if (client.afk.has(message.author.id)) {
      client.afk.delete(message.author.id);

      const embed = new EmbedBuilder()
        .setColor("Blue")
        .setDescription(`👋 Hoş geldin **${message.author.username}**, AFK modundan çıktın!`);
      message.reply({ embeds: [embed] });
    }

    // Eğer birini mention'luyorsa ve o kişi AFK'ysa
    if (message.mentions.users.size > 0) {
      message.mentions.users.forEach(user => {
        if (client.afk.has(user.id)) {
          const data = client.afk.get(user.id);
          const embed = new EmbedBuilder()
            .setColor("Yellow")
            .setDescription(`💤 **${user.username}** şu anda AFK.\n📝 Sebep: ${data.reason}`);
          message.reply({ embeds: [embed] });
        }
      });
    }
  },
};
