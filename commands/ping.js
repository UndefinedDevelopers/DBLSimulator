const Discord = require("discord.js")

module.exports = {
	name: "ping",
	description: "Look at bot response times.",
	usage: "",
	category: "self",
	example: "ping",

	async code(client, message) {
		const m = await message.channel.send("Pong...?")
		m.edit("🏓 Pong!", {embed: {
			color: 0x47aef0,
			description: `💗 Websocket: \`${client.ws.ping}ms\`
		📬 Message: \`${m.createdTimestamp - message.createdTimestamp}ms\``
		}})
	}
}