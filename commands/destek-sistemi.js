import {
  SlashCommandBuilder,
  ChannelType,
  PermissionFlagsBits,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("destek-sistemi")
  .setDescription("🎫 Destek sistemi panelini kurar.")
  .addChannelOption(option =>
    option
      .setName("kanal")
      .setDescription("Panelin gönderileceği kanal.")
      .setRequired(true)
      .addChannelTypes(ChannelType.GuildText)
  )
  .addRoleOption(option =>
    option
      .setName("yetkili")
      .setDescription("Destek taleplerini görebilecek yetkili rol.")
      .setRequired(true)
  )
  .addChannelOption(option =>
    option
      .setName("log")
      .setDescription("Destek işlemlerinin loglanacağı kanal.")
      .setRequired(true)
      .addChannelTypes(ChannelType.GuildText)
  )
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

export async function execute(interaction) {
  const panelKanal = interaction.options.getChannel("kanal");
  const yetkiliRol = interaction.options.getRole("yetkili");
  const logKanal = interaction.options.getChannel("log");

  const embed = new EmbedBuilder()
    .setTitle("🎫 Destek Sistemi")
    .setDescription("Aşağıdaki butona tıklayarak bir destek talebi oluşturabilirsiniz.")
    .setColor("Blue")
    .setFooter({ text: "Destek Sistemi | Swenzy" })
    .setTimestamp();

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId("ticket_olustur")
      .setLabel("🎟️ Talep Oluştur")
      .setStyle(ButtonStyle.Primary)
  );

  await panelKanal.send({ embeds: [embed], components: [row] });

  const onayEmbed = new EmbedBuilder()
    .setColor("Green")
    .setDescription(
      `✅ Destek paneli başarıyla kuruldu!\n\n📢 Kanal: ${panelKanal}\n🛠️ Yetkili Rol: ${yetkiliRol}\n🧾 Log Kanalı: ${logKanal}`
    );

  await interaction.reply({ embeds: [onayEmbed], ephemeral: true });
}
