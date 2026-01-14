import { Client, GatewayIntentBits, Collection, Partials } from "discord.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";
import config from "./config.json" with { type: "json" };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(chalk.cyanBright("\n🚀 Swenzy Project Başlatılıyor...\n"));

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

try {
  const commandsPath = path.join(__dirname, "commands");
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = await import(`file://${filePath}`);
    if (command.data && command.execute) {
      client.commands.set(command.data.name, command);
      console.log(chalk.green(`✅ Komut yüklendi:`), chalk.white(file));
    } else {
      console.log(chalk.yellow(`⚠️ Hatalı komut atlandı:`), chalk.gray(file));
    }
  }
} catch (error) {
  console.error(chalk.red("❌ Komut yükleme hatası:"), error);
}

try {
  const eventsPath = path.join(__dirname, "events");
  const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith(".js"));

  for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = await import(`file://${filePath}`);
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args, client));
    } else {
      client.on(event.name, (...args) => event.execute(...args, client));
    }
    console.log(chalk.magenta(`📂 Event yüklendi:`), chalk.white(event.name));
  }
} catch (error) {
  console.error(chalk.red("❌ Event yükleme hatası:"), error);
}

client.login(config.token)
  .then(() => {
    console.log(chalk.greenBright("\n💫 SWENZY PROJECT Başarıyla Aktif Edildi!"));
    console.log(chalk.white(`🤖 ${client.user.tag} olarak giriş yapıldı!`));

    console.log(chalk.cyanBright(`
╔═════════════════════════════════════════════════════════════════════════╗
║                                                                         ║
║       ${chalk.hex("#00FFFF")("███████╗██╗    ██╗███████╗███╗    ██╗███████╗██╗    ██╗")}               ║
║       ${chalk.hex("#00FFFF")("██╔════╝██║    ██║██╔════╝████╗  ██║╚══███╔╝╚██╗ ██╔╝")}               ║
║       ${chalk.hex("#00FFFF")("███████╗██║ █╗ ██║█████╗  ██╔██╗ ██║  ███╔╝   ╚████╔╝ ")}               ║
║       ${chalk.hex("#00FFFF")("╚════██║██║███╗██║██╔══╝  ██║╚██╗██║ ███╔╝     ╚██╔╝  ")}               ║
║       ${chalk.hex("#00FFFF")("███████║╚███╔███╔╝███████╗██║ ╚████║███████╗    ██║   ")}               ║
║       ${chalk.hex("#00FFFF")("╚══════╝ ╚══╝╚══╝ ╚══════╝╚═╝  ╚═══╝╚══════╝    ╚═╝   ")}               ║
║                                                                         ║
║                      💎 Made With ❤️  by ${chalk.magentaBright("SWENZY")}                 ║
║                                                                         ║
╚═════════════════════════════════════════════════════════════════════════╝
`));
  })
  .catch(err => {
    console.error(chalk.redBright("\n❌ Bot giriş yapamadı! Token yanlış veya geçersiz."));
    console.error(err);
  });
