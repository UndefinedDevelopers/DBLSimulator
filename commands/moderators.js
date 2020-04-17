const Discord = require('discord.js');

module.exports = {
    name: "moderators",
    description: "Gives a common moderators ping.(Wont actually mention the role)",
    usage: '',
    category: 'dbl',

    async code(client, message, args) {
        let ats = ["how long is the queue?",
        "how much left of the queue before my bot?",
        " ",
        "how long is approval?",
        "help",
        "ban this person please",
        "why was my bot declined?",
        "this person is spamming!",
        "mute this person please.",
        "when will my bot get tested?",
        "how do I become a mod?",
        "readd my bot please."];

        let x = Math.floor(Math.random() * (11 - 0) + 0);

        return message.channel.send(`@Moderators ${ats[x]}`).catch(err => err);
    }
}