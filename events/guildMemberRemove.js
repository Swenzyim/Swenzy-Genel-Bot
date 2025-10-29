import { EmbedBuilder } from "discord.js";
import config from "../config.json" assert { type: "json" };

export default {
  name: "guildMemberRemove",
  once: false,
  async execute(member) {
    const kanal = member.guild.channels.cache.get(config.girisCikisKanal);
    if (!kanal) return;

    const embed = new EmbedBuilder()
      .setTitle("👋 Görüşürüz")
      .setDescription(`${member.user.tag} sunucudan ayrıldı.`)
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .setColor("Red")
      .setTimestamp();

    kanal.send({ embeds: [embed] });
  },
};
