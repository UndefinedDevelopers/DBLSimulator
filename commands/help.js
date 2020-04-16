const Discord = require('discord.js');

module.exports = {
    name: "help",
    description: "Get information about commands.",
    usage: '[commmand]',
    category: 'self',
    example: 'dbl-help help',

    code(client, message, args) {
        let command = args.slice(0).join(' ');
        if (!command) {
            let dbl = client.commands.map(cmd => cmd).filter(cmd => cmd.category === 'dbl');
            dbl.forEach((z, x) => {
                dbl[x] = z.name;
            });
            if (dbl.length === 0) dbl.push(`No commands yet.`);

            let luca = client.commands.map(cmd => cmd).filter(cmd => cmd.category === 'luca');
            luca.forEach((z, x) => {
                luca[x] = z.name;
            });
            if (luca.length === 0) luca.push(`No commands yet.`);

            let self = client.commands.map(cmd => cmd).filter(cmd => cmd.category === 'self');
            self.forEach((z, x) => {
                self[x] = z.name;
            });
            if (self.length === 0) self.push(`No commands yet.`);

            const helpEmbed = new Discord.MessageEmbed()
                .setColor('#72da7e')
                .setTitle(`Available Commands`)
                .setDescription(`Category \`DBL\` means things happening in the DBL server.\nCategory \`Luca\` means a simulation of Luca's features, available to everyone. (no mod commands)\nCategory \`Self\` means commands this bot has, that are unrelated to DBL and Luca.`)
                .addField(`DBL`, dbl.join('\n'), true)
                .addField(`Luca`, luca.join('\n'), true)
                .addField(`Self`, self.join('\n'), true)

            return message.channel.send(helpEmbed).catch(err => console.error(err));
        } else if (command) {
            const helpEmbed = new Discord.MessageEmbed()
            .setColor("#72da7e")
            .setTitle("Command details")
            .setDescription(`Here is some info on the command ${command}.`)
            .addField("Details", `Description: ${client.commands.get(command).description}`)
            return message.channel.send(helpEmbed).catch(err => console.error(err))
        }
    }
}