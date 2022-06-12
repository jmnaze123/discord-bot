const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const { execute } = require("./quit")

module.exports = {
	data: new SlashCommandBuilder().setName("info").setDescription("Displays info about the currently playing song"),
	async execute(interaction, client) {
		const queue = client.player.getQueue(interaction.guildId)

		if (!queue) return await interaction.reply({
			content: 'bro nothing\'s in the queue',
			ephemeral: true,
		})

        const song = queue.current

		await interaction.reply({
			ephemeral: true,
			embeds: [new MessageEmbed()
            .setThumbnail(song.thumbnail)
            .setDescription(`currently playing [${song.title}](${song.url})\n\n`)
        ],
		})
	},
}
