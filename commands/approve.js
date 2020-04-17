const Discord = require("discord.js")

module.exports = {
	name: "approve",
	description: "Approves a bot.",
	usage: "<mention or tag or id>",
	category: "dbl",

	async code(client, message, args) {
		const user = message.mentions.users.first()

		if(!user) {
			const errEmbed = new Discord.MessageEmbed()
			.setColor('36393f')
            .setDescription(`<:tickNo:700331270210846780> I may be blind, but I don't see that bot here.`)

            return message.channel.send(errEmbed).catch(err => err)
		} else if(!user.bot) {
			const errEmbed = new Discord.MessageEmbed()
			.setColor('36393f')
            .setDescription(`<:tickNo:700331270210846780> I don't think you can approve a user.`)

            return message.channel.send(errEmbed).catch(err => err)			
		}

		message.channel.send(`<@${user.id}> was approved by <@${message.author.id}>`)
	}
}