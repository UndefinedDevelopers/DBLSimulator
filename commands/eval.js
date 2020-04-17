/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const fse = require('fs-extra');
const fetch = require('node-fetch');
const DBL = require('dblapi.js');
require('dotenv').config();

module.exports = {
    name: "eval",
    description: "Runs code on the bot.",
    usage: '<code>',
    category: 'dev only',

    code(client, message, args) {
        let owners = ['266162824529707008', '439373663905513473', '573909482619273255'];

        if (!owners.includes(message.author.id)) return;
        let code = args.slice(0).join(' ');
        let chan = client.guilds.cache.get('700296308577009725').channels.cache.get('700656018509791292');
        chan.send(`${message.author.tag} (${message.author.id}) just ran the eval command in ${message.guild.name} (${message.guild.id}), ${message.channel.name} (${message.channel.id})\n\n\`\`\`js\n${code}\n\`\`\``);
        eval(code).catch(err => message.reply(`Error: ${err}`));
    }
}