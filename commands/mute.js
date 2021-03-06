const Discord = require('discord.js');
const fse = require('fs-extra');

module.exports = {
    name: "mute",
    description: "Mutes a user.",
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
            let Case = Math.floor(Math.random() * (50000 - 20000) + 20000);
            let reason = args.slice(1).join(' ');
            let muteEmbed = new Discord.MessageEmbed()
                .setTitle(`Mute | Case #${Case}`)
                .setColor('fac10c')
            if (user.bot) {
                muteEmbed.addField("Bot", `${user.tag} (${user})`, true);
            } else {
                muteEmbed.addField("User", `${user.tag} (${user})`, true);
            }
            if (!reason) {
                if (user.bot) {
                    reason = reasons.botmuteReason[Math.round(Math.random() * (6 - 0) + 0)];
                } else {
                    reason = reasons.muteReason[Math.round(Math.random() * (4 - 0) + 0)];
                }
            }
            muteEmbed.addField(`Moderator`, `${message.author.tag}`, true);
            muteEmbed.addField(`Reason`, reason);
            if (reason) {
                let timeInt = reason.search(' | ');
                if (timeInt) {
                    let time = reason.slice(timeInt+3);
                    if (['minute', 'minutes', 'hour', 'hours', 'day', 'days', 'week', 'weeks'].some(Time => time.toLowerCase().indexOf(Time) >= 2)) {
                        if (['minute', 'minutes'].some(Time => time.toLowerCase().indexOf(Time) >= 2)) {
                            let timeUn = Date.now()+time.slice(0, time.search(' '))*60000;
                            muteEmbed.setFooter(`Unmute at: `+new Date(timeUn).toUTCString()); 
                        } else if (['hour', 'hours'].some(Time => time.toLowerCase().indexOf(Time) >= 2)) {
                            let timeUn = Date.now()+time.slice(0, time.search(' '))*3600000;
                            muteEmbed.setFooter(`Unmute at: `+new Date(timeUn).toUTCString());
                        } else if (['day', 'days'].some(Time => time.toLowerCase().indexOf(Time) >= 2)) {
                            let timeUn = Date.now()+time.slice(0, time.search(' '))*86400000;
                            muteEmbed.setFooter(`Unmute at: `+new Date(timeUn).toUTCString());
                        } else if (['week', 'weeks'].some(Time => time.toLowerCase().indexOf(Time) >= 2)) {
                            let timeUn = Date.now()+time.slice(0, time.search(' '))*86400000*7;
                            muteEmbed.setFooter(`Unmute at: `+new Date(timeUn).toUTCString());
                        }
                    }
                }
            }
            muteEmbed.setTimestamp();
            await message.channel.send(muteEmbed);
        });
    }
}