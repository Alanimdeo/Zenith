"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Queue = exports.Player = void 0;
const voice_1 = require("@discordjs/voice");
const discord_js_1 = require("discord.js");
class Player {
    queues;
    constructor() {
        this.queues = new discord_js_1.Collection();
    }
}
exports.Player = Player;
class Queue {
    bot;
    textChannel;
    voiceChannel;
    connection;
    quitTimer = null;
    isPlaying;
    nowPlaying = null;
    audioPlayer;
    async play(channelUrl) {
        this.audioPlayer.play((0, voice_1.createAudioResource)(channelUrl));
        this.connection.subscribe(this.audioPlayer);
    }
    async stop() {
        this.audioPlayer.stop(true);
    }
    async destroy() {
        await this.stop();
        this.connection.destroy();
        if (this.quitTimer) {
            clearTimeout(this.quitTimer);
        }
        this.bot.player.queues.delete(this.voiceChannel.guildId);
    }
    constructor(textChannel, voiceChannel, bot) {
        this.textChannel = textChannel;
        this.voiceChannel = voiceChannel;
        this.bot = bot;
        this.connection = (0, voice_1.joinVoiceChannel)({
            guildId: voiceChannel.guildId,
            channelId: voiceChannel.id,
            adapterCreator: voiceChannel.guild.voiceAdapterCreator,
        });
        this.isPlaying = false;
        this.audioPlayer = (0, voice_1.createAudioPlayer)({ behaviors: { noSubscriber: voice_1.NoSubscriberBehavior.Pause } });
        this.audioPlayer.on(voice_1.AudioPlayerStatus.Idle, async () => {
            this.isPlaying = false;
            this.nowPlaying = null;
            this.quitTimer = setTimeout(this.destroy, 1800000);
        });
        this.audioPlayer.on(voice_1.AudioPlayerStatus.Playing, () => {
            this.isPlaying = true;
            if (this.quitTimer) {
                clearTimeout(this.quitTimer);
                this.quitTimer = null;
            }
        });
    }
}
exports.Queue = Queue;
