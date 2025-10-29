export const name = "interactionCreate";
export const once = false;

export async function execute(interaction, client) {
  if (!interaction.isButton()) return;
  if (interaction.customId !== "ticket_olustur") return;

  const guild = interaction.guild;
  const member = interaction.member;

  const destekKategori = guild.channels.cache.find(ch => ch.name === "DESTEK TALEPLERİ" && ch.type === 4)
    || await guild.channels.create({
      name: "DESTEK TALEPLERİ",
      type: 4
    });

  const kanal = await guild.channels.create({
    name: `destek-${member.user.username}`,
    type: 0,
    parent: destekKategori.id,
    permissionOverwrites: [
      {
        id: guild.roles.everyone.id,
        deny: ["ViewChannel"]
      },
      {
        id: member.id,
        allow: ["ViewChannel", "SendMessages", "AttachFiles", "ReadMessageHistory"]
      }
    ]
  });

  await interaction.reply({
    content: `🎫 Destek talebin oluşturuldu: ${kanal}`,
    ephemeral: true
  });

  const embed = {
    title: "🎟️ Yeni Destek Talebi",
    description: `> Kullanıcı: ${member}\n> Talep: ${kanal}`,
    color: 0x5865f2
  };

  const logKanal = guild.channels.cache.find(ch => ch.name.toLowerCase().includes("log"));
  if (logKanal) logKanal.send({ embeds: [embed] });

  kanal.send({
    content: `${member} hoş geldin! Destek ekibimiz yakında seninle ilgilenecektir.`
  });
}
