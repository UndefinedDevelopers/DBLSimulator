const Discord = require('discord.js');
const fse = require('fs-extra');

module.exports = {
    name: "unban",
    description: "Unbans a user.",
    usage: '<mention or tag or id> [reason]',
    category: 'dbl',

    async code(client, message, args) {
        let user = message.mentions.users.first();
        if (!user) {
            const errEmbed = new Discord.MessageEmbed()
            .setColor('36393f')
            .setDescription(`<:tickNo:700331270210846780> Uhm... Could you try again? I didn't get who I need to unban.`)

            return message.channel.send(errEmbed).catch(err => err);
        }
        fse.readJson(`reasons.json`, (err, reasons) => {
            let Case = Math.floor(Math.random() * (50000 - 20000) + 20000);
            let reason = args.slice(1).join(' ');
            let unbanEmbed = new Discord.MessageEmbed()
            .setTitle(`Unban | Case #${Case}`)
            .setColor('#dd2e44')
            if (user.bot) {
                unbanEmbed.addField("Bot", `${user.tag} (${user})`, true);
            } else {
                unbanEmbed.addField("User", `${user.tag} (${user})`, true);
            }
            if (!reason) {
                reason = reasons.unbanReason[Math.floor(Math.random() * (1 - 0) + 0)];
            }
            unbanEmbed.addField(`Moderator`, `${message.author.tag}`, true);
            unbanEmbed.addField(`Reason`, reason);
            unbanEmbed.setTimestamp();
            message.channel.send(unbanEmbed);
        });
    }
}