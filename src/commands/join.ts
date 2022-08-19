import { GuildMember, SlashCommandBuilder } from "discord.js";
import { Queue } from "../modules/player";
import { Command } from "../types";

module.exports = new Command(
  new SlashCommandBuilder().setName("입장").setDescription("음성 채널에 봇을 입장시킵니다."),
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
    await interaction.editReply(guildQueue.voiceChannel.name + " 채널에 입장했습니다.");
  }
);
