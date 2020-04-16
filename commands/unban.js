const Discord = require('discord.js');
const fse = require('fs-extra');

module.exports = {
    name: "unban",
    description: "Unbans a user.",
    usage: '<mention or tag or id> [reason]',
    category: 'dbl',
    example: 'dbl-unban Aprixia',

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
            let unbanEmbed = new Discord.MessageEmbed()
                .setTitle(`unban | Case #${Case}`)
                .setColor('#dd2e44')
            if (user.bot) {
                unbanEmbed.addField("Bot", `${user.tag}`, true);
            } else {
                unbanEmbed.addField("User", `${user.tag}`, true);
            }
            if (!reason) {
                reason = reasons.unbanReason[Math.floor(Math.random() * (1 - 0) + 0)];
            }
            unbanEmbed.addField(`Moderator`, `${message.author.tag}`, true);
            unbanEmbed.addField(`Reason`, reason);
            message.channel.send(unbanEmbed);
        });
    }
}