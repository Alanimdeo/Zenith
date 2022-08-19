"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminCommand = exports.Command = exports.Bot = void 0;
const discord_js_1 = require("discord.js");
const player_1 = require("./modules/player");
class Bot extends discord_js_1.Client {
    player;
    commands;
    adminCommands;
    lastInteraction;
    constructor(clientOptions) {
        super(clientOptions);
        this.player = new player_1.Player();
        this.commands = new discord_js_1.Collection();
        this.adminCommands = new discord_js_1.Collection();
        this.lastInteraction = null;
    }
}
exports.Bot = Bot;
class Command {
    data;
    execute;
    constructor(data, execute) {
        this.data = data;
        this.execute = execute;
    }
}
exports.Command = Command;
class AdminCommand {
    data;
    execute;
    constructor(data, execute) {
        this.data = data;
        this.execute = execute;
    }
}
exports.AdminCommand = AdminCommand;
