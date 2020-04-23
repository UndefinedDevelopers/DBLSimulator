require('dotenv').config();

module.exports = (client, message) => {
    if (message.channel.type === 'dm') return;
    let prefix = process.env.PREFIX;
    if (!message.content.toLowerCase().startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;
    
    try {
        let owners = ['266162824529707008', '439373663905513473', '573909482619273255'];
        if(!owners.includes(message.author.id) && command.category === "dev only") return message.channel.send({embed: {
            color: 0x36393F,
            description: "<:tickNo:700331270210846780> Sorry, but that command is developer only."
        }})
        command.code(client, message, args);
    } catch (error) {
        return console.error(error);
    }
}
