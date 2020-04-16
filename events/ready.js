module.exports = (client) => {
	const bootchannel = client.channels.cache.find(c => c.id === "700328938609574049")
	bootchannel.messages.fetch().then(m => bootchannel.bulkDelete(m.size))
	bootchannel.send("I am online")
}