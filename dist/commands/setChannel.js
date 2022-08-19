"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const player_1 = require("../modules/player");
const radio_1 = require("../modules/radio");
const types_1 = require("../types");
module.exports = new types_1.Command(new discord_js_1.SlashCommandBuilder()
    .setName("채널")
    .setDescription("채널을 선택합니다.")
    .addStringOption((option) => option
    .setName("채널")
    .setDescription("채널을 선택하세요.")
    .addChoices(...radio_1.RadioChannels)
    .setRequired(true)), async (interaction, bot) => {
    await interaction.deferReply();
    let guildQueue = bot.player.queues.get(interaction.guildId);
    if (!guildQueue) {
        bot.player.queues.set(interaction.guildId, new player_1.Queue(interaction.channel, interaction.member.voice.channel, bot));
        guildQueue = bot.player.queues.get(interaction.guildId);
    }
    if (!guildQueue)
        return;
    const channel = interaction.options.getString("채널", true);
    await guildQueue.play(await (0, radio_1.getPlaylistUrl)(channel));
    guildQueue.nowPlaying = radio_1.RadioChannels.find((c) => c.value == channel);
    await interaction.editReply(guildQueue.nowPlaying.name + " 채널의 라디오를 재생합니다.");
});
