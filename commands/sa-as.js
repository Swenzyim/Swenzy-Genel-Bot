import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";

let saAsAktif = true;

export const data = new SlashCommandBuilder()
  .setName("sa-as")
  .setDescription("‘sa’ yazanlara otomatik ‘as’ cevabı verilmesini açar veya kapatır.")
  .addStringOption(o =>
    o
      .setName("durum")
      .setDescription("Aç veya kapat")
      .addChoices(
        { name: "aç", value: "aç" },
        { name: "kapat", value: "kapat" }
      )
      .setRequired(true)
  )
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild);

export async function execute(interaction) {
  const durum = interaction.options.getString("durum");
  saAsAktif = durum === "aç";
  await interaction.reply(`💬 SA-AS sistemi **${saAsAktif ? "aktif" : "devre dışı"}** edildi.`);
}

export const eventHandler = {
  name: "messageCreate",
  async execute(message) {
    if (!saAsAktif || message.author.bot) return;
    const içerik = message.content.toLowerCase();
    if (["sa", "sea", "selamün aleyküm"].includes(içerik)) {
      await message.reply("Aleyküm selam! 👋");
    }
  }
};
