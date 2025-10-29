import { REST, Routes } from "discord.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import config from "./config.json" assert { type: "json" };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const commands = [];

const foldersPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(foldersPath).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(foldersPath, file);
  const command = await import(`file://${filePath}`);
  if (command.data) {
    commands.push(command.data.toJSON());
    console.log(`✅ Komut yüklendi: ${command.data.name}`);
  } else {
    console.log(`⚠️ Geçersiz komut atlandı: ${file}`);
  }
}

const rest = new REST({ version: "10" }).setToken(config.token);

try {
  console.log("\n📡 Komutlar Discord API'ye gönderiliyor...");

  await rest.put(
    Routes.applicationCommands(config.clientId),
    { body: commands }
  );

  console.log("💎 Tüm slash komutlar başarıyla yüklendi!");
} catch (error) {
  console.error("❌ Komut yükleme hatası:", error);
}
