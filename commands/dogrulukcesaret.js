import { SlashCommandBuilder } from "discord.js";

const doğrulukSoruları = [
  "En utandığın an neydi?",
  "Son mesaj attığın kişiye ne yazdın?",
  "Hiç kimseye söylemediğin bir sırrını açıkla!",
  "Bu sunucuda en çok kime güveniyorsun?",
  "En saçma alışkanlığın nedir?"
];

const cesaretGörevleri = [
  "Bir dakika boyunca robot sesiyle konuş 😂",
  "Rastgele bir kullanıcıya ‘Seni seviyorum ❤️’ yaz!",
  "Kendini 10 saniye boyunca öv 🧠",
  "Bir mem gönder!",
  "Sunucuda birine iltifat et ✨"
];

export const data = new SlashCommandBuilder()
  .setName("doğrulukcesaret")
  .setDescription("Doğruluk mu cesaret mi?");

export async function execute(interaction) {
  const tür = Math.random() < 0.5 ? "Doğruluk" : "Cesaret";
  const liste = tür === "Doğruluk" ? doğrulukSoruları : cesaretGörevleri;
  const rastgele = liste[Math.floor(Math.random() * liste.length)];
  await interaction.reply(`🎲 **${tür}** seçtin!\n> ${rastgele}`);
}
