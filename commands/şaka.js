import { SlashCommandBuilder } from "discord.js";

const şakalar = [
  "Bilgisayar neden soğuktur? Çünkü çok fazla fanı var 😄",
  "Programcı kahve makinesine ne demiş? 'Java'sız yapamam!' ☕",
  "Matematik kitabı neden üzgünmüş? Çok fazla problemi varmış 📘",
  "Telefon neden denize düşmüş? Çünkü dalga geçiyormuş 🌊",
  "Benim esprim kötü olabilir ama en azından hatasız çalışıyor 😎"
];

export const data = new SlashCommandBuilder()
  .setName("şaka")
  .setDescription("Rastgele bir şaka yapar.");

export async function execute(interaction) {
  const rastgeleŞaka = şakalar[Math.floor(Math.random() * şakalar.length)];
  await interaction.reply(rastgeleŞaka);
}
