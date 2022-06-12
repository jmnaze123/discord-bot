const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports = {
	data: new SlashCommandBuilder().setName("skip").setDescription("Skips the current song"),
	async execute (interaction, client) {
		const queue = client.player.getQueue(interaction.guildId)

		if (!queue) return await interaction.reply({
            ephemeral: true,
            content: 'no songs in the queue :\\'
        })

        const currentSong = queue.current

		queue.skip()
        await interaction.reply({
            ephemeral: true,
            embeds: [
                new MessageEmbed().setDescription(`${currentSong.title} was skipped`)
            ]
        })
	},
}
