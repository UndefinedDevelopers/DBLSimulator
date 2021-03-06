const Discord = require('discord.js');
const fse = require('fs-extra');

module.exports = {
    name: "decline",
    description: "Declines a user.",
    usage: '<mention or id> [reason]',
    category: 'dbl',

    async code(client, message, args) {
        let user = client.users.cache.get(args[0]);
        if (!user) {
            function getUser(mention) {
                if (!mention) return;
                
                if (mention.startsWith(`<@`) && mention.endsWith(`>`)) {
                    mention = mention.slice(2, -1);

                    if (mention.startsWith(`!`)) {
                        mention = mention.slice(1);
                    }

                    return client.users.cache.get(mention);
                }
            }
            if (getUser(args[0])) {
                user = getUser(args[0]);
            } else {
                const errEmbed = new Discord.MessageEmbed()
                .setColor('36393f')
                .setDescription(`<:tickNo:700331270210846780> I may be blind, but I don't see that user here.`)

                return message.channel.send(errEmbed).catch(err => err);
            }
        }
        fse.readJson(`reasons.json`, async(err, reasons) => {
            let reason = args.slice(1).join(' ');

            /*
             * ! Case is not defined, someone please fix.
             * Fixed. Case isn't supposed to be be in this one.
             */
            let declineEmbed = new Discord.MessageEmbed()
                .setTitle(`Decline`)
                .setColor('#dd2e44')
            declineEmbed.addField("Bot", `${user.tag} (${user})`, true);
            if (!reason) {
                reason = reasons.declineReason[Math.round(Math.random() * (6 - 0) + 0)];
            }
            declineEmbed.addField(`Moderator`, `${message.author.tag}`, true);
            declineEmbed.addField(`Reason`, reason);
            declineEmbed.setTimestamp();
            await message.channel.send(declineEmbed);
        });
    }
}