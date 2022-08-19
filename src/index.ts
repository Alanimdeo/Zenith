console.log(`가동 시각: ${new Date().toLocaleString()}\n\n모듈 로딩 중...`);
import { readdirSync, readFileSync } from "fs";
import { Collection, GatewayIntentBits } from "discord.js";
import { AdminCommand, Bot, Command, Config } from "./types";
import { deploy } from "./modules/deployGlobalCommands";

console.log("설정 불러오는 중...");
const config: Config = JSON.parse(readFileSync("./config.json", "utf8"));
config.admins = config.admins.map((id) => String(id));

console.log("봇 생성 중...");
const bot = new Bot({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent,
  ],
});

const commands = readdirSync(`${__dirname}/commands`).filter((file) => file.endsWith(".js") || file.endsWith(".ts"));
for (const file of commands) {
  const command: Command = require(`${__dirname}/commands/${file}`);
  console.log(`명령어 불러오는 중... (${command.data.name})`);
  bot.commands.set(command.data.name, command);
}

const adminCommands = readdirSync(`${__dirname}/adminCommands`).filter(
  (file) => file.endsWith(".js") || file.endsWith(".ts")
);
for (const file of adminCommands) {
  const command: AdminCommand = require(`${__dirname}/adminCommands/${file}`);
  console.log(`관리자 명령어 불러오는 중... (${command.data.name})`);
  bot.adminCommands.set(command.data.command, command);
}

bot.once("ready", async () => {
  console.log("명령어 배포 중...");
  await deploy(bot.commands, bot);
  console.log(`준비 완료! 토큰: \x1b[32m${config.token}\x1b[0m`);
});

bot.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  const command = bot.commands.get(interaction.commandName);
  if (!command) return;

  bot.lastInteraction = interaction;

  try {
    await command.execute(interaction, bot);
  } catch (error) {
    console.error(error);
  }
});

bot.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(config.adminPrefix)) return;
  if (!config.admins.includes(message.author.id)) return;

  const args = message.content.split(" ");
  args.shift(); // adminPrefix
  if (args.length === 0) return;
  const command = bot.adminCommands.get(args.shift()!);
  if (!command) return;

  try {
    await command.execute(message, bot);
  } catch (err) {
    console.error(err);
  }
});

bot.on("voiceStateUpdate", (state) => {
  const guildQueue = bot.player.queues.get(state.guild.id);
  if (!guildQueue) return;
  const voiceChannelId = state.channelId;
  if (!voiceChannelId || voiceChannelId != guildQueue.connection.joinConfig.channelId) return;
  const channel = state.guild.channels.cache.get(voiceChannelId);
  if (!channel || !(channel.members instanceof Collection)) return;
  if (channel.members.size === 1 || !bot.user || !channel.members.has(bot.user.id)) {
    guildQueue.audioPlayer.stop(true);
    if (guildQueue.connection.state.status !== "destroyed") {
      guildQueue.connection.destroy();
    }
    bot.player.queues.delete(state.guild.id);
  }
});

console.log("로그인 중...");
bot.login(config.token);
