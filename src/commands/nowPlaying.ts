import { SlashCommandBuilder } from "discord.js";
import { Command } from "../types";

module.exports = new Command(
  new SlashCommandBuilder().setName("채널확인").setDescription("현재 청취 중인 채널을 확인합니다."),
  async (interaction, bot) => {
    await interaction.deferReply();
    let guildQueue = bot.player.queues.get(interaction.guildId!);
    if (!guildQueue) {
      await interaction.editReply("입장한 음성 채널이 없습니다.");
      return;
    }
    await interaction.editReply("현재 청취 중인 채널: " + (guildQueue.nowPlaying?.name || "없음"));
  }
);
