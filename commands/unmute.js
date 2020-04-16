const Discord = require('discord.js');
const fse = require('fs-extra');

module.exports = {
    name: "unmute",
    description: "Unmutes a user.",
    usage: '<mention or tag or id> [reason]',
    category: 'dbl',
    example: 'dbl-unmute Aprixia',

    async code(client, message, args) {
        let user = message.mentions.users.first();
        if (!user) {
            const errEmbed = new Discord.MessageEmbed()
            .setColor('#36393f')
            .setDescription(`<:tickNo:700331270210846780> I may be blind, but I don't see that user here.`)

            return message.channel.send(errEmbed).catch(err => err);
        }
        fse.readJson(`../reasons.json`, (err, reasons) => {
            let Case = Math.floor(Math.random() * (50000 - 20000) + 20000);
            let reason = args.slice(1).join(' ');
            if (!reason) {
                reason = reasons.unmuteReason[Math.floor(Math.random() * reasons.unmuteReason.length-1)];
                if (reason === 'Unmute Expired') {
                    reason = reason+` #${Case-47}`;
                }
            }
            let unmuteEmbed = new Discord.MessageEmbed()
                .setTitle(`Unmute | Case #${Case}`)
                .setColor('08de06')
                .addField("Reason", `${reason}`)
                .setTimestamp()
            if (user.bot) {
                unmuteEmbed.addField("Bot", `${user.tag}`)
            } else {
                unmuteEmbed.addField("User", `${user.tag}`)
            }
            message.channel.send(unmuteEmbed)
        });
    }
}