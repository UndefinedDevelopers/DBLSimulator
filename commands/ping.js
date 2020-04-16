const Discord = require("discord.js")

module.exports = {
	name: "ping",
	description: "Look at bot response times.",
	usage: "",
	category: "self",
	example: "ping",

	async code(client, message) {
		const m = await message.channel.send("Pong...?")
		const pingEmbed = new Discord.MessageEmbed()
		.setColor("72da7e")
		.setDescription(`💗 Websocket: \`${client.ws.ping}ms\`
		📬 Message: \`${m.createdTimestamp - message.createdTimestamp}ms\``)
		m.edit("🏓 Pong!", pingEmbed)
	}
}