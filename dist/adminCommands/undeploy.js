"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
module.exports = new types_1.AdminCommand({ name: "설치 해제", command: "undeploy" }, async (message) => {
    if (!message.guild)
        return;
    await message.guild.commands.set([]);
    await message.reply("Complete!");
});
