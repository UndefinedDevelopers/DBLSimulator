const Discord = require('discord.js');
const DBL = require('dblapi.js');

module.exports = {
    name: "botinfo",
    description: "Gives informaation about a bot listed on [top.gg](https://top.gg/)",
    usage: '<bot id or bot mention>',
    category: 'luca',

    async code(client, message, args) {
        return message.channel.send(`I am sorry, but we do not have access to the API yet. Please try again later, we may have it then.`).catch(err => err);
        let bot = args[0];
        if (!bot) {
            const errEmbed = new Discord.MessageEmbed()
            .setColor('#36393f')
            .setDescription(`<:tickNo:700331270210846780> I may be blind, but I don't see that bot on top.gg.`)
            return message.channel.send(errEmbed).catch(err => err);
        }
        if (isNaN(bot)) {
            bot = message.mentions.users.first();
            if (!bot) {
                const errEmbed = new Discord.MessageEmbed()
                .setColor('#36393f')
                .setDescription(`<:tickNo:700331270210846780> I may be blind, but I don't see that bot on top.gg.`)
                return message.channel.send(errEmbed).catch(err => err);
            }
            if (!bot.bot) {
                const errEmbed = new Discord.MessageEmbed()
                .setColor('#36393f')
                .setDescription(`<:tickNo:700331270210846780> I may be dumb, but I don't think that is a bot.`)
                return message.channel.send(errEmbed).catch(err => err);
            } else {
                bot = bot.id;
            }
        }
        
        
        const dbl = new DBL(process.env.TOPGGTOKEN, client);
        dbl.getBot(bot).then(Bot => {
            if (!Bot) {
                const errEmbed = new Discord.MessageEmbed()
                .setColor('#36393f')
                .setDescription(`<:tickNo:700331270210846780> I may be blind, but I don't see that bot on top.gg.`)
                return message.channel.send(errEmbed).catch(err => err);
            }

            let botLinks = []
            if (Bot.invite) botLinks.push(`[Invite](${Bot.invite})`);
            if (Bot.website) botLinks.push(`[Website](${Bot.website})`);
            if (Bot.github) botLinks.push(`[GitHub](${Bot.github})`);
            if (Bot.support) botLinks.push(`[Support Server](https://discord.gg/${Bot.support})`);
            if (botLinks.length === 0) botLinks.push(`None...`);

            const botInfoEmbed = new Discord.MessageEmbed()
            .setAuthor(Bot.username, `https://images.discordapp.net/avatars/${Bot.id}/${Bot.avatar}?size=512`)
            .setTitle(`Bot info`)
            .setThumbnail(`https://images.discordapp.net/avatars/${Bot.id}/${Bot.avatar}?size=512`)
            .addField(`ID`, Bot.id, true)
            .addField(`Username`, Bot.username, true)
            .addField(`Discriminator`, Bot.discriminator, true)
            .addField(`Short Description`, Bot.shortdesc, true)
            .addField(`Library`, Bot.lib, true)
            .addField(`Prefix`, Bot.prefix, true)
            .addField(`Total Upvotes`, Bot.points, true)
            .addField(`Monthly Upvotes`, Bot.monthlyPoints, true)
            .addField(`Server Count`, `${Bot.server_count} Servers`, true)
            .addField(`Owner(s)`, Bot.owners, true)
            .addField(`Links`, botLinks, true)

            return message.channel.send(botInfoEmbed).catch(err => err);
        });


    }
}