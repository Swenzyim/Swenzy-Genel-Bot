import { REST, Routes } from "discord.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import config from "./config.json" assert { type: "json" };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const commands = [];
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = await import(`file://${filePath}`);
  if (command.data && command.data.toJSON) {
    commands.push(command.data.toJSON());
    console.log(`✅ Komut yüklendi: ${file}`);
  } else {
    console.log(`⚠️ Komut atlandı: ${file}`);
  }
}

const rest = new REST({ version: "10" }).setToken(config.token);

try {
  console.log("\n🚀 Komutlar Discord API’ye gönderiliyor...");
  await rest.put(
    Routes.applicationCommands(config.clientId), // global
    { body: commands }
  );
  console.log("✅ Komutlar başarıyla yüklendi!");
} catch (error) {
  console.error("❌ Komutlar yüklenirken hata oluştu:", error);
}
