import {
  ChatInputCommandInteraction,
  Client,
  ClientOptions,
  Collection,
  Interaction,
  Message,
  SlashCommandBuilder,
} from "discord.js";
import { Player } from "./modules/player";

export interface Config {
  token: string;
  adminPrefix: string;
  admins: Array<string | number>;
}

export class Bot extends Client {
  player: Player;
  commands: Collection<string, Command>;
  adminCommands: Collection<string, AdminCommand>;
  lastInteraction: Interaction | null;

  constructor(clientOptions: ClientOptions) {
    super(clientOptions);
    this.player = new Player();
    this.commands = new Collection<string, Command>();
    this.adminCommands = new Collection<string, AdminCommand>();
    this.lastInteraction = null;
  }
}

export class Command {
  data: Omit<SlashCommandBuilder, "addSubcommandGroup" | "addSubcommand">;
  execute: (interaction: ChatInputCommandInteraction, bot: Bot) => Promise<any>;

  constructor(
    data: Omit<SlashCommandBuilder, "addSubcommandGroup" | "addSubcommand">,
    execute: (interaction: ChatInputCommandInteraction, bot: Bot) => Promise<any>
  ) {
    this.data = data;
    this.execute = execute;
  }
}

export class AdminCommand {
  data: AdminCommandData;
  execute: (message: Message, bot: Bot) => Promise<any>;

  constructor(data: AdminCommandData, execute: (message: Message, bot: Bot) => Promise<any>) {
    this.data = data;
    this.execute = execute;
  }
}

export interface AdminCommandData {
  name: string;
  command: string;
}
