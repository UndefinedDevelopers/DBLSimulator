const { Client, Collection } = require('discord.js');
const client = new Client();
const fs = require('fs');
require('dotenv').config();
const DBL = require('dblapi.js');
const dbl = new DBL(process.env.TOPGGTOKEN, {
    webhookPort: 4000,
    webhookAuth: process.env.TOPGGWEBHOOK
}, client);

dbl.on('posted', () => {
    console.log(`Server count posted! | ${client.guilds.cache.size} servers`);
});

dbl.on('error', err => {
    console.log(`Error! ${err}`);
})

// Command Handler
client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

try {
    let files = fs.readdirSync("./events/")
    files = files.filter(f => f.split(".").pop() === "js")
    if (files.length === 0) {
        console.log("There are no events to load.\n\n")
        return;
    }

    let loadednum = 0
    for (let i = 0; i < files.length; i++) {
        const _event = files[i].slice(0, -3)
        try {
            const event = require(`./events/${files[i]}`)
            client.on(files[i].slice(0, -3), event.bind(null, client))
            console.log(`Successfully loaded event ${_event}.`)
            loadednum++
        } catch (err) {
            const trace = err.stack.toString().split("\n").slice(0, 3).join("\n")
            console.log(`An error occured while trying to load ${_event}\n${trace}`)
            console.log(`Could not load the event ${_event}.`)
        }
    }
    console.log(`Successfully loaded ${loadednum} events.\n`)
} catch (err) {
    console.log(err)
}

client.on('ready', () => {
    setInterval(() => {
        dbl.postStats(client.guilds.cache.size).then(console.log(`Successfully posted stats! | ${client.guilds.cache.size} servers`)).catch(err => console.error(err));
    }, 1800000);
});

client.login(process.env.TOKEN);