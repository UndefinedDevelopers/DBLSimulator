const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
require('dotenv').config();

// Command Handler
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('message', message => {
    if (message.channel.type === 'dm') return;
    let prefix = process.env.PREFIX;
    if (!message.content.toLowerCase().startsWith(prefix) || message.author.bots) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    try {
        return command.code(client, message, args);
    } catch (error) {
        return console.error(error);
    }
});
// End of Command Handler

client.on('ready', ready => {
    console.log(`Running! ${client.guilds.cache.size}`);
});

client.login(process.env.TOKEN);