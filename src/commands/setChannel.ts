import { GuildMember, SlashCommandBuilder } from "discord.js";
import { Queue } from "../modules/player";
import { getPlaylistUrl, RadioChannels } from "../modules/radio";
import { Command } from "../types";

module.exports = new Command(
  new SlashCommandBuilder()
    .setName("채널")
    .setDescription("채널을 선택합니다.")
    .addStringOption((option) =>
      option
        .setName("채널")
        .setDescription("채널을 선택하세요.")
        .addChoices(...RadioChannels)
        .setRequired(true)
    ),
  async (interaction, bot) => {
    await interaction.deferReply();
    let guildQueue = bot.player.queues.get(interaction.guildId!);
    if (!guildQueue) {
      bot.player.queues.set(
        interaction.guildId!,
        new Queue(interaction.channel!, (interaction.member as GuildMember).voice.channel!, bot)
      );
      guildQueue = bot.player.queues.get(interaction.guildId!);
    }
    if (!guildQueue) return;
    const channel = interaction.options.getString("채널", true);
    await guildQueue.play(await getPlaylistUrl(channel));
    guildQueue.nowPlaying = RadioChannels.find((c) => c.value == channel)!;
    await interaction.editReply(guildQueue.nowPlaying.name + " 채널의 라디오를 재생합니다.");
  }
);
