import { EmbedBuilder } from "discord.js";
import config from "../config.json" assert { type: "json" };

export default {
  name: "guildMemberAdd",
  once: false,
  async execute(member) {
    const kanal = member.guild.channels.cache.get(config.girisCikisKanal);
    if (!kanal) return;

    const embed = new EmbedBuilder()
      .setTitle("🎉 Hoş geldin!")
      .setDescription(`Aramıza katıldı: **${member.user.tag}**`)
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .setColor("Green")
      .setTimestamp();

    kanal.send({ embeds: [embed] });
  },
};
