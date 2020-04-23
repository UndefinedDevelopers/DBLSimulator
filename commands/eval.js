require('dotenv').config();

module.exports = {
    name: "eval",
    description: "Runs code on the bot.",
    usage: '<code>',
    category: 'dev only',

    async code(client, message, args) {
        let owners = ['266162824529707008', '439373663905513473', '573909482619273255'];

        if (!owners.includes(message.author.id)) return;
        let code = args.slice(0).join(' ');
        let chan = client.channels.cache.get(c => c.id === '700656018509791292');
        await chan.send(`${message.author.tag} (${message.author.id}) just ran the eval command in ${message.guild.name} (${message.guild.id}), ${message.channel.name} (${message.channel.id})\n\n\`\`\`js\n${code}\n\`\`\``);
        try {
            const evaled = eval(code)
            message.channel.send(`\`\`\`js\n${evaled}\`\`\``).catch(err => {
                message.channel.send(err)
            })
        } catch(err) {
            message.channel.send(err)
        }
    }
}
