const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder()
	.setName("quit")
	.setDescription("Stops the bot and clears the queue"),

	async execute(interaction, client) {
		const queue = client.player.getQueue(interaction.guildId)

		if (!queue) return await interaction.reply({
			content: 'uhhhh i wasn\'t doin anything',
			ephemeral: true,
		})

		queue.destroy()
        await interaction.reply({
			content: 'bye!! <3',
			ephemeral: true,
			
		})
	},
}
