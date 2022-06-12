const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const { QueryType } = require("discord-player")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("play")
		.setDescription("loads songs from youtube")
		.addSubcommand((subcommand) =>
			subcommand
				.setName("song")
				.setDescription("Loads a song from a url")
				.addStringOption((option) => option.setName("url").setDescription("the song's url").setRequired(true))
		)
		.addSubcommand((subcommand) =>
			subcommand
				.setName("search")
				.setDescription("Searches for song with the provided keywords")
				.addStringOption((option) =>
					option.setName("searchterms").setDescription("the search keywords").setRequired(true)
				)
		),
	async execute(interaction, client) {
		if (!interaction.member.voice.channel) return interaction.reply({
            content: 'yo join a vc first',
            ephemeral: true,
        })

		const queue = await client.player.createQueue(interaction.guild)
		if (!queue.connection) await queue.connect(interaction.member.voice.channel)

		let embed = new MessageEmbed()

		if (interaction.options.getSubcommand() === "song") {
            let url = interaction.options.getString("url")
            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.YOUTUBE_VIDEO
            })
            if (result.tracks.length === 0)
                return interaction.reply({
                    content: 'umm didn\'t find anything',
                    ephemeral: true,
                })
            
            const song = result.tracks[0]
            await queue.addTrack(song)
            embed
                .setDescription(`**[${song.title}](${song.url})**`)

		} else if (interaction.options.getSubcommand() === "search") {
            let url = interaction.options.getString("searchterms")
            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.AUTO
            })

            if (result.tracks.length === 0)
                return interaction.reply({
                    content: 'umm didn\'t find anything',
                    ephemeral: true,
                })
            
            const song = result.tracks[0]
            await queue.addTrack(song)
            embed
                .setDescription(`**[${song.title}](${song.url})**`)
		}
        if (!queue.playing) await queue.play()
        await interaction.reply({
            embeds: [embed],
            ephemeral: true,
        })
	},
}
