let Discord = require('discord.js')

module.exports = async (client) => {
	const bootchannel = client.channels.cache.find(c => c.id === "700328938609574049")
	await bootchannel.messages.fetch({ limit: 5 }).then(messages => { 
		bootchannel.bulkDelete(messages)
	}); 
	let rebootEmbed = new Discord.MessageEmbed()
	.setTitle("I have rebooted!")
	.setColor("GREEN")
	.setTimestamp();
	await bootchannel.send("@everyone")
	await bootchannel.send(rebootEmbed)
}