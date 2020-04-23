const Discord = require('discord.js');
const fse = require('fs-extra');

module.exports = {
    name: "kick",
    description: "Kicks a user.",
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
                .setDescription(`<:tickNo:700331270210846780> Uhm... Could you try again? I didn't get who I need to kick.`)

                return message.channel.send(errEmbed).catch(err => err);
            }
        }
        fse.readJson(`reasons.json`, async(err, reasons) => {
            let Case = Math.floor(Math.random() * (50000 - 20000) + 20000);
            let reason = args.slice(1).join(' ');
            let kickEmbed = new Discord.MessageEmbed()
                .setTitle(`kick | Case #${Case}`)
                .setColor('#dd2e44')
            if (user.bot) {
                kickEmbed.addField("Bot", `${user.tag} (${user})`, true);
            } else {
                kickEmbed.addField("User", `${user.tag} (${user})`, true);
            }
            if (!reason) {
                reason = reasons.kickReason[Math.round(Math.random() * (8 - 0) + 0)];
            }
            kickEmbed.addField(`Moderator`, `${message.author.tag}`, true);
            kickEmbed.addField(`Reason`, reason);
            kickEmbed.setTimestamp();
            await message.channel.send(kickEmbed);
        });
    }
}