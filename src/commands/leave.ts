import { SlashCommandBuilder } from "discord.js";
import { Command } from "../types";

module.exports = new Command(
  new SlashCommandBuilder().setName("퇴장").setDescription("음성 채널에서 봇을 퇴장시킵니다."),
  async (interaction, bot) => {
    await interaction.deferReply();
    let guildQueue = bot.player.queues.get(interaction.guildId!);
    if (!guildQueue) {
      await interaction.editReply("입장한 음성 채널이 없습니다.");
      return;
    }
    await guildQueue.destroy();
    await interaction.editReply(guildQueue.voiceChannel.name + " 채널에서 퇴장했습니다.");
  }
);
