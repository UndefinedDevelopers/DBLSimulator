module.exports = (client) => {
	const bootchannel = client.channels.cache.find(c => c.id === "700328938609574049")
	bootchannel.send("I am online")
	bootchannel.messages.fetch().then(m => bootchannel.send(`${m.size} fetched`))
}