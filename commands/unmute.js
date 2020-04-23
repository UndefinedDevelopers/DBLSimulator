const Discord = require('discord.js');
const fse = require('fs-extra');

module.exports = {
    name: "unmute",
    description: "Unmutes a user.",
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
                .setColor('#36393f')
                .setDescription(`<:tickNo:700331270210846780> I may be blind, but I don't see that user here.`)

                return message.channel.send(errEmbed).catch(err => err);
            }
        }
        fse.readJson(`reasons.json`, async(err, reasons) => {
            let Case = Math.floor(Math.random() * (50000 - 20000) + 20000);
            let reason = args.slice(1).join(' ');
            let unmuteEmbed = new Discord.MessageEmbed()
                .setTitle(`Unmute | Case #${Case}`)
                .setColor('fac10c')
            if (user.bot) {
                unmuteEmbed.addField("Bot", `${user.tag} (${user})`, true);
            } else {
                unmuteEmbed.addField("User", `${user.tag} (${user})`, true);
            }
            if (!reason) {
                if (user.bot) {
                    reason = reasons.botunmuteReason[Math.round(Math.random() * (4 - 0) + 0)];
                } else {
                    reason = reasons.unmuteReason[Math.round(Math.random() * (1 - 0) + 0)];
                }
                if (reason === 'Time\'s up') {
                    reason = reason+` #${Case-47}`;
                    unmuteEmbed.addField(`Moderator`, `Topgg Discord Simulator#0086`, true);
                } else {
                    unmuteEmbed.addField(`Moderator`, `${message.author.tag}`, true);
                }
            } else {
                unmuteEmbed.addField(`Moderator`, `${message.author.tag}`, true);
            }
            unmuteEmbed.addField(`Reason`, reason);
            unmuteEmbed.setTimestamp();
            await message.channel.send(unmuteEmbed);
        });
    }
}