const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');
const { Player } = require("discord-player")

const client = new Client({ intents: [
	Intents.FLAGS.GUILDS,
	Intents.FLAGS.GUILD_VOICE_STATES,
	Intents.FLAGS.DIRECT_MESSAGES,
	Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
	Intents.FLAGS.GUILD_MESSAGES,
	Intents.FLAGS.GUILD_MESSAGE_REACTIONS
] });

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.commands = new Collection();
client.player = new Player(client, {
    ytdlOptions: {
        quality: "highestaudio",
        highWaterMark: 1 << 25
    }
})
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction, client);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.on('messageCreate', msg => {
	if (msg.content.toLowerCase().includes('i love gary') ||
	msg.content.toLowerCase().includes('i love you gary')) {
		msg.channel.send(`I LOVE YOU TOO ${msg.author}!!`);
	}

	if (msg.content.toLowerCase().includes('i dont love gary') || 
	msg.content.toLowerCase().includes('i don\'t love gary') ||
	msg.content.toLowerCase().includes('i hate gary')) {
		msg.channel.send(`${msg.author} WHY!!! :(`);
	}

	if (msg.content.toLowerCase().includes('i wanna die') ||
	msg.content.toLowerCase().includes('i want to kms') ||
	msg.content.toLowerCase().includes('i want to kill myself') ||
	msg.content.toLowerCase().includes('i wanna kms') ||
	msg.content.toLowerCase().includes('i wanna kill myself') ||
	msg.content.toLowerCase().includes('i want to die')) {
		msg.channel.send(`NOOOOOO!!!!!!!`);
	}

	if (msg.content.toLowerCase().includes('hi gary') ||
	msg.content.toLowerCase().includes('hey gary') ||
	msg.content.toLowerCase().includes('heyy gary') ||
	msg.content.toLowerCase().includes('heyyy gary') ||
	msg.content.toLowerCase().includes('heyyyy gary') ||
	msg.content.toLowerCase().includes('heyyyyy gary') ||
	msg.content.toLowerCase().includes('heyyyyyy gary') ||
	msg.content.toLowerCase().includes('heyyyyyyy gary') ||
	msg.content.toLowerCase().includes('heyyyyyyyy gary') ||
	msg.content.toLowerCase().includes('hello gary')) {
		msg.channel.send(`heyyy ${msg.author}!!!!!!!`);
	}

	if (msg.content.toLowerCase().includes('gary wyd') ||
	msg.content.toLowerCase().includes('wyd gary')){
			msg.channel.send(`j chillin 😎`);
	}

	if (msg.content.toLowerCase() === 'nice' && msg.author.id != '983747464458797096'){
			msg.channel.send(`nice`);
	}
});

client.login(token);