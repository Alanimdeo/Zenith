import { Message } from "discord.js";
import { RESTPostAPIApplicationCommandsJSONBody } from "discord-api-types/v9";
import { AdminCommand, Bot } from "../types";

module.exports = new AdminCommand({ name: "설치", command: "deploy" }, async (message: Message, bot: Bot) => {
  const guildCommands: RESTPostAPIApplicationCommandsJSONBody[] = [];
  bot.commands.map((command) => guildCommands.push(command.data.toJSON()));
  if (!message.guild) return;
  await message.guild.commands.set(guildCommands);
  await message.reply(
    `Complete! Commands(${guildCommands.length}): ${guildCommands
      .map((command) => command.name)
      .toString()
      .replaceAll(",", ", ")}`
  );
});
