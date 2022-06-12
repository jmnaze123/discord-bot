const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('delete')
		.setDescription('delete up to 99 messages.')
		.addIntegerOption(option => option.setName('amount').setDescription('Number of messages to delete')),
	async execute(interaction) {
		const amount = interaction.options.getInteger('amount');

		if (amount < 1 || amount > 99) {
			return interaction.reply({ content: 'put in a number between 1 and 99 pls', ephemeral: true });
		}
		await interaction.channel.bulkDelete(amount, true).catch(error => {
			console.error(error);
			interaction.reply({ content: 'ErRoR!.!.!', ephemeral: true });
		});

		return interaction.reply({ content: `i deleted \`${amount}\` messages`, ephemeral: true });
	},
};