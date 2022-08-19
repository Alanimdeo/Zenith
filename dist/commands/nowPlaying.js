"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const types_1 = require("../types");
module.exports = new types_1.Command(new discord_js_1.SlashCommandBuilder().setName("채널확인").setDescription("현재 청취 중인 채널을 확인합니다."), async (interaction, bot) => {
    await interaction.deferReply();
    let guildQueue = bot.player.queues.get(interaction.guildId);
    if (!guildQueue) {
        await interaction.editReply("입장한 음성 채널이 없습니다.");
        return;
    }
    await interaction.editReply("현재 청취 중인 채널: " + (guildQueue.nowPlaying?.name || "없음"));
});
