import { SlashCommandBuilder, EmbedBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("meme")
  .setDescription("Rastgele bir meme gönderir.");

export async function execute(interaction) {
  const memes = [
    "https://i.imgflip.com/4/4t0m5.jpg",
    "https://i.redd.it/6z0wq3p8j6a91.jpg",
    "https://i.imgflip.com/1bij.jpg"
  ];
  const meme = memes[Math.floor(Math.random() * memes.length)];
  const embed = new EmbedBuilder()
    .setColor("Random")
    .setTitle("😂 SwenzyBot Meme")
    .setImage(meme);
  await interaction.reply({ embeds: [embed] });
}
