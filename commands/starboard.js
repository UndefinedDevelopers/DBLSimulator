const Discord = require('discord.js');

module.exports = {
    name: "starboard",
    description: "Simulate a starboard post.",
    usage: '<mention> <stars> <channel> <content>',
    category: 'dbl',

    async code(client, message, args) {
        let user = message.mentions.users.first();
        if (!user) {
            const errEmbed = new Discord.MessageEmbed()
            .setColor('#36393f')
            .setDescription(`<:tickNo:700331270210846780> I may be blind, but I don't see that user here.`)
            return message.channel.send(errEmbed).catch(err => err);
        }
        let stars = args[1];
        if (!stars) {
            const errEmbed = new Discord.MessageEmbed()
            .setColor('#36393f')
            .setDescription(`<:tickNo:700331270210846780> Uhm... I didn't get how many stars you wanted.`)
            return message.channel.send(errEmbed).catch(err => err);
        }
        if (isNaN(stars)) {
            const errEmbed = new Discord.MessageEmbed()
            .setColor('#36393f')
            .setDescription(`<:tickNo:700331270210846780> Uhm... I don't think that is a number.`)
            return message.channel.send(errEmbed).catch(err => err);
        }
        let channel = message.mentions.channels.first();
        if (!channel) {
            const errEmbed = new Discord.MessageEmbed()
            .setColor('#36393f')
            .setDescription(`<:tickNo:700331270210846780> I may be blind, but I don't see that channel here.`)
            return message.channel.send(errEmbed).catch(err => err);
        }
        let content = args.slice(3).join(' ');
        const starsBetween = async function(min,max) {
            return stars>=min && stars<max;
        }

        const starEmbed = new Discord.MessageEmbed()
        .setAuthor(user.tag, user.avatarURL)
        .setDescription(content)
        .setFooter(`ID: ${message.id}`)
        .setTimestamp()
        if (starsBetween(1,8)) {
            starEmbed.setColor('#ffe7a3')
            return message.channel.send(`⭐ ${stars} | ${channel}`).then(message.chanel.send(starEmbed).catch(err => err)).catch(err => err);
        } else if (starsBetween(8,13)) {
            starEmbed.setColor('#ffd24f')
            return message.channel.send(`🌟 ${stars} | ${channel}`).then(message.chanel.send(starEmbed).catch(err => err)).catch(err => err);
        } else if (starsBetween(13,28)) {
            starEmbed.setColor('#ffc20c')
            return message.channel.send(`💫 ${stars} | ${channel}`).then(message.chanel.send(starEmbed).catch(err => err)).catch(err => err);
        } else if (stars >= 28) {
            starEmbed.setColor('#ffc20c')
            return message.channel.send(`✨ ${stars} | ${channel}`).then(message.chanel.send(starEmbed).catch(err => err)).catch(err => err);
        }

    }
}