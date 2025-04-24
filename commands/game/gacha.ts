import { SlashCommandBuilder } from '@discordjs/builders';
import { ChatInputCommandInteraction } from 'discord.js';
import { singlePull, multiPull } from '../../utils/gacha';

export const data = new SlashCommandBuilder()
    .setName('gacha')
    .setDescription('ガチャを引きます (単発 or 10連)')
    .addIntegerOption(opt =>
        opt.setName('count')
        .setDescription('1=単発, 10=10連')
        .addChoices({ name: '1', value: 1 }, { name: '10', value: 10 })
        .setRequired(false)
);

export async function execute(interaction: ChatInputCommandInteraction) {
    const count = interaction.options.getInteger('count') || 1;
    const userId = interaction.user.id;
    const results = count === 10 ? multiPull(userId, 10) : [singlePull(userId)];
    const display = results.map(r => '⭐'.repeat(r)).join(', ');
    await interaction.reply({ content: `結果: ${display}`, ephemeral: false });
}
