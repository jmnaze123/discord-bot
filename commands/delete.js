const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('delete')
		.setDescription('delete up to 99 messages. ADMIN ONLY')
		.addIntegerOption(option => option.setName('amount').setDescription('Number of messages to delete')),
	async execute(interaction) {
		const amount = interaction.options.getInteger('amount');

		if (amount < 1 || amount > 99) {
			return interaction.reply({ content: 'put in a number between 1 and 99 pls', ephemeral: true });
		}
		if (interaction.member.permissions.has("ADMINISTRATOR")) {

			await interaction.channel.bulkDelete(amount, true).catch(error => {
				console.error(error);
				interaction.reply({ content: 'ErRoR!.!.!', ephemeral: true });
			});
		} else {
			console.log(`${interaction.user.tag} in #${interaction.channel.name} in ${interaction.guild.name} tried to use an ADMIN command.`);
			return interaction.reply({
				content: `u ain't an admin tf!!`,
				ephemeral: true,
			});
		}

		return interaction.reply({ content: `i deleted \`${amount}\` messages`, ephemeral: true });
	},
};