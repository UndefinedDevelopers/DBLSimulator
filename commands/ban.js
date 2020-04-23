const Discord = require('discord.js');
const fse = require('fs-extra');

module.exports = {
    name: "ban",
    description: "Bans a user.",
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
                .setDescription(`<:tickNo:700331270210846780> Uhm... Could you try again? I didn't get who I need to ban.`)

                return message.channel.send(errEmbed).catch(err => err);
            }
        }
        fse.readJson(`reasons.json`, async(err, reasons) => {
            let Case = Math.floor(Math.random() * (50000 - 20000) + 20000);
            let reason = args.slice(1).join(' ');
            let banEmbed = new Discord.MessageEmbed()
                .setTitle(`Ban | Case #${Case}`)
                .setColor('#dd2e44')
            if (user.bot) {
                banEmbed.addField("Bot", `${user.tag} (${user})`, true);
            } else {
                banEmbed.addField("User", `${user.tag} (${user})`, true);
            }
            if (!reason) {
                reason = reasons.banReason[Math.round(Math.random() * (8 - 0) + 0)];
            }
            banEmbed.addField(`Moderator`, `${message.author.tag}`, true);
            banEmbed.addField(`Reason`, reason);
            banEmbed.setTimestamp();
            await message.channel.send(banEmbed);
        });
    }
}