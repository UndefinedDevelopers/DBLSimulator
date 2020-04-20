const Discord = require("discord.js")

module.exports = {
	name: "ping",
	description: "Look at bot response times.",
	usage: "",
	category: "self",

	async code(client, message) {
		let beforemsg = Date.now();
		const m = await message.channel.send("Pong...?")
		const pingEmbed = new Discord.MessageEmbed()
		.setColor("72da7e")
		.setDescription(`💗 Websocket: \`${client.ws.ping}ms\`
		📬 Message: \`${aftermsg - beforemsg}ms\``)
		await m.edit("🏓 Pong!", pingEmbed)
		let aftermsg = Date.now();
	}
}