"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
module.exports = new types_1.AdminCommand({ name: "명령 실행", command: "eval" }, async (message, bot) => {
    try {
        const command = message.content.split(" ");
        command.shift();
        command.shift();
        let result = eval(command.join(" "));
        if (typeof result === "object")
            result = JSON.stringify(result, undefined, 2);
        message.reply("```" + String(result) + "```");
    }
    catch (err) {
        message.reply("```" + String(err) + "```");
        console.error(err);
    }
});
