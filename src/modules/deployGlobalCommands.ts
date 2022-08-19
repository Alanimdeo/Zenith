import { Collection, REST, Routes } from "discord.js";
import { Bot, Command } from "../types";

export async function deploy(commands: Collection<string, Command>, bot: Bot) {
  const commandDatas = commands.map((command) => command.data.toJSON());

  if (!bot.token) {
    throw new Error("NoBotToken");
  }
  const rest = new REST({ version: "10" }).setToken(bot.token);

  if (!bot.user) {
    throw new Error("NoClient");
  }
  try {
    await rest.put(Routes.applicationCommands(bot.user.id), { body: commandDatas });
  } catch (error) {
    console.error(error);
  } finally {
    return;
  }
}
