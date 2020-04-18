const Discord = require('discord.js');
const fse = require('fs-extra');

module.exports = {
    name: "delete",
    description: "Deletes a user.",
    usage: '<mention or tag or id> [reason]',
    category: 'dbl',

    async code(client, message, args) {
        let user = message.mentions.users.first();
        if (!user) {
            const errEmbed = new Discord.MessageEmbed()
            .setColor('36393f')
            .setDescription(`<:tickNo:700331270210846780> I may be blind, but I don't see that user here.`)

            return message.channel.send(errEmbed).catch(err => err);
        }
        fse.readJson(`reasons.json`, async(err, reasons) => {
            let reason = args.slice(1).join(' ');
            let deleteEmbed = new Discord.MessageEmbed()
            .setTitle(`Delete`)
            .setColor('#dd2e44')
            deleteEmbed.addField("Bot", `${user.tag} (${user})`, true);
            if (!reason) {
                reason = reasons.deleteReason[Math.floor(Math.random() * (1 - 0) + 0)];
            }
            deleteEmbed.addField(`Moderator`, `${message.author.tag}`, true);
            deleteEmbed.addField(`Reason`, reason);
            deleteEmbed.setTimestamp();
            await message.channel.send(deleteEmbed);
        });
    }
}