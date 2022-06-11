const { SlashCommandBuilder } = require('@discordjs/builders');
const { Guild } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('join')
        .setDescription('Joins the voice channel you are in.'),
        async execute(interaction) {
            //join voice channel
            const { joinVoiceChannel } = require('@discordjs/voice');

            const connection = joinVoiceChannel({
                channelId: interaction.channelId,
                guildId: interaction.guildId,
                adapterCreator: interaction.Guild.voiceAdapterCreator,
            });
        }
};