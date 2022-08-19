"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deploy = void 0;
const discord_js_1 = require("discord.js");
async function deploy(commands, bot) {
    const commandDatas = commands.map((command) => command.data.toJSON());
    if (!bot.token) {
        throw new Error("NoBotToken");
    }
    const rest = new discord_js_1.REST({ version: "10" }).setToken(bot.token);
    if (!bot.user) {
        throw new Error("NoClient");
    }
    try {
        await rest.put(discord_js_1.Routes.applicationCommands(bot.user.id), { body: commandDatas });
    }
    catch (error) {
        console.error(error);
    }
    finally {
        return;
    }
}
exports.deploy = deploy;
