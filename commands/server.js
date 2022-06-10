const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Display info about this server.'),
	async execute(interaction) {
		return interaction.reply({
            content: `Server name: ${interaction.guild.name}
Total members: ${interaction.guild.memberCount}
Date created: ${interaction.guild.createdAt}
Verification level: ${interaction.guild.verificationLevel}`,
            ephemeral: true
        });
	},
};

