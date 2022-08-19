"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const types_1 = require("../types");
module.exports = new types_1.Command(new discord_js_1.SlashCommandBuilder().setName("퇴장").setDescription("음성 채널에서 봇을 퇴장시킵니다."), async (interaction, bot) => {
    await interaction.deferReply();
    let guildQueue = bot.player.queues.get(interaction.guildId);
    if (!guildQueue) {
        await interaction.editReply("입장한 음성 채널이 없습니다.");
        return;
    }
    await guildQueue.destroy();
    await interaction.editReply(guildQueue.voiceChannel.name + " 채널에서 퇴장했습니다.");
});
