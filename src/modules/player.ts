import {
  AudioPlayer,
  AudioPlayerStatus,
  createAudioPlayer,
  DiscordGatewayAdapterCreator,
  joinVoiceChannel,
  NoSubscriberBehavior,
  VoiceConnection,
} from "@discordjs/voice";
import { Collection, TextBasedChannel, VoiceBasedChannel } from "discord.js";
import { Bot } from "../types";

export class Player {
  queues: Collection<string, Queue>;

  constructor() {
    this.queues = new Collection<string, Queue>();
  }
}

export class Queue {
  bot: Bot;
  textChannel: TextBasedChannel;
  voiceChannel: VoiceBasedChannel;
  connection: VoiceConnection;
  quitTimer: ReturnType<typeof setTimeout> | null;
  isPlaying: boolean;
  audioPlayer: AudioPlayer;

  constructor(textChannel: TextBasedChannel, voiceChannel: VoiceBasedChannel, bot: Bot) {
    this.textChannel = textChannel;
    this.voiceChannel = voiceChannel;
    this.bot = bot;
    this.connection = joinVoiceChannel({
      guildId: voiceChannel.guildId,
      channelId: voiceChannel.id,
      adapterCreator: voiceChannel.guild.voiceAdapterCreator as DiscordGatewayAdapterCreator,
    });
    this.quitTimer = null;
    this.isPlaying = false;
    this.audioPlayer = createAudioPlayer({ behaviors: { noSubscriber: NoSubscriberBehavior.Pause } });
    this.audioPlayer.on(AudioPlayerStatus.Idle, async () => {
      this.isPlaying = false;
      this.quitTimer = setTimeout(() => {
        this.connection.destroy();
        this.bot.player.queues.delete(this.voiceChannel.guildId);
      }, 1_800_000);
    });
    this.audioPlayer.on(AudioPlayerStatus.Playing, () => {
      this.isPlaying = true;
      if (this.quitTimer) {
        clearTimeout(this.quitTimer);
        this.quitTimer = null;
      }
    });
  }
}
