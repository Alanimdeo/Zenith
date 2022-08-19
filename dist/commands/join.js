"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const player_1 = require("../modules/player");
const types_1 = require("../types");
module.exports = new types_1.Command(new discord_js_1.SlashCommandBuilder().setName("입장").setDescription("음성 채널에 봇을 입장시킵니다."), async (interaction, bot) => {
    await interaction.deferReply();
    let guildQueue = bot.player.queues.get(interaction.guildId);
    if (!guildQueue) {
        bot.player.queues.set(interaction.guildId, new player_1.Queue(interaction.channel, interaction.member.voice.channel, bot));
        guildQueue = bot.player.queues.get(interaction.guildId);
    }
    if (!guildQueue)
        return;
    await interaction.editReply(guildQueue.voiceChannel.name + " 채널에 입장했습니다.");
});
