import { Client, GatewayIntentBits, Collection, Partials } from "discord.js"; // © 2025 Excode | Swenzy Project
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import config from "./config.json" assert { type: "json" };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("🚀 Swenzy Project Başlatılıyor...\n");

// === Client oluşturma ===
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction]
});

client.commands = new Collection();

// === Komutları yükleme ===
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = await import(`file://${filePath}`);
  if (command.data && command.execute) {
    client.commands.set(command.data.name, command);
    console.log(`✅ Komut yüklendi: ${file}`);
  } else {
    console.log(`⚠️ Hatalı komut atlandı: ${file}`);
  }
}

<<<<<<< HEAD
// === Eventleri yükleme ===
const eventsPath = path.join(__dirname, "events");
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith(".js"));
=======
process.on('unhandledRejection', error => {
  console.error('Yakalanmamış hata:', error);
});

// Sunucu oluşturma ve proje aktivitesi sağlama.
const express = require('express');
const app = express();
const port = 3000;
>>>>>>> 1c868b228bf351bb2eb794c4803d569afde35941

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = await import(`file://${filePath}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client));
  } else {
    client.on(event.name, (...args) => event.execute(...args, client));
  }
  console.log(`📂 Event yüklendi: ${file}`);
}

<<<<<<< HEAD
// === Giriş ===
client.login(config.token).catch(err => {
  console.error("❌ Token ile giriş yapılamadı:", err);
=======
app.listen(port, () => {
  console.log(`Sunucu ${port} numaralı bağlantı noktasında yürütülüyor.`);
>>>>>>> 1c868b228bf351bb2eb794c4803d569afde35941
});
