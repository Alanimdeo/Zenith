import {
  AudioPlayer,
  AudioPlayerStatus,
  createAudioPlayer,
  createAudioResource,
  DiscordGatewayAdapterCreator,
  joinVoiceChannel,
  NoSubscriberBehavior,
  VoiceConnection,
} from "@discordjs/voice";
import axios from "axios";
import { APIApplicationCommandOptionChoice, Collection, TextBasedChannel, VoiceBasedChannel } from "discord.js";
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
  quitTimer: ReturnType<typeof setTimeout> | null = null;
  isPlaying: boolean;
  nowPlaying: APIApplicationCommandOptionChoice<string> | null = null;
  audioPlayer: AudioPlayer;
  async play(channelUrl: string) {
    this.audioPlayer.play(createAudioResource(channelUrl));
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

  constructor(textChannel: TextBasedChannel, voiceChannel: VoiceBasedChannel, bot: Bot) {
    this.textChannel = textChannel;
    this.voiceChannel = voiceChannel;
    this.bot = bot;
    this.connection = joinVoiceChannel({
      guildId: voiceChannel.guildId,
      channelId: voiceChannel.id,
      adapterCreator: voiceChannel.guild.voiceAdapterCreator as DiscordGatewayAdapterCreator,
    });
    this.isPlaying = false;
    this.audioPlayer = createAudioPlayer({ behaviors: { noSubscriber: NoSubscriberBehavior.Pause } });
    this.audioPlayer.on(AudioPlayerStatus.Idle, async () => {
      this.isPlaying = false;
      this.nowPlaying = null;
      this.quitTimer = setTimeout(this.destroy, 1_800_000);
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
