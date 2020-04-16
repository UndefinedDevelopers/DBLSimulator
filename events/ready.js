module.exports = async (client) => {
	const bootchannel = client.channels.cache.find(c => c.id === "700328938609574049")
	let fetched = await bootchannel.messages.fetch({limit:100})
	bootchannel.bulkDelete(fetched.size).then(() => {}).catch(err => console.error(err))
 	let embed = new Discord.MessageEmbed()
 	    .setTitle("I have rebooted!")
 	    .setColor("GREEN")
 	    .setTimestamp();
 	bootchannel.send("@everyone", {embed: embed})
}