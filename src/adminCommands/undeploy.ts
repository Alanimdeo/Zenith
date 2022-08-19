import { Message } from "discord.js";
import { AdminCommand, Bot } from "../types";

module.exports = new AdminCommand({ name: "설치 해제", command: "undeploy" }, async (message: Message) => {
  if (!message.guild) return;
  await message.guild.commands.set([]);
  await message.reply("Complete!");
});
