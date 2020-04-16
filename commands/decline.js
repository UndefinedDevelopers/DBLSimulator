const Discord = require('discord.js');
const fse = require('fs-extra');

module.exports = {
    name: "decline",
    description: "declines a user.",
    usage: '<mention or tag or id> [reason]',
    category: 'dbl',
    example: 'dbl-decline Aprixia',

    async code(client, message, args) {
        let user = message.mentions.users.first();
        if (!user) {
            const errEmbed = new Discord.MessageEmbed()
            .setColor('36393f')
            .setDescription(`<:tickNo:700331270210846780> I may be blind, but I don't see that user here.`)

            return message.channel.send(errEmbed).catch(err => err);
        }
        fse.readJson(`reasons.json`, (err, reasons) => {
            let Case = Math.floor(Math.random() * (50000 - 20000) + 20000);
            let reason = args.slice(1).join(' ');
            let declineEmbed = new Discord.MessageEmbed()
                .setTitle(`Decline | Case #${Case}`)
                .setColor('#dd2e44')
            if (user.bot) {
                declineEmbed.addField("Bot", `${user.tag}`, true);
            } else {
                declineEmbed.addField("User", `${user.tag}`, true);
            }
            if (!reason) {
                reason = reasons.declineReason[Math.floor(Math.random() * (1 - 0) + 0)];
            }
            declineEmbed.addField(`Moderator`, `${message.author.tag}`, true);
            declineEmbed.addField(`Reason`, reason);
            message.channel.send(declineEmbed);
        });
    }
}