const Discord = require('discord.js');
const fse = require('fs-extra');

module.exports = {
    name: "mute",
    description: "mutes a user.",
    usage: '<mention or tag or id> [reason]',
    category: 'dbl',
    example: 'dbl-mute Aprixia',

    async code(client, message, args) {
        let user = message.mentions.users.first();
        if (!user) {
            const errEmbed = new Discord.MessageEmbed()
            .setColor('#36393f')
            .setDescription(`<:tickNo:700331270210846780> I may be blind, but I don't see that user here.`)

            return message.channel.send(errEmbed).catch(err => err);
        }
        fse.readJson(`reasons.json`, (err, reasons) => {
            let Case = Math.floor(Math.random() * (50000 - 20000) + 20000);
            let reason = args.slice(1).join(' ');
            let muteEmbed = new Discord.MessageEmbed()
                .setTitle(`mute | Case #${Case}`)
                .setColor('08de06')
            if (user.bot) {
                muteEmbed.addField("Bot", `${user.tag}`, true);
            } else {
                muteEmbed.addField("User", `${user.tag}`, true);
            }
            if (!reason) {
                if (user.bot) {
                    reason = reasons.botmuteReason[Math.floor(Math.random() * (4 - 0) + 0)];
                } else {
                    reason = reasons.muteReason[Math.floor(Math.random() * (1 - 0) + 0)];
                }
                if (reason === 'Time\'s up') {
                    reason = reason+` #${Case-47}`;
                    muteEmbed.addField(`Moderator`, `Topgg Discord Simulator#0086`, true);
                } else {
                    muteEmbed.addField(`Moderator`, `${message.author.tag}`, true);
                }
            } else {
                muteEmbed.addField(`Moderator`, `${message.author.tag}`, true);
            }
            muteEmbed.addField(`Reason`, reason);
            message.channel.send(muteEmbed);
        });
    }
}